import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from "axios";
import { c } from "@/config";

/**
 * `nuha-client`
 *
 * Axios client yang dipakai untuk akses Nuha Integration API **dengan Bearer token**.
 *
 * Ada 2 mode berdasarkan `c.CONFIG.BE_ENV`:
 * - `nuha`: token harus didapat dari endpoint auth Nuha (login/refresh). Token **disimpan sementara**
 *   (in-memory) + dipasang otomatis lewat request interceptor.
 * - selain `nuha` (mis. `local`): masih mempertahankan perilaku lama dengan token statik
 *   (`BASE_TOKEN`) untuk gateway internal / development.
 *
 * Catatan runtime:
 * - **Server runtime** (SSR/route handler/server action): boleh langsung panggil auth Nuha karena env
 *   (EMAIL/PASSWORD/CLIENT_KEY) hanya ada di server.
 * - **Browser runtime**: token tidak boleh diekspos, jadi token diambil via route handler internal
 *   (`GET /api/nuha/auth/token`).
 */

// Nuha Integration API Base URL
const NUHA_API_BASE_URL = c.CONFIG.BASE_API_URL || "https://integrations.nuha.care";

// Local gateway token (only used when BE_ENV !== "nuha")
const LOCAL_GATEWAY_TOKEN = c.CONFIG.BASE_TOKEN || "";

const isNuhaEnv = c.CONFIG.BE_ENV === "nuha";

type TokenCache = {
  token: string;
  refreshToken: string | null;
  expiresAtMs: number | null;
};

// Cache token di memory (per tab / per server instance).
let tokenCache: TokenCache = {
  token: "",
  refreshToken: null,
  expiresAtMs: null,
};

// Guard supaya kalau ada banyak request paralel, cuma 1 yang benar-benar login/refresh.
let tokenInFlight: Promise<string> | null = null;

function isAuthEndpoint(url?: string): boolean {
  if (!url) return false;
  return url.includes("/open-api/auth/login") || url.includes("/open-api/auth/refresh-token");
}

function isTokenFresh(cache: TokenCache): boolean {
  if (!cache.token) return false;
  if (!cache.expiresAtMs) return true; // if server doesn't provide expiry, treat as non-expiring
  const SKEW_MS = 60_000; // refresh 60s before expiry
  return cache.expiresAtMs - Date.now() > SKEW_MS;
}

/**
 * Dipakai hanya di browser runtime: minta token ke server route.
 * (Server route yang pegang credential & refresh token, jadi browser tidak pernah lihat PASSWORD/CLIENT_KEY.)
 */
async function fetchTokenFromServer(): Promise<string> {
  const res = await fetch("/api/nuha/auth/token", {
    method: "GET",
    cache: "no-store",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch Nuha token: ${res.status} ${res.statusText}`);
  }

  const json = (await res.json()) as { token?: string; expired_at?: string };
  const token = json.token ?? "";

  // Optional: allow server to return expiry, but token endpoint may omit it.
  if (json.expired_at) {
    tokenCache.expiresAtMs = new Date(json.expired_at).getTime();
  }

  tokenCache.token = token;
  return token;
}

/**
 * Mengembalikan access token yang masih valid untuk Nuha.
 * - Return empty string jika bukan env `nuha` (token Nuha tidak dibutuhkan).
 * - Menggunakan cache + in-flight guard agar efisien dan mencegah "login storm".
 */
async function getValidAccessToken(): Promise<string> {
  if (!isNuhaEnv) return "";
  if (isTokenFresh(tokenCache)) return tokenCache.token;
  if (tokenInFlight) return tokenInFlight;

  tokenInFlight = (async () => {
    try {
      // Only the server has EMAIL/PASSWORD/CLIENT_KEY; client fetches from server route.
      // If running on server runtime (SSR / route handler / server action), call Nuha auth directly.
      if (typeof window === "undefined") {
        const email = c.CONFIG.EMAIL;
        const password = c.CONFIG.PASSWORD;
        const client_key = c.CONFIG.CLIENT_KEY;

        if (!email || !password || !client_key) {
          throw new Error(
            "Missing Nuha credentials. Please set EMAIL, PASSWORD, and CLIENT_KEY in server env."
          );
        }

        const authClient = axios.create({
          baseURL: NUHA_API_BASE_URL,
          headers: { "Content-Type": "application/json" },
          withCredentials: false,
        });

        // Prioritas: refresh dulu kalau kita punya refresh_token dan token sudah (hampir) expired.
        if (tokenCache.refreshToken && tokenCache.expiresAtMs && !isTokenFresh(tokenCache)) {
          try {
            const refreshed = await authClient.post<{
              data?: { token: string; refresh_token: string; user?: { expired_at?: string } };
            }>("/open-api/auth/refresh-token", { refresh_token: tokenCache.refreshToken });

            const t = refreshed.data?.data?.token ?? "";
            const rt = refreshed.data?.data?.refresh_token ?? "";
            const exp = refreshed.data?.data?.user?.expired_at ?? null;

            tokenCache = {
              token: t,
              refreshToken: rt || null,
              expiresAtMs: exp ? new Date(exp).getTime() : null,
            };

            if (tokenCache.token) return tokenCache.token;
          } catch {
            // fall through to login
          }
        }

        // Fallback: login dengan credential server.
        const loggedIn = await authClient.post<{
          data?: { token: string; refresh_token: string; user?: { expired_at?: string } };
        }>("/open-api/auth/login", { email, password, client_key });

        const token = loggedIn.data?.data?.token ?? "";
        const refreshToken = loggedIn.data?.data?.refresh_token ?? "";
        const expiredAt = loggedIn.data?.data?.user?.expired_at ?? null;

        tokenCache = {
          token,
          refreshToken: refreshToken || null,
          expiresAtMs: expiredAt ? new Date(expiredAt).getTime() : null,
        };

        return tokenCache.token;
      }

      // Browser runtime: request token from our server route.
      return await fetchTokenFromServer();
    } finally {
      tokenInFlight = null;
    }
  })();

  return tokenInFlight;
}

// Create axios instance for Nuha API
export const nuhaApiClient: AxiosInstance = axios.create({
  baseURL: NUHA_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false, // Set to false since we're using Bearer token auth
  // timeout: 15000, // 15 seconds
});

// Request interceptor: inject Authorization header sesuai environment.
nuhaApiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    // Avoid recursion if someone ever calls auth endpoints using this client.
    if (isNuhaEnv && !isAuthEndpoint(config.url)) {
      const token = await getValidAccessToken();
      if (token) {
        config.headers = config.headers ?? {};
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    // Non-nuha env (e.g. local gateway): keep legacy static token behavior.
    if (!isNuhaEnv && LOCAL_GATEWAY_TOKEN) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${LOCAL_GATEWAY_TOKEN}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: handle error + retry sekali saat 401 (khusus env `nuha`).
nuhaApiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalConfig = (error.config ?? {}) as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (
      isNuhaEnv &&
      error.response?.status === 401 &&
      !originalConfig._retry &&
      !isAuthEndpoint(originalConfig.url)
    ) {
      originalConfig._retry = true;

      // Paksa refresh/login pada request berikutnya (invalidate cache).
      tokenCache.token = "";
      tokenCache.expiresAtMs = null;

      const token = await getValidAccessToken();
      if (token) {
        originalConfig.headers = originalConfig.headers ?? {};
        originalConfig.headers.Authorization = `Bearer ${token}`;
        return nuhaApiClient.request(originalConfig);
      }
    }

    // Logging error generik: jangan bocorkan detail sensitif, tapi cukup untuk debugging.
    if (error.response) {
      const status = error.response.status;
      const data = error.response.data as { error?: string; message?: string };

      switch (status) {
        case 400:
          console.error("Nuha API Bad Request:", data.error || data.message);
          break;
        case 401:
          console.error("Nuha API Unauthorized");
          break;
        case 404:
          console.error("Nuha API Not Found:", data.error || data.message);
          break;
        case 500:
          console.error("Nuha API Server Error:", data.error || data.message);
          break;
        default:
          console.error("Nuha API Error:", data.error || data.message);
      }
    } else if (error.request) {
      console.error("Nuha API Network Error: No response received");
    } else {
      console.error("Nuha API Error:", error.message);
    }

    return Promise.reject(error);
  }
);

export default nuhaApiClient;

import axios from "axios";
import { NextResponse } from "next/server";
import { c } from "@/config";

/**
 * `GET /api/nuha/auth/token`
 *
 * Route handler ini menyediakan **access token Nuha** untuk kebutuhan browser-side,
 * tanpa pernah mengekspos credential (EMAIL/PASSWORD/CLIENT_KEY) ke client.
 *
 * Desain:
 * - Token disimpan di memory (per server instance / per cold start) sebagai cache.
 * - Ada `serverInFlight` untuk mencegah banyak request paralel memicu login/refresh berkali-kali.
 * - Response dipaksa `no-store` agar tidak tercache CDN/edge/browser.
 */

type NuhaAuthResponse = {
  statusCode?: number;
  message?: string;
  data?: {
    token: string;
    refresh_token: string;
    user?: {
      expired_at?: string;
    };
  };
};

type ServerTokenCache = {
  token: string;
  refreshToken: string | null;
  expiresAtMs: number | null;
};

const NUHA_API_BASE_URL = c.CONFIG.BASE_API_URL || "https://integrations.nuha.care";

// Cache token di memory (scope module) untuk memperkecil jumlah login/refresh ke Nuha.
let serverCache: ServerTokenCache = {
  token: "",
  refreshToken: null,
  expiresAtMs: null,
};

// Guard untuk mencegah login/refresh paralel (race condition).
let serverInFlight: Promise<ServerTokenCache> | null = null;

function isFresh(cache: ServerTokenCache): boolean {
  if (!cache.token) return false;
  if (!cache.expiresAtMs) return true;
  const SKEW_MS = 60_000;
  return cache.expiresAtMs - Date.now() > SKEW_MS;
}

// Login: pakai credential server env untuk dapat token + refresh_token.
async function login(): Promise<ServerTokenCache> {
  const email = c.CONFIG.EMAIL;
  const password = c.CONFIG.PASSWORD;
  const client_key = c.CONFIG.CLIENT_KEY;

  if (!email || !password || !client_key) {
    throw new Error("Missing Nuha credentials. Set EMAIL, PASSWORD, CLIENT_KEY (server env).");
  }

  const authClient = axios.create({
    baseURL: NUHA_API_BASE_URL,
    headers: { "Content-Type": "application/json" },
    withCredentials: false,
  });

  const res = await authClient.post<NuhaAuthResponse>("/open-api/auth/login", {
    email,
    password,
    client_key,
  });

  const token = res.data?.data?.token ?? "";
  const refreshToken = res.data?.data?.refresh_token ?? "";
  const expiredAt = res.data?.data?.user?.expired_at ?? null;

  return {
    token,
    refreshToken: refreshToken || null,
    expiresAtMs: expiredAt ? new Date(expiredAt).getTime() : null,
  };
}

// Refresh: pakai refresh_token untuk dapat token baru (lebih hemat daripada login).
async function refresh(refreshToken: string): Promise<ServerTokenCache> {
  const authClient = axios.create({
    baseURL: NUHA_API_BASE_URL,
    headers: { "Content-Type": "application/json" },
    withCredentials: false,
  });

  const res = await authClient.post<NuhaAuthResponse>("/open-api/auth/refresh-token", {
    refresh_token: refreshToken,
  });

  const token = res.data?.data?.token ?? "";
  const newRefreshToken = res.data?.data?.refresh_token ?? "";
  const expiredAt = res.data?.data?.user?.expired_at ?? null;

  return {
    token,
    refreshToken: newRefreshToken || null,
    expiresAtMs: expiredAt ? new Date(expiredAt).getTime() : null,
  };
}

async function ensureServerToken(): Promise<ServerTokenCache> {
  // login hanya berlaku jika BE_ENV = nuha
  if (c.CONFIG.BE_ENV !== "nuha") {
    return { token: "", refreshToken: null, expiresAtMs: null };
  }

  // Fast-path: token masih fresh.
  if (isFresh(serverCache)) return serverCache;
  // Kalau ada proses refresh/login yang sedang jalan, tunggu hasilnya.
  if (serverInFlight) return serverInFlight;

  serverInFlight = (async () => {
    try {
      // Coba refresh dulu kalau punya refresh token. Kalau gagal, fallback ke login.
      if (serverCache.refreshToken) {
        try {
          serverCache = await refresh(serverCache.refreshToken);
          if (serverCache.token) return serverCache;
        } catch {
          // fall through to login
        }
      }

      serverCache = await login();
      return serverCache;
    } finally {
      serverInFlight = null;
    }
  })();

  return serverInFlight;
}

export async function GET() {
  // Dipanggil dari browser-side via `fetch("/api/nuha/auth/token")` (lihat `nuha-client`).
  const cache = await ensureServerToken();

  return NextResponse.json(
    {
      token: cache.token,
      expired_at: cache.expiresAtMs ? new Date(cache.expiresAtMs).toISOString() : undefined,
    },
    {
      headers: {
        // Pastikan token tidak pernah tersimpan oleh cache layer mana pun.
        "Cache-Control": "no-store, max-age=0",
      },
    }
  );
}


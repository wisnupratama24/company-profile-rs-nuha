import axios from "axios";

/**
 * Client helper untuk memanggil Next route handler `/api/nuha/proxy`.
 *
 * Dipakai di browser runtime supaya:
 * - browser tidak perlu (dan tidak boleh) memegang Bearer token Nuha
 * - semua auth/token injection terjadi di server lewat `nuhaApiClient`
 *
 * Catatan:
 * - Route handler saat ini hanya mendukung `GET` dan `POST`.
 * - `path` harus absolute (diawali "/") untuk mencegah misuse sebagai open proxy.
 */
export type NuhaProxyMethod = "GET" | "POST";

export type NuhaProxyRequest = {
  method: NuhaProxyMethod;
  path: string;
  body?: unknown;
  params?: Record<string, unknown>;
};

export async function nuhaProxyRequest<T = unknown>(req: NuhaProxyRequest): Promise<T> {
  if (!req.path || !req.path.startsWith("/")) {
    throw new Error('Invalid path. Expected absolute path starting with "/"');
  }

  // Panggil route internal Next.js. Token tetap ditambahkan server-side di route handler.
  const res = await axios.post<T>("/api/nuha/proxy", req, {
    headers: { "Content-Type": "application/json" },
  });
  return res.data;
}

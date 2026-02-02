import { NextResponse } from "next/server";
import nuhaApiClient from "@/api/nuha-client";
import { c } from "@/config";

/**
 * Server-side proxy to Nuha / Local gateway.
 *
 * Goal: keep Authorization token server-side (no direct calls from browser).
 *
 * Kenapa butuh proxy:
 * - Kalau browser call Nuha langsung, kita harus expose token/credential -> tidak aman.
 * - Dengan proxy, browser hanya mengirim request "aman" (path + payload) dan server yang menambahkan
 *   Authorization via `nuhaApiClient` (lihat interceptor di `src/api/nuha-client.ts`).
 *
 * Supported:
 * - POST /api/nuha/proxy  { method, path, body?, params? }
 */
export async function POST(req: Request) {
  const { method, path, body, params } = (await req.json()) as {
    method: "GET" | "POST";
    path: string;
    body?: unknown;
    params?: Record<string, unknown>;
  };

  // For nuha env, we force server-side token usage; for other env we still proxy safely.
  // (Login only applies when BE_ENV = nuha; nuha-client handles that.)
  //
  // Basic validation:
  // - `path` wajib absolute (diawali "/") supaya tidak jadi open proxy ke host lain.
  if (!path || !path.startsWith("/")) {
    return NextResponse.json({ error: "Invalid path" }, { status: 400 });
  }

  try {
    if (method === "GET") {
      const res = await nuhaApiClient.get(path, { params });
      return NextResponse.json(res.data, { headers: { "Cache-Control": "no-store" } });
    }

    const res = await nuhaApiClient.post(path, body ?? {}, { params });
    return NextResponse.json(res.data, { headers: { "Cache-Control": "no-store" } });
  } catch (e) {
    // Avoid leaking internals; keep enough info for debugging.
    // NOTE: Saat error, kita tidak meneruskan detail response upstream apa adanya agar tidak bocor.
    const message = e instanceof Error ? e.message : "Proxy error";
    const be = c.CONFIG.BE_ENV;
    return NextResponse.json({ error: message, be_env: be }, { status: 500 });
  }
}


# API Configuration

## Setup

Tidak ada “general API base URL” di layer ini.

Yang ada adalah helper client-side untuk memanggil route handler internal Next.js:

- `POST /api/nuha/proxy` (server-side proxy ke Nuha / local gateway)

## Files

- `client.ts` - helper `nuhaProxyRequest()` untuk call `/api/nuha/proxy`
- `index.ts` - exports

## Usage

Gunakan `nuhaProxyRequest()` di browser runtime agar token Nuha tetap server-side.

Contoh:

```typescript
import { nuhaProxyRequest } from "@/api/client";

type MyResponse = { data: unknown };

const data = await nuhaProxyRequest<MyResponse>({
  method: "POST",
  path: "/open-api/emr/dynamic-view-report",
  body: { /* payload */ },
});
```

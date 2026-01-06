# API Configuration

## Setup

1. **Set your API endpoint** in `.env.local`:
   ```
   NEXT_PUBLIC_API_URL=https://your-api-endpoint.com/api
   ```

2. **Or modify directly** in `src/api/client.ts`:
   ```typescript
   const API_BASE_URL = "https://your-api-endpoint.com/api";
   ```

## Files

- `client.ts` - Axios client configuration with interceptors
- `index.ts` - Exports

## Usage

The API client is automatically configured with:
- Base URL from environment variable
- JSON content type headers
- Request/response interceptors for error handling
- 10 second timeout

## Authentication

To add authentication, uncomment and modify the request interceptor in `client.ts`:

```typescript
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
```


import axios, { AxiosInstance, AxiosError } from "axios";

// Nuha Integration API Base URL
const NUHA_API_BASE_URL = process.env.NEXT_PUBLIC_NUHA_API_URL || "https://integrations.nuha.care";

// Nuha API Token
const NUHA_API_TOKEN = process.env.NEXT_PUBLIC_NUHA_API_TOKEN || "";

// Create axios instance for Nuha API
export const nuhaApiClient: AxiosInstance = axios.create({
  baseURL: NUHA_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${NUHA_API_TOKEN}`,
  },
  withCredentials: false, // Set to false since we're using Bearer token auth
  // timeout: 15000, // 15 seconds
});

// Response interceptor
nuhaApiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
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

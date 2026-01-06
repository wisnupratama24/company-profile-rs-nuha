import axios, { AxiosInstance, AxiosError } from "axios";

// API Base URL - Change this to your actual API endpoint
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

// Create axios instance with default config
export const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 seconds
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Add auth token if available
    // const token = localStorage.getItem("token");
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    // Handle common errors
    if (error.response) {
      // Server responded with error status
      const status = error.response.status;
      const data = error.response.data as { error?: string; message?: string };

      switch (status) {
        case 400:
          console.error("Bad Request:", data.error || data.message);
          break;
        case 401:
          console.error("Unauthorized");
          // Handle logout or redirect
          break;
        case 404:
          console.error("Not Found:", data.error || data.message);
          break;
        case 500:
          console.error("Server Error:", data.error || data.message);
          break;
        default:
          console.error("API Error:", data.error || data.message);
      }
    } else if (error.request) {
      // Request made but no response received
      console.error("Network Error: No response received");
    } else {
      // Something else happened
      console.error("Error:", error.message);
    }

    return Promise.reject(error);
  }
);

export default apiClient;


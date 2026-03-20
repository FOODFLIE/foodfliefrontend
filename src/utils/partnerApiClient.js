// src/utils/partnerApiClient.js
import axios from "axios";
import { getFlieOptions } from "./flieUtils";
const flies = getFlieOptions();
const API_URL = flies.base_url;

export const partnerApiClient = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor
partnerApiClient.interceptors.request.use(
  (config) => {
    // Use partner-specific token
    const partnerToken = localStorage.getItem("partnerToken"); 
    if (partnerToken) {
      config.headers.Authorization = `Bearer ${partnerToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response Interceptor
partnerApiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      console.error("❌ Network Error - Backend not reachable:", {
        message: error.message,
      });
    } else {
      console.error("❌ Partner API Error:", {
        status: error.response.status,
        data: error.response.data,
      });
    }

    if (error.response?.status === 401) {
      localStorage.removeItem("partnerToken");
      localStorage.removeItem("partner");
      // Handle partner logout event here if needed
    }

    return Promise.reject(error);
  },
);

export default partnerApiClient;

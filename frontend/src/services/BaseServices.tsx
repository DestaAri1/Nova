import axios, { InternalAxiosRequestConfig } from "axios";
import { getToken } from "./TokenSevices.tsx";

const API_URL = "http://127.0.0.1:8000/api/";

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = getToken();
  if (token) {
    config.headers.set("Authorization", `Bearer ${token}`);
  }
  return config;
});

export default apiClient;

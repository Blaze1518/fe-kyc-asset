import axios from "axios";
import { attachInterceptors } from "./axios.interceptors";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

attachInterceptors(axiosInstance);

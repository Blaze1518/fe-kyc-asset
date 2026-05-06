import type { AxiosInstance } from "axios";
import { normalizeAxiosError } from "./axios.error";
import { axiosInstance } from "./axios.instance";

export const TOKEN_EXPIRED_CODE = "AUTH_001";

export function attachInterceptors(instance: AxiosInstance) {
  instance.interceptors.request.use(
    (config) => {
      config.headers["X-Request-Id"] = crypto.randomUUID();
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const httpError = normalizeAxiosError(error);
      const originalRequest = error.config;

      const errorCode = (httpError.data as any)?.errorCode;

      const resData = error.response?.data;

      if (
        httpError.status === 401 &&
        errorCode === "TOKEN_EXPIRED" &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true;
        try {
          await axiosInstance.post("/auth/refresh-token");
          return instance(originalRequest);
        } catch (refreshError) {
          window.location.href = "/sign-in";
          return Promise.reject(normalizeAxiosError(refreshError));
        }
      }

      if (httpError.status === 403 && errorCode === "ERROR_IP_NOT_ALLOWED") {
        window.location.href = "/blocked-ip";
      }

      return Promise.reject(httpError);
    },
  );
}

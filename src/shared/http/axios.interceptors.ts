import type { AxiosInstance } from "axios";
import { normalizeAxiosError } from "./axios.error";
import { axiosInstance } from "./axios.instance";

export function attachInterceptors(instance: AxiosInstance) {
  instance.interceptors.request.use(
    (config) => {
      config.headers["X-Request-Id"] = crypto.randomUUID();
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          await axiosInstance.post("/auth/refresh-token");
          return instance(originalRequest);
        } catch (refreshError) {
          window.location.href = "/sign-in";
          return Promise.reject(refreshError);
        }
      }

      if (error.response?.status === 403) {
        const resData = error.response.data;

        if (resData?.error?.errorCode === "ERROR_IP_NOT_ALLOWED") {
          if (!window.location.pathname.includes("/blocked-ip")) {
            window.location.href = "/blocked-ip";
          }

          return Promise.reject(normalizeAxiosError(error));
        }
      }

      return Promise.reject(normalizeAxiosError(error));
    }
  );
}

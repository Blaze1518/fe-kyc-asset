import { HttpError } from "../http/axios.error";
import axios from "axios";

export const getErrorMessage = (
  error: unknown,
  fallback = "Có lỗi xảy ra"
): string => {
  if (error instanceof HttpError) {
    if (typeof error.data === "string" && error.data) return error.data;
    if (
      typeof error.data === "object" &&
      error.data &&
      "message" in error.data
    ) {
      return (error.data as any).message || fallback;
    }
  }

  if (axios.isAxiosError(error)) {
    const data = error.response?.data;
    return data?.error?.message || data?.message || error.message || fallback;
  }

  if (error instanceof Error) return error.message;

  return fallback;
};

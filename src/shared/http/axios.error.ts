// axios.error.ts
import axios from "axios";
import type { ApiErrorBody, ApiResponse } from "./axios.types";

export class HttpError extends Error {
  constructor(
    public status: number,
    public code: string,
    public data: ApiErrorBody | unknown | null,
  ) {
    super(code);
  }
}

export function normalizeAxiosError(error: unknown): HttpError {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status ?? 500;
    const data = error.response?.data;

    const errorBody = data?.error ?? {
      message: data?.message || "Có lỗi xảy ra",
      errorCode: "UNKNOWN_ERROR",
    };

    return new HttpError(status, errorBody.errorCode, errorBody);
  }

  return new HttpError(500, "INTERNAL_SERVER_ERROR", "Lỗi không xác định");
}

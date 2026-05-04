// axios.error.ts
import { AxiosError } from "axios";
import type { ApiErrorBody, ApiResponse } from "./axios.types";

export class HttpError extends Error {
  constructor(
    public status: number,
    public code: string,
    public data: ApiErrorBody | unknown | null
  ) {
    super(code);
  }
}

export function normalizeAxiosError(error: unknown): HttpError {
  if (error instanceof AxiosError) {
    const status = error.response?.status ?? 0;
    const code = error.code ?? "AXIOS_ERROR";

    const rawData = error.response?.data as
      | ApiResponse<unknown>
      | ApiErrorBody
      | undefined;

    let errorData: ApiErrorBody | unknown | null = null;

    if (rawData && typeof rawData === "object" && "error" in rawData) {
      const envelope = rawData as ApiResponse<unknown>;
      errorData = envelope.error;
    } else {
      errorData = rawData ?? null;
    }

    return new HttpError(status, code, errorData);
  }

  const fallbackError =
    error instanceof Error ? error.message : "An unknown error occurred";

  return new HttpError(500, "INTERNAL_SERVER_ERROR", fallbackError);
}

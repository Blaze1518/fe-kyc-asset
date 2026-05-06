import { HttpError } from "../http/axios.error";

export const getErrorMessage = (
  error: unknown,
  fallback = "Có lỗi xảy ra",
): string => {
  if (error instanceof HttpError) {
    return (error.data as any)?.message || fallback;
  }
  return fallback;
};

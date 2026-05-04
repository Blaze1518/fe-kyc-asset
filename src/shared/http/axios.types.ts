export type ApiErrorBody = {
  statusCode: number;
  errorId: number;
  errorCode: string;
  message: string;
  details: unknown;
  path: string;
  timestamp: string;
  requestId: string;
};

export type ApiResponse<T> = {
  success: boolean;
  data?: T | null;
  meta?: unknown | null;
  error?: ApiErrorBody | null;
};

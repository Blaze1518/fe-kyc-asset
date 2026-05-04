export interface Meta {
  current: number;
  pageSize: number;
  pages: number;
  total: number;
}

export interface ApiErrorResponse {
  success: false;
  error: {
    statusCode: number;
    errorId: number;
    errorCode: string;
    message: string;
    details: any;
    path: string;
    timestamp: string;
    requestId: string;
  };
}

export interface ApiSuccessResponse<T = unknown> {
  success: true;
  data: T;
  meta: any;
  error: null;
}

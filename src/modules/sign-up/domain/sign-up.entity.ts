import type { ApiResponse } from "@/shared/http/axios.types";

export type SignUpPayload = {
  username: string;
  name: string;
  password: string;
};

export interface SignUpResult extends ApiResponse<{ message: string }> {}

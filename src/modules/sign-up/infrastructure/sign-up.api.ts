import { axiosInstance } from "@/shared/http/axios.instance";
import { SignUpPayload, SignUpResult } from "../domain/sign-up.entity";
import type { ApiResponse } from "@/shared/http/axios.types";

export const signUpApi = async (
  payload: SignUpPayload
): Promise<SignUpResult> => {
  const { data } = await axiosInstance.post("/auth/register", payload);
  return data;
};

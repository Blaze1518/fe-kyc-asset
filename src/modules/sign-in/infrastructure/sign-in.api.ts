import { axiosInstance } from "@/shared/http/axios.instance";
import { SignInPayload, SignInResult } from "../domain/sign-in.entity";
import type { AuthUserResponse } from "../domain/sign-in.entity";
import type { LogoutResult } from "../domain/sign-in.entity";
export async function signInApi(payload: SignInPayload): Promise<SignInResult> {
  const { data } = await axiosInstance.post("/auth/login", payload);

  if (data.statusCode === 200 || data.success) {
    return { message: data.message };
  }

  throw new Error("Unexpected API response format");
}

export async function getAuthUserApi(): Promise<AuthUserResponse> {
  const { data } = await axiosInstance.get<AuthUserResponse>("/users/me");
  return data;
}

export async function logoutApi(): Promise<LogoutResult> {
  const { data } = await axiosInstance.post<LogoutResult>("/auth/logout");
  return data;
}

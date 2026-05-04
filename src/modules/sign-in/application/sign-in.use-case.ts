import {
  AuthUserResponse,
  LogoutResult,
  SignInPayload,
  SignInResult,
} from "../domain/sign-in.entity";
import {
  getAuthUserApi,
  logoutApi,
  signInApi,
} from "../infrastructure/sign-in.api";

export async function signInUseCase(
  payload: SignInPayload
): Promise<SignInResult> {
  return await signInApi(payload);
}

export async function getAuthUserUseCase(): Promise<AuthUserResponse> {
  return await getAuthUserApi();
}

export async function logoutUseCase(): Promise<LogoutResult> {
  return await logoutApi();
}

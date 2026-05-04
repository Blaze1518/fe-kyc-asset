import { SignUpPayload, SignUpResult } from "../domain/sign-up.entity";
import { signUpApi } from "../infrastructure/sign-up.api";

export async function signUpUseCase(payload: SignUpPayload) {
  return await signUpApi(payload);
}

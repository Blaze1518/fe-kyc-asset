import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MutationConfig } from "@/shared/query/mutation-config";
import { signUpUseCase } from "../../application/sign-up.use-case";
import type { SignUpPayload, SignUpResult } from "../../domain/sign-up.entity";

type UseSignUpOptions = {
  mutationConfig?: MutationConfig<typeof signUpUseCase> & {
    meta?: {
      successMessage?: string;
      ignoreErrorToast?: boolean;
    };
  };
};

export const useSignUp = (options?: UseSignUpOptions) => {
  const { mutationConfig } = options ?? {};

  return useMutation({
    mutationFn: (payload: SignUpPayload) => signUpUseCase(payload),
    ...mutationConfig,
  });
};

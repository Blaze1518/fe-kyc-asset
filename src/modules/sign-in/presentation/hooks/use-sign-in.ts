import { useMutation, useQuery } from "@tanstack/react-query";
import { MutationConfig } from "@/shared/query/mutation-config";
import {
  getAuthUserUseCase,
  logoutUseCase,
  signInUseCase,
} from "../../application/sign-in.use-case";
import type {
  AuthUserResponse,
  LogoutResult,
  SignInPayload,
  SignInResult,
} from "../../domain/sign-in.entity";
import type { HttpError } from "@/shared/http/axios.error";
import { useRouter } from "next/navigation";
type UseSignInOptions = {
  mutationConfig?: MutationConfig<typeof signInUseCase> & {
    meta?: {
      successMessage?: string;
      ignoreErrorToast?: boolean;
    };
  };
};

export function useSignIn(options?: UseSignInOptions) {
  const { mutationConfig } = options ?? {};
  const router = useRouter();
  return useMutation<SignInResult, HttpError, SignInPayload>({
    mutationFn: signInUseCase,
    onSuccess: (data: SignInResult) => {
      router.push("/dashboard");
    },
    meta: {
      successMessage: "Đăng nhập thành công",
      ...mutationConfig?.meta,
    },
    ...mutationConfig,
  });
}

export function useGetAuthUser() {
  return useQuery<AuthUserResponse>({
    queryKey: ["auth-user"],
    queryFn: getAuthUserUseCase,
    staleTime: 0,
    gcTime: 0,
    refetchOnWindowFocus: true,
    placeholderData: undefined,
  });
}

export function useLogout() {
  const router = useRouter();
  return useMutation<LogoutResult, HttpError>({
    mutationFn: logoutUseCase,
    onSuccess: () => {
      router.push("/sign-in");
    },
  });
}

import type { Role } from "@/modules/roles/domain/role.entity";

type AuthResponse<T> = {
  statusCode: number;
  message: string;
  data: T;
};

export type SignInPayload = {
  username: string;
  password: string;
};

export type SignInResult = {
  message?: string;
};

export interface AuthUser {
  id: string;
  username: string;
  email: string;
  roles: Role[];
  permissions: string[];
}

export interface AuthUserResponse extends AuthResponse<AuthUser> {}

export interface LogoutResult {
  statusCode: number;
  message: string;
}

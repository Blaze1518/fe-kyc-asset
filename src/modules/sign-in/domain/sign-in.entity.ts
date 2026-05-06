import type { Role } from "@/modules/roles/domain/role.entity";
export type AuthRuleAction = "manage" | "create" | "read" | "update" | "delete";

export type AuthRuleCondition = Record<string, unknown>;

export interface AuthRule {
  action: AuthRuleAction;
  subject: string;
  conditions?: AuthRuleCondition;
}

type ApiResponse<T> = {
  success: boolean;
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
  displayName: string;
  email: string;
  roles: string[];
  rules: AuthRule[];
}

export interface AuthUserResponse extends ApiResponse<AuthUser> {}

export interface LogoutResult {
  statusCode: number;
  message: string;
}

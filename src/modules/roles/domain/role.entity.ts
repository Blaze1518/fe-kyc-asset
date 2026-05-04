import type { ApiResponse } from "@/shared/http/axios.types";

export interface Role {
  id: string;
  code: string;
  name: string;
  permissions: string[];
  isSystem: string;
  createdAt: string | null;
  updatedAt: string | null;
}

export interface CreateRoleDto {
  code: string;
  name: string;
  permissions: string[];
  isSystem?: boolean;
}

export interface RoleDetailResponse extends ApiResponse<Role> {}

export interface UpdateRoleDto extends Partial<CreateRoleDto> {}

export interface RoleListParams {
  page?: number;
  limit?: number;
  search?: string;
}

export interface PaginationMeta {
  current: number;
  pageSize: number;
  pages: number;
  total: number;
}

export interface RoleListResponse extends ApiResponse<Role[]> {
  meta: PaginationMeta;
}

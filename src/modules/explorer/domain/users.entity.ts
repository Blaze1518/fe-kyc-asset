import type { Role } from "@/modules/roles/domain/role.entity";

export interface UserStatus {
  id: number | string;
}

export interface User {
  id: string;
  username: string;
  name: string;
  roles: Role[];
  status: UserStatus;
  createdAt: string | null;
  updatedAt: string | null;
}

export interface CreateUserDto {
  username: string;
  name: string;
  roles: string[];
  status: UserStatus;
}

export interface UpdateUserDto extends Partial<CreateUserDto> {}

export interface UserListParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: number;
}

export interface PaginationMeta {
  current: number;
  pageSize: number;
  pages: number;
  total: number;
}

export interface UserListResponse {
  statusCode: number;
  message: string;
  data: User[];
  meta: PaginationMeta;
}

export interface UserDetailResponse {
  statusCode: number;
  message: string;
  data: User;
}

export interface UpdateUserRolesDto {
  roleIds: string[];
}

import type { ApiResponse } from "@/shared/http/axios.types";

export interface Permission {
  id: string;
  title: string;
  name: string;
  description: string;
  category: string;
  parent: string | null;
  updatedBy: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePermissionDto {
  title: string;
  name: string;
  description?: string;
  category: string;
  parent?: string;
}

export interface PermissionDetailResponse extends ApiResponse<Permission> {}

// export interface CreatePermissionDto {
//   name: string;
//   description?: string;
//   module?: string;
// }

export interface UpdatePermissionDto extends Partial<CreatePermissionDto> {}

export interface PermissionListParams {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
}

export interface PaginationMeta {
  current: number;
  pageSize: number;
  pages: number;
  total: number;
}

export interface PermissionListResponse extends ApiResponse<Permission[]> {
  meta: PaginationMeta;
}

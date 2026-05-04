import type { ApiResponse } from "@/shared/http/axios.types";

export interface WhitelistIp {
  id: string;
  ip: string;
  description: string;
  status: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateWhitelistIpDto {
  ip: string;
  description?: string;
  status?: number;
}

export interface WhitelistIpDetailResponse extends ApiResponse<WhitelistIp> {}

// export interface CreatePermissionDto {
//   name: string;
//   description?: string;
//   module?: string;
// }

export interface UpdateWhitelistIpDto extends Partial<CreateWhitelistIpDto> {}

export interface WhitelistIpListParams {
  page?: number;
  limit?: number;
  ip?: string;
  description?: string;
  status?: number;
}

export interface PaginationMeta {
  current: number;
  pageSize: number;
  pages: number;
  total: number;
}

export interface WhitelistIpListResponse extends ApiResponse<WhitelistIp[]> {
  meta: PaginationMeta;
}

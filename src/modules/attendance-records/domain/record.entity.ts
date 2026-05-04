import type { ApiResponse } from "@/shared/http/axios.types";

export interface Record {
  id: string;
  uuid: string;
  name: string;
  ips: string[];
  host_name: string;
  machine_id: string;
  client_timestamp: string;
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

export interface RecordDetailResponse extends ApiResponse<Record> {}

// export interface CreatePermissionDto {
//   name: string;
//   description?: string;
//   module?: string;
// }

export interface UpdatePermissionDto extends Partial<CreatePermissionDto> {}

export interface RecordListSearch {
  name?: string;
  clientTimestampFrom?: string;
  clientTimestampTo?: string;
}

export interface RecordListParams {
  page: number;
  limit?: number;
  search?: RecordListSearch;
  sort?: {
    field: string;
    direction: "asc" | "desc";
  };
}

export interface PaginationMeta {
  current: number;
  pageSize: number;
  pages: number;
  total: number;
}

export interface RecordListResponse extends ApiResponse<Record[]> {
  meta: PaginationMeta;
}

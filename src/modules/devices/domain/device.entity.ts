import type { ApiResponse } from "@/shared/http/axios.types";

export interface Device {
  id: string;
  machine_id: string;
  host_name: string;
  ip_addresses: string[];
  app_version: string;
  queue_size: number;
  last_heartbeat: string;
  createdAt: string;
  updatedAt: string;
}

export interface DeviceDetailResponse extends ApiResponse<Device> {}

export type SortDirection = "asc" | "desc";
export type DeviceSortField = "last_heartbeat" | "createdAt" | "updatedAt";

export interface DeviceListParams {
  page?: number;
  limit?: number;
  machine_id?: string;
  host_name?: string;
  status?: "online" | "offline";
  sort?: {
    field: DeviceSortField;
    direction: SortDirection;
  };
  includeSummary?: boolean;
}

export interface PaginationMeta {
  current: number;
  pageSize: number;
  pages: number;
  total: number;
}

export interface DevicesSummary {
  total: number;
  totalOnline: number;
  totalOffline: number;
}

export interface DeviceListResponse extends ApiResponse<Device[]> {
  meta: PaginationMeta & { summary?: DevicesSummary };
}

/**Update */
export enum DeviceCommandType {
  FORCE_UPDATE = "FORCE_UPDATE",
  UPDATE_WALLPAPER = "UPDATE_WALLPAPER",
}

export interface ForceUpdatePayload {
  version: string;
  description?: string;
}

export interface UpdateWallpaperPayload {
  url: string;
  description?: string;
}

export interface ForceUpdateCommandDto {
  type: DeviceCommandType.FORCE_UPDATE;
  payload: ForceUpdatePayload;
}

export interface UpdateWallpaperCommandDto {
  type: DeviceCommandType.UPDATE_WALLPAPER;
  payload: UpdateWallpaperPayload;
}

export type CreateDeviceCommandDto =
  | ForceUpdateCommandDto
  | UpdateWallpaperCommandDto;

export type DeviceCommandHistory = {
  id: string;
  machine_id: string;
  status: "PENDING" | "SUCCESS" | "FAILED" | "EXECUTING";
  createdAt: string;
} & CreateDeviceCommandDto;

export interface CommandHistoryResponse {
  statusCode: number;
  message: string;
  data: DeviceCommandHistory[];
}

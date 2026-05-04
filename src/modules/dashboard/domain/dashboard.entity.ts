import type { ApiResponse } from "@/shared/http/axios.types";

export interface DeviceStatusSummary {
  totalOnline: number;
  totalOffline: number;
}

export interface DeviceStatusSummaryResponse
  extends ApiResponse<DeviceStatusSummary> {}

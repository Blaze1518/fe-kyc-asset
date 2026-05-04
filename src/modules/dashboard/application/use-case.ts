import { getDeviceStatusSummaryApi } from "../infrastructure/dashboard.api";
import type { DeviceStatusSummaryResponse } from "../domain/dashboard.entity";

export async function getDeviceStatusSummary(): Promise<DeviceStatusSummaryResponse> {
  return await getDeviceStatusSummaryApi();
}

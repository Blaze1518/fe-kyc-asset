import { axiosInstance } from "@/shared/http/axios.instance";
import type {
  DeviceStatusSummaryResponse,
  DeviceStatusSummary,
} from "../domain/dashboard.entity";
const BASE_URL = "/devices";

export const getDeviceStatusSummaryApi =
  async (): Promise<DeviceStatusSummaryResponse> => {
    const response = await axiosInstance.get<DeviceStatusSummaryResponse>(
      `${BASE_URL}/status-summary`
    );
    return response.data;
  };

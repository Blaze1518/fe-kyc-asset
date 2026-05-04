import { axiosInstance } from "@/shared/http/axios.instance";
import { DeviceListParams, DeviceListResponse } from "../domain/device.entity";
import {
  CreateDeviceCommandDto,
  DeviceCommandHistory,
  CommandHistoryResponse,
} from "../domain/device.entity";
const BASE_URL = "/devices";
const COMMAND_URL = "/device-commands";

export const deviceApi = {
  getDevices: async (
    params?: DeviceListParams
  ): Promise<DeviceListResponse> => {
    const { data } = await axiosInstance.get(BASE_URL, { params });
    return data;
  },
};

//Update device command history
export const deviceCommandHistoryApi = {
  sendCommand: async (
    deviceId: string,
    command: CreateDeviceCommandDto
  ): Promise<DeviceCommandHistory> => {
    const { data } = await axiosInstance.post(
      `${COMMAND_URL}/${deviceId}`,
      command
    );
    return data;
  },

  getCommandHistory: async (
    machineId: string
  ): Promise<CommandHistoryResponse> => {
    const { data } = await axiosInstance.get(`${COMMAND_URL}/${machineId}`);
    return data;
  },
};

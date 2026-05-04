import {
  deviceApi,
  deviceCommandHistoryApi,
} from "../infrastructure/device.api";
import {
  CreateDeviceCommandDto,
  DeviceListParams,
} from "../domain/device.entity";

export async function getDevices(params?: DeviceListParams) {
  return await deviceApi.getDevices(params);
}

//Update device command history
export async function sendCommand(
  deviceId: string,
  command: CreateDeviceCommandDto
) {
  return await deviceCommandHistoryApi.sendCommand(deviceId, command);
}

//Get device command history
export async function getCommandHistory(machineId: string) {
  return await deviceCommandHistoryApi.getCommandHistory(machineId);
}

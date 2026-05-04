import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  CreateDeviceCommandDto,
  DeviceListParams,
} from "../../domain/device.entity";
import {
  getCommandHistory,
  getDevices,
  sendCommand,
} from "../../application/use-case";

export const useDevices = (params?: DeviceListParams) => {
  return useQuery({
    queryKey: ["devices", params],
    queryFn: () => getDevices(params),
  });
};

//Command
export const useSendCommand = () => {
  return useMutation({
    mutationFn: ({
      deviceId,
      command,
    }: {
      deviceId: string;
      command: CreateDeviceCommandDto;
    }) => {
      return sendCommand(deviceId, command);
    },
  });
};

//Command history
export const useCommandHistory = (machineId: string) => {
  return useQuery({
    queryKey: ["command-history", machineId],
    queryFn: () => getCommandHistory(machineId),
    enabled: !!machineId,
    refetchInterval: 60000,
    select: (response) => response.data,
  });
};

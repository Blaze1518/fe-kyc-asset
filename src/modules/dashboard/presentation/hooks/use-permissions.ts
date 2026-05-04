import { useQuery } from "@tanstack/react-query";
import { getDeviceStatusSummary } from "../../application/use-case";

export const useDeviceStatusSummary = () => {
  return useQuery({
    queryKey: ["device-status-summary"],
    queryFn: () => getDeviceStatusSummary(),
  });
};

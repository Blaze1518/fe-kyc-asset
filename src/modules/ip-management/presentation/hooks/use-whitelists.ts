import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  CreateWhitelistIpDto,
  WhitelistIpListParams,
  UpdateWhitelistIpDto,
} from "../../domain/whitelist.entity";
import {
  createWhitelistIp,
  deleteWhitelistIp,
  getWhitelistIps,
  updateWhitelistIp,
} from "../../application/use-case";
import { MutationConfig } from "@/shared/query/mutation-config";

export const useWhitelistIps = (params?: WhitelistIpListParams) => {
  return useQuery({
    queryKey: ["whitelist-ips", params],
    queryFn: () => getWhitelistIps(params),
  });
};

type UseCreateWhitelistIpOptions = {
  mutationConfig?: MutationConfig<typeof createWhitelistIp> & {
    meta?: {
      successMessage?: string;
      ignoreErrorToast?: boolean;
    };
  };
};

export const useCreateWhitelistIp = (options?: UseCreateWhitelistIpOptions) => {
  const { mutationConfig } = options ?? {};
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateWhitelistIpDto) => createWhitelistIp(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["whitelist-ips"] });
    },
    ...mutationConfig,
  });
};

export const useUpdateWhitelistIp = (params?: WhitelistIpListParams) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: UpdateWhitelistIpDto;
    }) => updateWhitelistIp(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["whitelist-ips"] });
    },
  });
};

export const useDeleteWhitelistIp = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteWhitelistIp(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["whitelist-ips"] });
    },
  });
};

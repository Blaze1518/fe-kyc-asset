import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  CreatePermissionDto,
  PermissionListParams,
  UpdatePermissionDto,
} from "../../domain/permission.entity";
import { createPermission } from "../../application/use-case";
import { getPermissions } from "../../application/use-case";
import { updatePermission } from "../../application/use-case";
import { deletePermission } from "../../application/use-case";
import { MutationConfig } from "@/shared/query/mutation-config";
export const usePermissions = (params?: PermissionListParams) => {
  return useQuery({
    queryKey: ["permissions", params],
    queryFn: () => getPermissions(params),
  });
};
type UseCreatePermissionOptions = {
  mutationConfig?: MutationConfig<typeof createPermission> & {
    meta?: {
      successMessage?: string;
      ignoreErrorToast?: boolean;
    };
  };
};
export const useCreatePermission = (options?: UseCreatePermissionOptions) => {
  const { mutationConfig } = options ?? {};
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreatePermissionDto) => createPermission(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["permissions"] });
    },
    ...mutationConfig,
  });
};

export const useUpdatePermission = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: UpdatePermissionDto;
    }) => updatePermission(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["permissions"] });
    },
  });
};

export const useDeletePermission = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deletePermission(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["permissions"] });
    },
  });
};

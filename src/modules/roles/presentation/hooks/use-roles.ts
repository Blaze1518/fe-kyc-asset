import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  CreateRoleDto,
  RoleListParams,
  UpdateRoleDto,
} from "../../domain/role.entity";
import { MutationConfig } from "@/shared/query/mutation-config";
import {
  createRole,
  getRoles,
  updateRole,
  deleteRole,
} from "../../application/use-case";

export const useRoles = (params?: RoleListParams) => {
  return useQuery({
    staleTime: 5 * 60 * 1000,
    queryKey: ["roles", params],
    queryFn: () => getRoles(params),
  });
};

export const useCreateRole = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateRoleDto) => createRole(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roles"] });
    },
  });
};

export const useUpdateRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateRoleDto }) =>
      updateRole(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roles"] });
    },
  });
};

export const useDeleteRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteRole(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roles"] });
    },
  });
};

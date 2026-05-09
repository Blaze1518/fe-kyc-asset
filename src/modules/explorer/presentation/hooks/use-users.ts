import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  CreateUserDto,
  UpdateUserDto,
  UpdateUserRolesDto,
  UserListParams,
} from "../../domain/users.entity";
import { userApi } from "../../infrastructure/user.api";
import { MutationConfig } from "@/shared/query/mutation-config";

export const useUsers = (params?: UserListParams) => {
  return useQuery({
    queryKey: ["users", params],
    queryFn: () => userApi.getUsers(params),
  });
};

type UseMutationOptions = {
  mutationConfig?: MutationConfig<typeof userApi.createUser>;
};

export const useCreateUser = (
  params?: UserListParams,
  options?: UseMutationOptions
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateUserDto) => userApi.createUser(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users", params] });
    },
    ...options,
  });
};

export const useUpdateUserRoles = (
  params?: UserListParams,
  options?: UseMutationOptions
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (variables: { id: string; payload: UpdateUserRolesDto }) =>
      userApi.updateUserRoles(variables.id, variables.payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users", params] });
    },
    ...options,
  });
};

export const useUpdateUser = (
  params?: UserListParams,
  options?: UseMutationOptions
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (variables: { id: string; payload: UpdateUserDto }) =>
      userApi.updateUser(variables.id, variables.payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users", params] });
    },
    ...options,
  });
};

export const useDeleteUser = (params?: UserListParams) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => userApi.deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users", params] });
    },
  });
};

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  CreatePermissionDto,
  RecordListParams,
} from "../../domain/record.entity";
import { getRecords } from "../../application/use-case";
import { MutationConfig } from "@/shared/query/mutation-config";

export const useRecords = (params?: RecordListParams) => {
  return useQuery({
    queryKey: ["records", params],
    queryFn: () => getRecords(params),
  });
};

// type UseCreatePermissionOptions = {
//   mutationConfig?: MutationConfig<typeof createPermission> & {
//     meta?: {
//       successMessage?: string;
//       ignoreErrorToast?: boolean;
//     };
//   };
// };
// export const useCreatePermission = (options?: UseCreatePermissionOptions) => {
//   const { mutationConfig } = options ?? {};
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: (payload: CreatePermissionDto) => createPermission(payload),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["permissions"] });
//     },
//     ...mutationConfig,
//   });
// };

// export const useUpdatePermission = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: ({
//       id,
//       payload,
//     }: {
//       id: string;
//       payload: UpdatePermissionDto;
//     }) => updatePermission(id, payload),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["permissions"] });
//     },
//   });
// };

// export const useDeletePermission = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: (id: string) => deletePermission(id),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["permissions"] });
//     },
//   });
// };

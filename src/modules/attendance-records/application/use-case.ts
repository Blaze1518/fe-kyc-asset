import { recordApi } from "../infrastructure/record.api";
import {
  CreatePermissionDto,
  RecordListParams,
  UpdatePermissionDto,
} from "../domain/record.entity";

export async function getRecords(params?: RecordListParams) {
  return await recordApi.getRecords(params);
}

// export async function createPermission(payload: CreatePermissionDto) {
//   return await permissionApi.createPermission(payload);
// }

// export async function updatePermission(
//   id: string,
//   payload: UpdatePermissionDto
// ) {
//   return await permissionApi.updatePermission(id, payload);
// }

// export async function deletePermission(id: string) {
//   return await permissionApi.deletePermission(id);
// }

import { permissionApi } from "../infrastructure/permission.api";
import {
  CreatePermissionDto,
  PermissionListParams,
  UpdatePermissionDto,
} from "../domain/permission.entity";

export async function getPermissions(params?: PermissionListParams) {
  return await permissionApi.getPermissions(params);
}

export async function createPermission(payload: CreatePermissionDto) {
  return await permissionApi.createPermission(payload);
}

export async function updatePermission(
  id: string,
  payload: UpdatePermissionDto
) {
  return await permissionApi.updatePermission(id, payload);
}

export async function deletePermission(id: string) {
  return await permissionApi.deletePermission(id);
}

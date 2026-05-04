import { CreateRoleDto, UpdateRoleDto } from "../domain/role.entity";
import { roleApi } from "../infrastructure/role.api";
import { RoleListParams } from "../domain/role.entity";

export async function getRoles(params?: RoleListParams) {
  return await roleApi.getRoles(params);
}

export async function createRole(payload: CreateRoleDto) {
  return await roleApi.createRole(payload);
}

export async function updateRole(id: string, payload: UpdateRoleDto) {
  return await roleApi.updateRole(id, payload);
}

export async function deleteRole(id: string) {
  return await roleApi.deleteRole(id);
}

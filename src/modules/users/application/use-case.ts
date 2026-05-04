import {
  CreateUserDto,
  UpdateUserDto,
  UpdateUserRolesDto,
} from "../domain/users.entity";
import { userApi } from "../infrastructure/user.api";
import { UserListParams } from "../domain/users.entity";

export async function getUsers(params?: UserListParams) {
  return await userApi.getUsers(params);
}

export async function createUser(payload: CreateUserDto) {
  return await userApi.createUser(payload);
}

export async function updateUser(id: string, payload: UpdateUserDto) {
  return await userApi.updateUser(id, payload);
}

export async function deleteUser(id: string) {
  return await userApi.deleteUser(id);
}

export async function updateUserRoles(id: string, payload: UpdateUserRolesDto) {
  return await userApi.updateUserRoles(id, payload);
}

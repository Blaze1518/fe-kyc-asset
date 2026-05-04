import { axiosInstance } from "@/shared/http/axios.instance";
import type {
  CreateUserDto,
  UpdateUserDto,
  UpdateUserRolesDto,
  UserDetailResponse,
  UserListParams,
  UserListResponse,
} from "../domain/users.entity";

const BASE_URL = "/users";

export const userApi = {
  getUsers: async (params?: UserListParams): Promise<UserListResponse> => {
    const { data } = await axiosInstance.get(BASE_URL, { params });
    return data;
  },

  createUser: async (payload: CreateUserDto): Promise<UserDetailResponse> => {
    const { data } = await axiosInstance.post(BASE_URL, payload);
    return data;
  },

  updateUserRoles: async (
    id: string,
    payload: UpdateUserRolesDto
  ): Promise<UserDetailResponse> => {
    const { data } = await axiosInstance.patch(
      `${BASE_URL}/${id}/roles`,
      payload
    );
    return data;
  },

  updateUser: async (
    id: string,
    payload: UpdateUserDto
  ): Promise<UserDetailResponse> => {
    const { data } = await axiosInstance.patch(`${BASE_URL}/${id}`, payload);
    return data;
  },

  deleteUser: async (id: string): Promise<UserDetailResponse> => {
    const { data } = await axiosInstance.delete(`${BASE_URL}/${id}`);
    return data;
  },
};

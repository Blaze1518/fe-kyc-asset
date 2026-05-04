import { axiosInstance } from "@/shared/http/axios.instance";
import { Permission, PermissionListParams } from "../domain/permission.entity";
import type { ApiResponse } from "@/shared/http/axios.types";
import type { PermissionListResponse } from "../domain/permission.entity";
import type {
  CreatePermissionDto,
  PermissionDetailResponse,
  UpdatePermissionDto,
} from "../domain/permission.entity";
const BASE_URL = "/permissions";

export const permissionApi = {
  getPermissions: async (
    params?: PermissionListParams
  ): Promise<PermissionListResponse> => {
    const { data } = await axiosInstance.get(BASE_URL, { params });
    return data;
  },

  createPermission: async (
    payload: CreatePermissionDto
  ): Promise<PermissionDetailResponse> => {
    const { data } = await axiosInstance.post(BASE_URL, payload);
    return data;
  },

  updatePermission: async (
    id: string,
    payload: UpdatePermissionDto
  ): Promise<PermissionDetailResponse> => {
    const { data } = await axiosInstance.patch(`${BASE_URL}/${id}`, payload);
    return data;
  },

  deletePermission: async (id: string): Promise<PermissionDetailResponse> => {
    const { data } = await axiosInstance.delete(`${BASE_URL}/${id}`);
    return data;
  },

  // getPermissionById: async (id: string): Promise<ApiResponse<Permission>> => {
  //   const { data } = await axiosInstance.get(`${BASE_URL}/${id}`);
  //   return data;
  // },

  // createPermission: async (
  //   payload: CreatePermissionDto
  // ): Promise<ApiResponse<Permission>> => {
  //   const { data } = await axiosInstance.post(BASE_URL, payload);
  //   return data;
  // },

  // updatePermission: async (
  //   id: string,
  //   payload: UpdatePermissionDto
  // ): Promise<ApiResponse<Permission>> => {
  //   const { data } = await axiosInstance.patch(`${BASE_URL}/${id}`, payload);
  //   return data;
  // },

  // deletePermission: async (id: string): Promise<ApiResponse<void>> => {
  //   const { data } = await axiosInstance.delete(`${BASE_URL}/${id}`);
  //   return data;
  // },
};

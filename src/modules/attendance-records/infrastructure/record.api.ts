import { axiosInstance } from "@/shared/http/axios.instance";
import { Record, RecordListParams } from "../domain/record.entity";
import type { ApiResponse } from "@/shared/http/axios.types";
import type { RecordListResponse } from "../domain/record.entity";
import type {
  CreatePermissionDto,
  RecordDetailResponse,
  UpdatePermissionDto,
} from "../domain/record.entity";
const BASE_URL = "/records";

export const recordApi = {
  getRecords: async (
    params?: RecordListParams
  ): Promise<RecordListResponse> => {
    const { search, ...restParams } = params || {};

    const rawParams = {
      ...restParams,
      ...search,
    };

    const cleanedParams = Object.fromEntries(
      Object.entries(rawParams).filter(([_, v]) => v != null && v !== "")
    );

    const { data } = await axiosInstance.get(BASE_URL, {
      params: cleanedParams,
    });

    return data;
  },
};

// createPermission: async (
//   payload: CreatePermissionDto
// ): Promise<PermissionDetailResponse> => {
//   const { data } = await axiosInstance.post(BASE_URL, payload);
//   return data;
// },

// updatePermission: async (
//   id: string,
//   payload: UpdatePermissionDto
// ): Promise<PermissionDetailResponse> => {
//   const { data } = await axiosInstance.patch(`${BASE_URL}/${id}`, payload);
//   return data;
// },

// deletePermission: async (id: string): Promise<PermissionDetailResponse> => {
//   const { data } = await axiosInstance.delete(`${BASE_URL}/${id}`);
//   return data;
// },

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

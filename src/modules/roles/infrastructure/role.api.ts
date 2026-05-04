import { axiosInstance } from "@/shared/http/axios.instance";
import { Role, RoleListParams } from "../domain/role.entity";
import type { ApiResponse } from "@/shared/http/axios.types";
import type { RoleListResponse } from "../domain/role.entity";
import type {
  CreateRoleDto,
  RoleDetailResponse,
  UpdateRoleDto,
} from "../domain/role.entity";
const BASE_URL = "/roles";

export const roleApi = {
  getRoles: async (params?: RoleListParams): Promise<RoleListResponse> => {
    const { data } = await axiosInstance.get(BASE_URL, { params });
    return data;
  },

  createRole: async (payload: CreateRoleDto): Promise<RoleDetailResponse> => {
    const { data } = await axiosInstance.post(BASE_URL, payload);
    return data;
  },

  updateRole: async (
    id: string,
    payload: UpdateRoleDto
  ): Promise<RoleDetailResponse> => {
    const { data } = await axiosInstance.patch(`${BASE_URL}/${id}`, payload);
    return data;
  },

  deleteRole: async (id: string): Promise<RoleDetailResponse> => {
    const { data } = await axiosInstance.delete(`${BASE_URL}/${id}`);
    return data;
  },
};

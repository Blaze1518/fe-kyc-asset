import { axiosInstance } from "@/shared/http/axios.instance";
import type {
  WhitelistIpListParams,
  WhitelistIpListResponse,
} from "../domain/whitelist.entity";
import type {
  CreateWhitelistIpDto,
  WhitelistIpDetailResponse,
  UpdateWhitelistIpDto,
} from "../domain/whitelist.entity";
const BASE_URL = "/whitelist-ip";

export const whitelistIpApi = {
  getWhitelistIps: async (
    params?: WhitelistIpListParams
  ): Promise<WhitelistIpListResponse> => {
    const { data } = await axiosInstance.get(BASE_URL, { params });
    return data;
  },

  createWhitelistIp: async (
    payload: CreateWhitelistIpDto
  ): Promise<WhitelistIpDetailResponse> => {
    const { data } = await axiosInstance.post(BASE_URL, payload);
    return data;
  },

  updateWhitelistIp: async (
    id: string,
    payload: UpdateWhitelistIpDto
  ): Promise<WhitelistIpDetailResponse> => {
    const { data } = await axiosInstance.patch(`${BASE_URL}/${id}`, payload);
    return data;
  },

  deleteWhitelistIp: async (id: string): Promise<WhitelistIpDetailResponse> => {
    const { data } = await axiosInstance.delete(`${BASE_URL}/${id}`);
    return data;
  },
};

import { whitelistIpApi } from "../infrastructure/whitelist.api";
import type {
  CreateWhitelistIpDto,
  WhitelistIpListParams,
  UpdateWhitelistIpDto,
} from "../domain/whitelist.entity";

export async function getWhitelistIps(params?: WhitelistIpListParams) {
  return await whitelistIpApi.getWhitelistIps(params);
}

export async function createWhitelistIp(payload: CreateWhitelistIpDto) {
  return await whitelistIpApi.createWhitelistIp(payload);
}

export async function updateWhitelistIp(
  id: string,
  payload: UpdateWhitelistIpDto
) {
  return await whitelistIpApi.updateWhitelistIp(id, payload);
}

export async function deleteWhitelistIp(id: string) {
  return await whitelistIpApi.deleteWhitelistIp(id);
}

import axios from "axios";
import { HttpError } from "../http/axios.error";
const MAX_RETRIES = 2;
const NON_RETRY_STATUS = [400, 401, 403, 404];

export function shouldRetry(error: unknown, retryCount: number): boolean {
  if (retryCount >= MAX_RETRIES) return false;
  if (error instanceof HttpError) {
    const status = error.status;
    if (status && NON_RETRY_STATUS.includes(status)) {
      return false;
    }
  }
  return true;
}

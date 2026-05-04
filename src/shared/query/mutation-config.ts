import { UseMutationOptions } from "@tanstack/react-query";
import { HttpError } from "../http/axios.error";

export type MutationConfig<
  MutationFn extends (...args: any[]) => Promise<any>
> = UseMutationOptions<
  Awaited<ReturnType<MutationFn>>,
  HttpError,
  Parameters<MutationFn>[0]
>;

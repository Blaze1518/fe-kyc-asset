import type { DefaultOptions } from "@tanstack/react-query";
import { shouldRetry } from "./retry-strategy";

export const QUERY_DEFAULT_OPTIONS: DefaultOptions = {
  queries: {
    staleTime: 1000 * 60,
    gcTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    retry: (failureCount, error) => shouldRetry(error, failureCount),
    throwOnError: false,
  },
};

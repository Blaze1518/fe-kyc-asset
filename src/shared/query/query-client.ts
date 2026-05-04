import { QueryClient } from "@tanstack/react-query";
import { QUERY_DEFAULT_OPTIONS } from "./query.config";
import { QUERY_CACHE } from "./query-cache";
import { MUTATION_CACHE } from "./mutation-cache";

export const queryClient = new QueryClient({
  defaultOptions: QUERY_DEFAULT_OPTIONS,
  queryCache: QUERY_CACHE,
  mutationCache: MUTATION_CACHE,
});

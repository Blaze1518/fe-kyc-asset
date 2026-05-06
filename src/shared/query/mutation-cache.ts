import { MutationCache } from "@tanstack/react-query";
import { toast } from "sonner";
import { getErrorMessage } from "../lib/error-handler";

export const MUTATION_CACHE = new MutationCache({
  onSuccess: (data, _vars, _ctx, mutation) => {
    const meta = mutation.meta;

    if (meta?.successMessage) {
      const message =
        typeof meta.successMessage === "function"
          ? meta.successMessage(data)
          : meta.successMessage;
      toast.success(message);
      return;
    }

    if (data && typeof data === "object") {
      const msg = (data as any).message || (data as any).data?.message;
      if (msg) toast.success(msg);
    }
  },
  onError: (error, _vars, _ctx, mutation) => {
    if (typeof mutation.meta?.errorMessage === "string") {
      toast.error(mutation.meta.errorMessage);
      return;
    }

    const message = getErrorMessage(error);
    toast.error(message);
  },
});

import { QueryCache } from "@tanstack/react-query";
import { toast } from "sonner";
import { getErrorMessage } from "../lib/error-handler";

export const QUERY_CACHE = new QueryCache({
  onError: (error, query) => {
    const meta = query.meta;

    if (meta?.errorMessage === false) {
      return;
    }

    // const isUnauth =
    //   (error instanceof HttpError && error.status === 401) ||
    //   (axios.isAxiosError(error) && error.response?.status === 401);

    // if (isUnauth) return;

    let message = getErrorMessage(error);

    if (typeof meta?.errorMessage === "string") {
      message = meta.errorMessage;
    }

    toast.error(message);
  },
});

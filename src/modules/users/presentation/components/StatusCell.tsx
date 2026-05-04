import { useState, useEffect } from "react";
import { useUpdateUser } from "../hooks/use-users";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { ApiResponse } from "@/shared/http/axios.types";
import { Row } from "@tanstack/react-table";
import { User, UserListParams } from "../../domain/users.entity";
import { Switch } from "@/shared/ui/switch";

export function StatusCell({
  row,
  params,
}: {
  row: Row<User>;
  params?: UserListParams;
}) {
  const statusId = (row.original.status?.id ?? 0) as number | string;
  const isActive = statusId === 1 || statusId === "1";
  const [checked, setChecked] = useState(isActive);

  useEffect(() => {
    setChecked(isActive);
  }, [isActive]);

  const { mutate: updateStatus, isPending } = useUpdateUser(params);

  const handleToggleStatus = (next: boolean) => {
    setChecked(next);
    updateStatus({
      id: row.original.id,
      payload: {
        status: { id: next ? 1 : 2 },
      },
    });
  };

  return (
    <Switch
      checked={checked}
      onCheckedChange={handleToggleStatus}
      aria-label={checked ? "Đang bật" : "Đang tắt"}
      disabled={isPending}
      className="focus-visible:border-destructive focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 h-6 w-10 border-none bg-linear-to-r from-rose-500 to-rose-600 data-[state=checked]:from-emerald-400 data-[state=checked]:to-emerald-600 [&_span]:size-5 [&_span]:translate-x-0.25! data-[state=checked]:[&_span]:translate-x-4.75! data-[state=checked]:[&_span]:rtl:-translate-x-4.75!"
    />
  );
}

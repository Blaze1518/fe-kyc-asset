import { ColumnDef } from "@tanstack/react-table";
import type { Record } from "../../../domain/record.entity";
import { DataTableRowActions } from "./data-table-row-actions";
import { DataTableColumnHeader } from "./data-table-column-header";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Badge } from "@/shared/ui/badge";
import { SuccessBadge } from "@/shared/ui/success-badge";
import { FailBadge } from "@/shared/ui/fail-badge";
import { formatTimestamp } from "@/shared/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shared/ui/tooltip";

export const columns: ColumnDef<Record>[] = [
  {
    accessorKey: "id",
    header: "STT",
    size: 32,
    minSize: 28,
    maxSize: 40,
    cell: ({ row, table }) => {
      const { pageIndex, pageSize } = table.getState().pagination;
      return (
        <Badge className="bg-primary/10 [a&]:hover:bg-primary/5 focus-visible:ring-primary/20 dark:focus-visible:ring-primary/40 text-primary border-none focus-visible:outline-none">
          {pageIndex * pageSize + row.index + 1}
        </Badge>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Tên nhân viên",
    cell: ({ row }) => {
      const name = (row.getValue("name") as string) || "Không tên";
      const initial = name.trim().charAt(0).toUpperCase();
      return (
        <div className="flex items-center gap-3">
          <div className="relative">
            <Avatar className="h-10 w-10 rounded-full border border-border shadow-sm">
              <AvatarImage src="" alt={name} />
              <AvatarFallback className="bg-primary/10 text-primary text-md font-semibold">
                {initial}
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold">{name}</span>
            <span className="text-xs text-green-600 dark:text-green-400">
              Đã điểm danh
            </span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "ips",
    header: "Địa chỉ IP",
    cell: ({ row }) => {
      const ips = row.getValue("ips") as string[];
      const firstTwo = ips?.slice(0, 2) ?? [];
      const remaining = Math.max((ips?.length ?? 0) - 2, 0);
      return (
        <div className="flex flex-wrap gap-2">
          {firstTwo.length ? (
            <>
              {firstTwo.map((ip) => (
                <SuccessBadge key={ip} text={ip} />
              ))}
              {remaining > 0 && <SuccessBadge text={`+${remaining}`} />}
            </>
          ) : (
            <FailBadge text="Không có IP" />
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "client_timestamp",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Thời gian (GMT+7)" />
    ),
    cell: ({ row }) => {
      const client_timestamp = row.getValue("client_timestamp") as string;
      return (
        <span className="font-semibold text-sm">
          {formatTimestamp(client_timestamp)}
        </span>
      );
    },
  },
  {
    id: "actions",
    header: "Thao tác",
    size: 80,
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];

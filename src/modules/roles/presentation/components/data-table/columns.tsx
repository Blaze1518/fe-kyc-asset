import { ColumnDef } from "@tanstack/react-table";
import type { Role } from "../../../domain/role.entity";
import { DataTableRowActions } from "./data-table-row-actions";
import { DataTableColumnHeader } from "./data-table-column-header";
import { formatTimestamp } from "@/shared/lib/utils";
import { Badge } from "@/shared/ui/badge";
import { SuccessBadge } from "@/shared/ui/success-badge";
import { FailBadge } from "@/shared/ui/fail-badge";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/shared/ui/tooltip";
import { Button } from "@/shared/ui/button";
import { ShieldCheckIcon } from "lucide-react";

export const columns: ColumnDef<Role>[] = [
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
    header: "Tên vai trò",
    cell: ({ row }) => {
      const name = row.getValue("name") as string;
      return <span className="text-sm font-medium">{name}</span>;
    },
  },
  {
    accessorKey: "permissions",
    header: "Danh sách các quyền",
    cell: ({ row }) => {
      const permissions = row.getValue("permissions") as string[];
      return (
        <>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button className="relative bg-green-600/10 text-green-600 hover:bg-green-600/20 focus-visible:ring-green-600/20 dark:bg-green-400/10 dark:text-green-400 dark:hover:bg-green-400/20 dark:focus-visible:ring-green-400/40">
                <ShieldCheckIcon className="size-4" />
                <span className="text-xs font-medium uppercase">
                  {row.original.code}
                </span>
                <Badge className="absolute -top-2.5 -right-2.5 h-5 min-w-5 px-1 tabular-nums">
                  {permissions.length}
                </Badge>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              {permissions.length > 0 ? (
                permissions.map((p) => <div key={p}>{p}</div>)
              ) : (
                <div>Không có quyền</div>
              )}
            </TooltipContent>
          </Tooltip>
        </>
      );
    },
  },
  {
    accessorKey: "isSystem",
    header: "Loại vai trò",
    cell: ({ row }) => {
      const isSystem = row.getValue("isSystem") as boolean;
      return (
        <Badge variant={isSystem ? "destructive" : "secondary"}>
          {isSystem ? "Hệ thống" : "Tuỳ chỉnh"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "updatedAt",
    header: "Cập nhật gần nhất",
    cell: ({ row }) => {
      const updatedAt = row.getValue("updatedAt") as string;
      const formatted = formatTimestamp(updatedAt);
      return <span className="text-sm">{formatted}</span>;
    },
  },
  {
    id: "actions",
    header: "Thao tác",
    size: 80,
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];

import { ColumnDef } from "@tanstack/react-table";
import type { WhitelistIp } from "../../../domain/whitelist.entity";
import { DataTableRowActions } from "./data-table-row-actions";
import { DataTableColumnHeader } from "./data-table-column-header";
import { formatTimestamp } from "@/shared/lib/utils";
import { Badge } from "@/shared/ui/badge";
import { StatusCell } from "../StatusCell";
import { PermissionGuard } from "@/components/permissions-guard";
import { PERMISSIONS } from "@/types/auth";

export const columns: ColumnDef<WhitelistIp>[] = [
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
    accessorKey: "description",
    header: "Mô tả",
    cell: ({ row }) => {
      const description = row.getValue("description") as string;
      return <span className="text-sm font-medium">{description}</span>;
    },
  },
  {
    accessorKey: "ip",
    header: "Địa chỉ IP",
    cell: ({ row }) => {
      const ip = row.getValue("ip") as string;
      return (
        <Badge
          variant="outline"
          className="rounded-sm border-green-600 text-green-600 dark:border-green-400 dark:text-green-400 [a&]:hover:bg-green-600/10 [a&]:hover:text-green-600/90 dark:[a&]:hover:bg-green-400/10 dark:[a&]:hover:text-green-400/90"
        >
          {ip}
        </Badge>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Trạng thái",
    cell: ({ row }) => {
      return <StatusCell row={row} />;
    },
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Cập nhật gần nhất" />
    ),
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

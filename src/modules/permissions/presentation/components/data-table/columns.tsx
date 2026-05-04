import { ColumnDef } from "@tanstack/react-table";
import type { Permission } from "../../../domain/permission.entity";
import { DataTableRowActions } from "./data-table-row-actions";
import { DataTableColumnHeader } from "./data-table-column-header";
import { formatTimestamp } from "@/shared/lib/utils";
import { Badge } from "@/shared/ui/badge";
export const columns: ColumnDef<Permission>[] = [
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
    accessorKey: "title",
    header: "Tiêu đề",
    cell: ({ row }) => {
      const title = row.getValue("title") as string;
      return <span className="text-sm font-medium">{title}</span>;
    },
  },
  {
    accessorKey: "name",
    header: "Mã quyền",
    cell: ({ row }) => {
      const name = row.getValue("name") as string;
      return (
        <Badge
          variant="outline"
          className="rounded-sm border-green-600 text-green-600 dark:border-green-400 dark:text-green-400 [a&]:hover:bg-green-600/10 [a&]:hover:text-green-600/90 dark:[a&]:hover:bg-green-400/10 dark:[a&]:hover:text-green-400/90"
        >
          {name}
        </Badge>
      );
    },
  },
  // {
  //   accessorKey: "category",
  //   header: "Nhóm chức năng",
  //   cell: ({ row }) => {
  //     const category = (row.getValue("category") as string) || "—";
  //     return (
  //       <Badge
  //         variant="outline"
  //         className="rounded-sm border-amber-600 text-amber-600 dark:border-amber-400 dark:text-amber-400 [a&]:hover:bg-amber-600/10 [a&]:hover:text-amber-600/90 dark:[a&]:hover:bg-amber-400/10 dark:[a&]:hover:text-amber-400/90"
  //       >
  //         {category}
  //       </Badge>
  //     );
  //   },
  // },
  // {
  //   accessorKey: "parent",
  //   header: "Quyền cha",
  //   cell: ({ row }) => {
  //     const parent = (row.getValue("parent") as string) || "Gốc";
  //     return (
  //       <Badge className="bg-destructive/10 [a&]:hover:bg-destructive/5 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 text-destructive border-none focus-visible:outline-none">
  //         {parent}
  //       </Badge>
  //     );
  //   },
  // },
  {
    accessorKey: "description",
    header: "Mô tả",
    cell: ({ row }) => {
      const description =
        (row.getValue("description") as string) || "Không có mô tả";
      return (
        <span className="text-sm text-muted-foreground line-clamp-2">
          {description}
        </span>
      );
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

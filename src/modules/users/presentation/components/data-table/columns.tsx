import { ColumnDef } from "@tanstack/react-table";
import type { User, UserListParams } from "../../../domain/users.entity";
import { DataTableRowActions } from "./data-table-row-actions";
import { DataTableColumnHeader } from "./data-table-column-header";
import { formatTimestamp } from "@/shared/lib/utils";
import { Badge } from "@/shared/ui/badge";
import { Role } from "@/modules/roles/domain/role.entity";
import { StatusCell } from "../StatusCell";
import SelectMenuSlideIn from "../SelectMenuSlideIn/SelectMenuSlideIn";
import { useUpdateUserRoles } from "../../hooks/use-users";
export const columns = (allRoles: Role[]): ColumnDef<User>[] => [
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
    accessorKey: "username",
    header: "Tên đăng nhập",
    cell: ({ row }) => {
      const username = row.getValue("username") as string;
      return <span className="text-sm font-medium">{username}</span>;
    },
  },
  {
    accessorKey: "name",
    header: "Tên công việc",
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
  {
    accessorKey: "roles",
    header: "Vai trò",
    cell: ({ row }) => {
      const user = row.original;
      const currentRole = user.roles?.[0];

      const { mutate: updateRoles, isPending } = useUpdateUserRoles();

      const handleRoleChange = (newRoleId: string) => {
        if (newRoleId === currentRole?.id) return;

        updateRoles({
          id: user.id,
          payload: {
            roleIds: [newRoleId],
          },
        });
      };

      return (
        <SelectMenuSlideIn
          currentRoleId={currentRole?.id || ""}
          allRoles={allRoles}
          onValueChange={handleRoleChange}
          disabled={isPending}
        />
      );
    },
  },
  {
    accessorKey: "description",
    header: "Trạng thái",
    cell: ({ row, table }) => {
      return (
        <StatusCell
          row={row}
          params={(table.options.meta as any)?.params as UserListParams}
        />
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
    cell: ({ row, table }) => (
      <DataTableRowActions
        row={row}
        params={(table.options.meta as any)?.params as UserListParams}
      />
    ),
  },
];

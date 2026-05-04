import { PaginationState } from "@tanstack/react-table";
import type { Permission } from "../../../domain/permission.entity";

export type PermissionRecord = Permission;

export interface DataTableProps {
  data: PermissionRecord[];
  isLoading: boolean;
  pageCount: number;
  pagination: PaginationState;
  onPaginationChange: (pagination: PaginationState) => void;
  onViewRecord: (record: PermissionRecord) => void;
}

export interface ColumnsProps<TData> {
  onView?: (record: TData) => void;
  onEdit?: (record: TData) => void;
  onDelete?: (record: TData) => void;
}

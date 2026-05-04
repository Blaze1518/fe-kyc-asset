"use client";

import { useState } from "react";
import {
  type SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type PaginationState,
  type OnChangeFn,
  type ColumnDef,
} from "@tanstack/react-table";
// import { ChevronDown, Download, Search } from "lucide-react";

import { Button } from "@/shared/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { Label } from "@/shared/ui/label";
import { Skeleton } from "@/shared/ui/skeleton";
// import { DatePicker } from "./HelperComponents/Calendar";
import { DataTableToolbar } from "./data-table-toolbar";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  TabsContents,
} from "@/shared/ui/motion-tabs";
import { UserListParams } from "../../../domain/users.entity";

export interface UsersTableState {
  pageIndex: number;
  pageSize: number;
  status?: "active" | "inactive";
  search?: string;
}

export interface DataTableProps<TData> {
  data: TData[];
  columns: ColumnDef<TData, any>[];
  pageCount: number;
  state: UsersTableState;
  onStateChange: (state: UsersTableState) => void;
  onViewRecord?: (record: TData) => void;
  isLoading?: boolean;
  params?: UserListParams;
}

const DataTable = <TData,>({
  data,
  columns,
  pageCount,
  state,
  onStateChange,
  onViewRecord,
  isLoading,
  params,
}: DataTableProps<TData>) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const activeTab: "all" | "active" | "inactive" =
    state.status === "active"
      ? "active"
      : state.status === "inactive"
      ? "inactive"
      : "all";

  const pagination: PaginationState = {
    pageIndex: state.pageIndex,
    pageSize: state.pageSize,
  };

  const handlePaginationChange: OnChangeFn<PaginationState> = (updater) => {
    const next = typeof updater === "function" ? updater(pagination) : updater;

    onStateChange({
      ...state,
      pageIndex: next.pageIndex,
      pageSize: next.pageSize,
    });
  };

  const table = useReactTable({
    data,
    columns,
    pageCount,
    state: {
      sorting,
      pagination,
    },
    manualPagination: true,
    onSortingChange: setSorting,
    onPaginationChange: handlePaginationChange,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    meta: {
      onViewRecord,
      params,
    },
  });

  const renderTableSection = () => (
    <>
      <div className="rounded-md border relative">
        <Table className="table-auto w-full">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className={
                      header.id === "id" ? "px-1 py-1 text-center" : undefined
                    }
                    style={{
                      width: header.getSize()
                        ? `${header.getSize()}px`
                        : undefined,
                    }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 10 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell
                    colSpan={columns.length}
                    className="h-9 text-center"
                  >
                    <Skeleton className="h-9 w-full" />
                  </TableCell>
                </TableRow>
              ))
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={
                        cell.column.id === "id"
                          ? "px-1 py-1 text-center"
                          : undefined
                      }
                      style={{
                        width: cell.column.getSize()
                          ? `${cell.column.getSize()}px`
                          : undefined,
                      }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-9 text-center">
                  Không có dữ liệu.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between space-x-2 py-4">
        <div className="flex items-center space-x-2">
          <Label className="text-sm font-medium">Số hàng</Label>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-[70px] cursor-pointer">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center space-x-2">
          <div className="flex w-[100px] items-center justify-center text-sm font-medium">
            Trang {table.getState().pagination.pageIndex + 1} trên{" "}
            {table.getPageCount()}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="cursor-pointer"
          >
            Trước
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="cursor-pointer"
          >
            Tiếp
          </Button>
        </div>
      </div>
    </>
  );

  return (
    <div className="w-full space-y-4">
      <>
        <Tabs
          value={activeTab}
          onValueChange={(value) =>
            onStateChange({
              ...state,
              pageIndex: 0,
              status:
                value === "all" ? undefined : (value as "active" | "inactive"),
            })
          }
          className="w-full flex-col justify-start gap-6"
        >
          <Label htmlFor="view-selector" className="sr-only">
            Chọn một loại
          </Label>
          <Select
            value={activeTab}
            onValueChange={(value) =>
              onStateChange({
                ...state,
                pageIndex: 0,
                status:
                  value === "all"
                    ? undefined
                    : (value as "active" | "inactive"),
              })
            }
          >
            <SelectTrigger
              className="flex w-fit sm:hidden cursor-pointer"
              size="sm"
              id="view-selector"
            >
              <SelectValue placeholder="Chọn một loại" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả</SelectItem>
              <SelectItem value="active">Hoạt động</SelectItem>
              <SelectItem value="inactive">Chưa kích hoạt</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex items-center space-x-2 justify-between">
            <TabsList className="**:data-[slot=badge]:bg-muted-foreground/30 hidden **:data-[slot=badge]:size-5 **:data-[slot=badge]:rounded-full **:data-[slot=badge]:px-1 sm:flex cursor-pointer">
              <TabsTrigger value="all" className="cursor-pointer">
                Tất cả
                {/* <Badge variant="secondary" data-slot="badge">
                {summaryCounts.total ?? "–"}
              </Badge> */}
              </TabsTrigger>
              <TabsTrigger value="active" className="cursor-pointer">
                Hoạt động{" "}
                {/* <Badge variant="secondary" data-slot="badge">
                {summaryCounts.totalOnline ?? "–"}
              </Badge> */}
              </TabsTrigger>
              <TabsTrigger value="inactive" className="cursor-pointer">
                Chưa kích hoạt{" "}
                {/* <Badge variant="secondary" data-slot="badge">
                {summaryCounts.totalInactive ?? "–"}
              </Badge> */}
              </TabsTrigger>
            </TabsList>
            <div>
              <DataTableToolbar
                table={table}
                initialSearch={state.search ?? ""}
                onSubmitFilters={({ search }) =>
                  onStateChange({
                    ...state,
                    pageIndex: 0,
                    search,
                  })
                }
              />
            </div>
          </div>

          <TabsContents>
            <TabsContent value="all">{renderTableSection()}</TabsContent>
            <TabsContent value="active">{renderTableSection()}</TabsContent>
            <TabsContent value="inactive">{renderTableSection()}</TabsContent>
          </TabsContents>
        </Tabs>
      </>
    </div>
  );
};

DataTable.displayName = "DataTable";
export { DataTable };

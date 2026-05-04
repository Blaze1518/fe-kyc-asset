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
import { Badge } from "@/shared/ui/badge";
export interface RecordsTableState {
  pageIndex: number;
  pageSize: number;
  search?: string;
}

export interface DataTableProps<TData> {
  data: TData[];
  columns: ColumnDef<TData, any>[];
  pageCount: number;
  state: RecordsTableState;
  onStateChange: (state: RecordsTableState) => void;
  onViewRecord?: (record: TData) => void;
  isLoading?: boolean;
}

const DataTable = <TData,>({
  data,
  columns,
  pageCount,
  state,
  onStateChange,
  onViewRecord,
  isLoading,
}: DataTableProps<TData>) => {
  const [sorting, setSorting] = useState<SortingState>([]);

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
    meta: { onViewRecord },
  });

  return (
    <div className="w-full space-y-4">
      <>
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
                  <TableCell
                    colSpan={columns.length}
                    className="h-9 text-center"
                  >
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
                <SelectValue
                  placeholder={table.getState().pagination.pageSize}
                />
              </SelectTrigger>
              <SelectContent side="top">
                {[10, 30, 50, 100, 500].map((pageSize) => (
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
    </div>
  );
};

DataTable.displayName = "DataTable";
export { DataTable };

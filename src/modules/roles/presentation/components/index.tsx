"use client";

import { useState } from "react";
import { DataTable, type RecordsTableState } from "./data-table/data-table";
import { columns } from "./data-table/columns";
import { useRoles } from "../hooks/use-roles";

export default function RolesPageComponent() {
  const [tableState, setTableState] = useState<RecordsTableState>({
    pageIndex: 0,
    pageSize: 10,
    search: undefined,
  });

  const { data: response, isLoading } = useRoles({
    page: tableState.pageIndex + 1,
    limit: tableState.pageSize,
    search: tableState.search || undefined,
  });

  const data = response?.data ?? [];
  const pageCount = response?.meta?.pages ?? 0;

  return (
    <>
      <DataTable
        data={data}
        columns={columns}
        isLoading={isLoading}
        pageCount={pageCount}
        state={tableState}
        onStateChange={setTableState}
      />
    </>
  );
}

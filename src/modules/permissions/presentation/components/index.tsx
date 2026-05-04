"use client";

import { useState } from "react";
import { DataTable, type RecordsTableState } from "./data-table/data-table";
import { columns } from "./data-table/columns";
import { usePermissions } from "../hooks/use-permissions";

export default function PermissionsPageComponent() {
  const [tableState, setTableState] = useState<RecordsTableState>({
    pageIndex: 0,
    pageSize: 10,
    search: undefined,
  });

  const { data: response, isLoading } = usePermissions({
    page: tableState.pageIndex + 1,
    limit: tableState.pageSize,
    search: tableState.search || undefined,
  });

  const records = response?.data ?? [];
  const pageCount = response?.meta?.pages ?? 0;

  return (
    <>
      <DataTable
        data={records}
        columns={columns}
        isLoading={isLoading}
        pageCount={pageCount}
        state={tableState}
        onStateChange={setTableState}
      />
    </>
  );
}

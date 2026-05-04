"use client";

import { useState } from "react";
import { DataTable, type RecordsTableState } from "./data-table/data-table";
import { columns } from "./data-table/columns";
import { useDevices } from "../hooks/use-devices";

export default function DevicesPageComponent() {
  const [tableState, setTableState] = useState<RecordsTableState>({
    pageIndex: 0,
    pageSize: 10,
    hostName: "",
    machineId: "",
    status: undefined,
    sort: {
      field: "last_heartbeat",
      direction: "desc",
    },
  });

  const { data: response, isLoading } = useDevices({
    page: tableState.pageIndex + 1,
    limit: tableState.pageSize,
    host_name: tableState.hostName,
    machine_id: tableState.machineId,
    status: tableState.status,
    includeSummary: true,
  });

  const records = response?.data ?? [];
  const pageCount = response?.meta?.pages ?? 0;
  const summary = response?.meta?.summary;
  return (
    <>
      <DataTable
        data={records}
        columns={columns}
        isLoading={isLoading}
        pageCount={pageCount}
        state={tableState}
        onStateChange={setTableState}
        summary={summary}
      />
    </>
  );
}

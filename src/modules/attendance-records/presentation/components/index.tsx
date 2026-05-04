"use client";

import { useState } from "react";
import { DataTable } from "./data-table/data-table";
import { columns } from "./data-table/columns";
import { useRecords } from "../hooks/use-records";
import { RecordListParams } from "../../domain/record.entity";

export default function RecordsPageComponent() {
  const [tableState, setTableState] = useState<RecordListParams>({
    page: 0,
    limit: 10,
    search: {
      name: "",
      clientTimestampFrom: "",
      clientTimestampTo: "",
    },
    sort: {
      field: "client_timestamp",
      direction: "desc",
    },
  });

  const { data: response, isLoading } = useRecords({
    page: tableState.page + 1,
    limit: tableState.limit,
    search: tableState.search ?? undefined,
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

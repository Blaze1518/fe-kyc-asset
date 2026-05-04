"use client";

import { useState } from "react";
import { DataTable } from "./data-table/data-table";
import { columns } from "./data-table/columns";
import { useUsers } from "../hooks/use-users";
import { useRoles } from "@/modules/roles/presentation/hooks/use-roles";
import { UsersTableState } from "./data-table/data-table";

export default function UsersPageComponent() {
  const [tableState, setTableState] = useState<UsersTableState>({
    pageIndex: 0,
    pageSize: 10,
    status: undefined,
  });

  const getStatusFilter = (status?: "active" | "inactive") => {
    if (status === "active") return 1;
    if (status === "inactive") return 2;
    return undefined;
  };

  const apiParams = {
    page: tableState.pageIndex + 1,
    limit: tableState.pageSize,
    search: tableState.search || undefined,
    status: getStatusFilter(tableState.status),
  };

  const { data: rolesResponse } = useRoles({ limit: 1000 });
  const allRoles = rolesResponse?.data ?? [];

  const { data: response, isLoading } = useUsers(apiParams);

  const records = response?.data ?? [];
  const pageCount = response?.meta?.pages ?? 0;

  return (
    <>
      <DataTable
        data={records}
        columns={columns(allRoles)}
        isLoading={isLoading}
        pageCount={pageCount}
        state={tableState}
        onStateChange={setTableState}
        params={apiParams}
      />
    </>
  );
}

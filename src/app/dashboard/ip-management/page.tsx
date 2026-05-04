// "use client";

// import { useState } from "react";
// import { DataTable, type TableState } from "./components/data-table/data-table";
// import { useGetWhitelistIps } from "./api/whitelist-ip";
// import { columns } from "./components/data-table/columns";
import WhitelistIpsPageComponent from "@/modules/ip-management/presentation/components";

export default function WhitelistIpsPage() {
  // const [tableState, setTableState] = useState<TableState>({
  //   pageIndex: 0,
  //   pageSize: 10,
  // });

  // const {
  //   data: response,
  //   isLoading,
  //   pageCount,
  // } = useGetWhitelistIps({
  //   page: tableState.pageIndex + 1,
  //   limit: tableState.pageSize,
  // });

  // const records = response?.data ?? [];

  return (
    <div className="flex flex-col gap-4">
      <div className="@container/main px-4 lg:px-6 ">
        <WhitelistIpsPageComponent />
      </div>
    </div>
  );
}

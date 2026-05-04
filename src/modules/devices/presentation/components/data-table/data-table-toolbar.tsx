"use client";

import { useState } from "react";
import type { Table } from "@tanstack/react-table";
import { Search } from "lucide-react";
import { Input } from "@/shared/ui/input";
import { ShimmerButton } from "@/shared/ui/shimmer-button";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  initialHostName?: string;
  initialMachineId?: string;
  onSubmitFilters?: (value: { hostName?: string; machineId?: string }) => void;
}

export function DataTableToolbar<TData>({
  table: _table,
  initialHostName = "",
  initialMachineId = "",
  onSubmitFilters,
}: DataTableToolbarProps<TData>) {
  const [hostName, setHostName] = useState(initialHostName);
  const [machineId, setMachineId] = useState(initialMachineId);

  const handleSubmit = () => {
    onSubmitFilters?.({
      hostName: hostName.trim() || undefined,
      machineId: machineId.trim() || undefined,
    });
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (
    event
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Nhập tên máy tính"
          value={hostName}
          onChange={(event) => setHostName(event.target.value)}
          onKeyDown={handleKeyDown}
          className="h-8 w-[150px] lg:w-[250px] cursor-text"
        />
        <Input
          placeholder="Nhập machine ID"
          value={machineId}
          onChange={(event) => setMachineId(event.target.value)}
          onKeyDown={handleKeyDown}
          className="h-8 w-[150px] lg:w-[250px] cursor-text"
        />
        <ShimmerButton className="group h-8" onClick={handleSubmit}>
          <Search className="size-4" />
        </ShimmerButton>
      </div>
      <div className="flex items-center space-x-2"></div>
    </div>
  );
}

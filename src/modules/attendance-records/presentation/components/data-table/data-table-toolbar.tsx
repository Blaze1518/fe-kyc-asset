"use client";

import { useState } from "react";
import type { Table } from "@tanstack/react-table";
import { Search } from "lucide-react";
import { Input } from "@/shared/ui/input";
import { ShimmerButton } from "@/shared/ui/shimmer-button";
import { DataTableCalendarFilter } from "./data-table-calendar-filter";
import { RecordListSearch } from "../../../domain/record.entity";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  state: RecordListSearch;
  onSubmitFilters?: (value: RecordListSearch) => void;
}

export function DataTableToolbar<TData>({
  table: _table,
  state,
  onSubmitFilters,
}: DataTableToolbarProps<TData>) {
  const [searchValue, setSearchValue] = useState(state.name ?? "");
  const [fromValue, setFromValue] = useState(state.clientTimestampFrom ?? "");
  const [toValue, setToValue] = useState(state.clientTimestampTo ?? "");

  const handleFromChange = (value?: string) => {
    if (!value) {
      setFromValue("");
      return;
    }
    const date = new Date(value);
    date.setHours(0, 0, 0, 0);
    setFromValue(date.toISOString());
  };

  const handleToChange = (value?: string) => {
    if (!value) {
      setToValue("");
      return;
    }
    const date = new Date(value);
    date.setHours(23, 59, 59, 999);
    setToValue(date.toISOString());
  };

  const handleSubmit = () => {
    onSubmitFilters?.({
      name: searchValue.trim() || undefined,
      clientTimestampFrom: fromValue || undefined,
      clientTimestampTo: toValue || undefined,
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
          placeholder="Nhâp tên nhân viên"
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
          onKeyDown={handleKeyDown}
          className="h-8 w-[150px] lg:w-[250px] cursor-text"
        />
        <DataTableCalendarFilter
          value={fromValue || undefined}
          onChange={handleFromChange}
          title="Ngày bắt đầu"
          maxDate={new Date()}
        />
        <DataTableCalendarFilter
          value={toValue || undefined}
          onChange={handleToChange}
          title="Ngày kết thúc"
          minDate={fromValue || undefined}
          maxDate={new Date()}
        />
        <ShimmerButton className="group h-8" onClick={handleSubmit}>
          <Search className="size-4" />
        </ShimmerButton>
      </div>
      <div className="flex items-center space-x-2"></div>
    </div>
  );
}

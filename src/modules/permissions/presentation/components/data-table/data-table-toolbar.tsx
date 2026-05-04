"use client";

import { useState } from "react";
import type { Table } from "@tanstack/react-table";
import { Plus, Search } from "lucide-react";
import { Input } from "@/shared/ui/input";
import { ShimmerButton } from "@/shared/ui/shimmer-button";
import {
  CraftButton,
  CraftButtonLabel,
  CraftButtonIcon,
} from "@/shared/ui/craft-button";
import { PermissionDialog } from "../dialog/dialog-permission";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  initialSearch?: string;
  onSubmitFilters?: (value: { search?: string }) => void;
}

export function DataTableToolbar<TData>({
  table: _table,
  initialSearch = "",
  onSubmitFilters,
}: DataTableToolbarProps<TData>) {
  const [search, setSearch] = useState(initialSearch);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSubmitFilter = () => {
    onSubmitFilters?.({
      search: search.trim() || undefined,
    });
  };

  const handleFilterKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (
    event
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSubmitFilter();
    }
  };

  return (
    <div className="flex items-center justify-end gap-2">
      {/* <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Tìm theo tên quyền hoặc mã quyền"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          onKeyDown={handleFilterKeyDown}
          className="h-8 w-[150px] lg:w-[250px] cursor-text"
        />
        <ShimmerButton className="group h-8" onClick={handleSubmitFilter}>
          <Search className="size-4" />
        </ShimmerButton>
      </div> */}
      <div className="flex items-center space-x-2">
        <CraftButton onClick={() => setIsDialogOpen(true)}>
          <CraftButtonLabel>Thêm quyền</CraftButtonLabel>
          <CraftButtonIcon>
            <Plus className="size-4" />
          </CraftButtonIcon>
        </CraftButton>
        <PermissionDialog
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          mode="create"
        />
      </div>
    </div>
  );
}

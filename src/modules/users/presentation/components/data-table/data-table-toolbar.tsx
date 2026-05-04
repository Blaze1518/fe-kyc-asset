"use client";

import { useState } from "react";
import type { Table } from "@tanstack/react-table";
import { Plus } from "lucide-react";
import {
  CraftButton,
  CraftButtonLabel,
  CraftButtonIcon,
} from "@/shared/ui/craft-button";
import { UserDialog } from "../dialog/dialog-user";
import { UserListParams } from "../../../domain/users.entity";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  initialSearch?: string;
  onSubmitFilters?: (value: { search?: string }) => void;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const params = (table.options.meta as any)?.params as UserListParams;

  return (
    <div className="flex items-center justify-end gap-2">
      <div className="flex items-center space-x-2">
        <CraftButton onClick={() => setIsDialogOpen(true)}>
          <CraftButtonLabel>Thêm người dùng</CraftButtonLabel>
          <CraftButtonIcon>
            <Plus className="size-4" />
          </CraftButtonIcon>
        </CraftButton>
        <UserDialog
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          mode="create"
          params={params}
        />
      </div>
    </div>
  );
}

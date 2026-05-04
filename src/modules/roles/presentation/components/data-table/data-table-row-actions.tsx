"use client";

import { useState } from "react";
import type { Row } from "@tanstack/react-table";
import { Pencil, Trash2 } from "lucide-react";

import { Button } from "@/shared/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shared/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog";
import type { Role } from "../../../domain/role.entity";
import { RoleDialog } from "../dialog/dialog-role";
import { useDeleteRole } from "../../hooks/use-roles";

interface DataTableRowActionsProps {
  row: Row<Role>;
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const role = row.original;
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const { mutate: deleteRole, isPending } = useDeleteRole();

  const handleConfirmDelete = () => {
    deleteRole(role.id);
    setIsDeleteOpen(false);
  };

  return (
    <div className="flex items-center gap-1">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="cursor-pointer text-blue-500 hover:text-blue-600"
            onClick={() => setIsEditOpen(true)}
          >
            <Pencil className="size-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="left">
          <p>Chỉnh sửa vai trò</p>
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="cursor-pointer text-red-500 hover:text-red-600"
            onClick={() => setIsDeleteOpen(true)}
            disabled={isPending}
          >
            <Trash2 className="size-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="left">
          <p>Xoá vai trò</p>
        </TooltipContent>
      </Tooltip>

      <RoleDialog
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        mode="edit"
        initialValue={role}
      />

      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Xoá vai trò</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Bạn có chắc chắn muốn xoá quyền{" "}
            <span className="font-semibold">{role.code}</span>? Thao tác này
            không thể hoàn tác.
          </p>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsDeleteOpen(false)}
              className="cursor-pointer"
            >
              Huỷ
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={handleConfirmDelete}
              disabled={isPending}
              className="cursor-pointer"
            >
              {isPending ? "Đang xoá..." : "Xoá quyền"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

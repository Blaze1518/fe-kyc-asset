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
import type { Permission } from "../../../domain/permission.entity";
import { PermissionDialog } from "../dialog/dialog-permission";
import { useDeletePermission } from "../../hooks/use-permissions";

interface DataTableRowActionsProps {
  row: Row<Permission>;
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const permission = row.original;
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const { mutate: deletePermission, isPending } = useDeletePermission();

  const handleConfirmDelete = () => {
    deletePermission(permission.id);
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
          <p>Chỉnh sửa quyền</p>
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
          <p>Xoá quyền</p>
        </TooltipContent>
      </Tooltip>

      <PermissionDialog
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        mode="edit"
        initialValue={permission}
      />

      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Xoá quyền</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Bạn có chắc chắn muốn xoá quyền{" "}
            <span className="font-semibold">{permission.name}</span>? Thao tác
            này không thể hoàn tác.
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

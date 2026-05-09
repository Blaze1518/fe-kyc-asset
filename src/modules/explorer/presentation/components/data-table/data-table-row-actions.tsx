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
import type { User, UserListParams } from "../../../domain/users.entity";
import { UserDialog } from "../dialog/dialog-user";
import { useDeleteUser } from "../../hooks/use-users";

interface DataTableRowActionsProps {
  row: Row<User>;
  params?: UserListParams;
}

export function DataTableRowActions({ row, params }: DataTableRowActionsProps) {
  const user = row.original;
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const { mutate: deleteUser, isPending } = useDeleteUser(params);

  const handleConfirmDelete = () => {
    deleteUser(user.id);
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
          <p>Chỉnh sửa người dùng</p>
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
          <p>Xoá người dùng</p>
        </TooltipContent>
      </Tooltip>

      <UserDialog
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        mode="edit"
        initialValue={user}
        params={params}
      />

      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Xoá người dùng</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Bạn có chắc chắn muốn xoá người dùng{" "}
            <span className="font-semibold">{user.name}</span>? Thao tác này
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
              {isPending ? "Đang xoá..." : "Xoá người dùng"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

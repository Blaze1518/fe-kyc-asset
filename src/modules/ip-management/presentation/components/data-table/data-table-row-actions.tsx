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
import type { WhitelistIp } from "../../../domain/whitelist.entity";
import { WhitelistDialog } from "../dialog/dialog-whitelist";
import { useDeleteWhitelistIp } from "../../hooks/use-whitelists";

interface DataTableRowActionsProps {
  row: Row<WhitelistIp>;
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const whitelistIp = row.original;
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const { mutate: deleteWhitelistIp, isPending } = useDeleteWhitelistIp();

  const handleConfirmDelete = () => {
    deleteWhitelistIp(whitelistIp.id);
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
          <p>Chỉnh sửa địa chỉ IP</p>
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
          <p>Xoá địa chỉ IP</p>
        </TooltipContent>
      </Tooltip>

      <WhitelistDialog
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        mode="edit"
        initialValue={whitelistIp}
      />

      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Xoá địa chỉ IP</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Bạn có chắc chắn muốn xoá địa chỉ IP{" "}
            <span className="font-semibold">{whitelistIp.ip}</span>? Thao tác
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
              {isPending ? "Đang xoá..." : "Xoá địa chỉ IP"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

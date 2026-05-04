import { ColumnDef } from "@tanstack/react-table";
import type { Device } from "../../../domain/device.entity";
import { DataTableRowActions } from "./data-table-row-actions";
import { DataTableColumnHeader } from "./data-table-column-header";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Check, Info, X } from "lucide-react";
import { SuccessBadge } from "@/shared/ui/success-badge";
import { FailBadge } from "@/shared/ui/fail-badge";
import {
  formatTimestamp,
  getHeartbeatStatus,
  getQueueStatus,
} from "@/shared/lib/utils";
import { Badge } from "@/shared/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shared/ui/tooltip";

export const columns: ColumnDef<Device>[] = [
  {
    accessorKey: "id",
    header: "STT",
    size: 32,
    minSize: 28,
    maxSize: 40,
    cell: ({ row }) => (
      <span className="block text-center font-semibold">{row.index + 1}</span>
    ),
  },
  {
    accessorKey: "host_name",
    header: "Máy (Trạng thái)",
    cell: ({ row }) => {
      const host = (row.getValue("host_name") as string) || "Không tên";
      const initial = host.trim().charAt(0).toUpperCase();
      const heartbeat = row.original.last_heartbeat;
      const heartbeatStatus = getHeartbeatStatus(heartbeat);
      return (
        <div className="flex items-center gap-3">
          <div className="relative">
            <Avatar className="h-10 w-10 rounded-full border border-border shadow-sm">
              <AvatarImage src="" alt={host} />
              <AvatarFallback className="bg-primary/10 text-primary text-md font-semibold">
                {initial}
              </AvatarFallback>
            </Avatar>
            <span
              className={`absolute -right-0.5 -bottom-0.5 inline-flex size-3 items-center justify-center rounded-full ring-2 ring-background ${
                heartbeatStatus.variant === "success"
                  ? "bg-green-500 dark:bg-green-400"
                  : "bg-red-500 dark:bg-red-400"
              }`}
            >
              {heartbeatStatus.variant === "success" ? (
                <Check className="size-3 text-white" />
              ) : (
                <X className="size-3 text-white" />
              )}
            </span>
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold">{host}</span>
            <span className="text-xs text-muted-foreground">
              {heartbeatStatus.label} ·{" "}
              {Number.isFinite(heartbeatStatus.minutesAgo)
                ? `${heartbeatStatus.minutesAgo} phút trước`
                : "Không rõ"}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "ip_addresses",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Địa chỉ IP" />
    ),
    cell: ({ row }) => {
      const ips = row.getValue("ip_addresses") as string[];
      const firstTwo = ips?.slice(0, 2) ?? [];
      const remaining = Math.max((ips?.length ?? 0) - 2, 0);
      return (
        <div className="flex flex-wrap gap-2">
          {firstTwo.length ? (
            <>
              {firstTwo.map((ip) => (
                <SuccessBadge key={ip} text={ip} />
              ))}
              {remaining > 0 && <SuccessBadge text={`+${remaining}`} />}
            </>
          ) : (
            <FailBadge text="Không có IP" />
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "app_version",
    header: "Phiên bản",
    cell: ({ row }) => {
      const version = row.getValue("app_version") as string;
      return <Badge variant="secondary">v{version}</Badge>;
    },
  },
  {
    accessorKey: "queue_size",
    header: "Bản ghi thiếu",
    cell: ({ row }) => {
      const queue = row.getValue("queue_size") as number;
      const status = getQueueStatus(queue);
      return (
        <Badge
          variant={
            status.variant as
              | "default"
              | "secondary"
              | "destructive"
              | "outline"
          }
        >
          {status.label}
        </Badge>
      );
    },
  },
  {
    accessorKey: "last_heartbeat",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Lần cập nhật gần nhất" />
    ),
    cell: ({ row }) => {
      const lastHeartbeat = row.getValue("last_heartbeat") as string;
      const formatted = formatTimestamp(lastHeartbeat);
      const heartbeatStatus = getHeartbeatStatus(lastHeartbeat);
      return (
        <div className="flex items-center gap-2">
          <span className="font-semibold text-sm">{formatted}</span>
          <Tooltip>
            <TooltipTrigger asChild>
              <Info className="size-4 text-muted-foreground cursor-help" />
            </TooltipTrigger>
            <TooltipContent side="top">
              <p>
                {heartbeatStatus.label} ·{" "}
                {Number.isFinite(heartbeatStatus.minutesAgo)
                  ? `${heartbeatStatus.minutesAgo} phút trước`
                  : "Không rõ"}
              </p>
            </TooltipContent>
          </Tooltip>
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Thao tác",
    size: 80,
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];

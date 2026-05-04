"use client";

import { Loader2, CheckCircle2, XCircle, Clock, Terminal } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";

import { ScrollArea } from "@/shared/ui/scroll-area";
import { Badge } from "@/shared/ui/badge";

import {
  DeviceCommandType,
  ForceUpdatePayload,
  UpdateWallpaperPayload,
} from "../../../domain/device.entity";

import { useCommandHistory } from "../../hooks/use-devices";

const StatusBadge = ({ status }: { status: string }) => {
  switch (status) {
    case "PENDING":
      return (
        <Badge
          variant="outline"
          className="text-yellow-600 border-yellow-500 bg-yellow-50/50"
        >
          <Loader2 className="w-3 h-3 mr-1 animate-spin" /> Đang chờ
        </Badge>
      );
    case "SENT":
      return (
        <Badge
          variant="outline"
          className="text-blue-600 border-blue-500 bg-blue-50/50"
        >
          <Loader2 className="w-3 h-3 mr-1 animate-spin" /> Đang chạy
        </Badge>
      );
    case "COMPLETED":
      return (
        <Badge
          variant="outline"
          className="text-green-600 border-green-500 bg-green-50/50"
        >
          <CheckCircle2 className="w-3 h-3 mr-1" /> Thành công
        </Badge>
      );
    case "FAILED":
      return (
        <Badge
          variant="destructive"
          className="bg-red-100 text-red-700 hover:bg-red-200 border-red-200"
        >
          <XCircle className="w-3 h-3 mr-1" /> Thất bại
        </Badge>
      );
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

export function CommandHistoryList({ machineId }: { machineId: string }) {
  const {
    data: historyList,
    isLoading,
    isError,
  } = useCommandHistory(machineId);

  if (isLoading)
    return (
      <div className="flex flex-col items-center justify-center py-8 text-muted-foreground gap-2">
        <Loader2 className="h-6 w-6 animate-spin" />
        <span className="text-xs">Đang tải lịch sử lệnh...</span>
      </div>
    );

  if (isError)
    return (
      <div className="text-center py-6 text-sm text-red-500 bg-red-50 rounded-md">
        Không thể tải lịch sử lệnh.
      </div>
    );

  if (!historyList || historyList.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-muted-foreground gap-2 border border-dashed rounded-md bg-muted/20">
        <Terminal className="h-8 w-8 opacity-20" />
        <span className="text-sm">Chưa có lệnh nào được gửi.</span>
      </div>
    );
  }

  return (
    <ScrollArea className="h-[250px] w-full max-w-[286px] pr-4">
      <div className="space-y-3">
        {historyList.map((item) => {
          const isUpdate = item.type === DeviceCommandType.FORCE_UPDATE;

          return (
            <div
              key={item.id}
              className="flex flex-col gap-2 p-3 rounded-lg border bg-card text-card-foreground shadow-sm hover:bg-accent/5 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-sm flex items-center gap-2">
                  {isUpdate ? "Cập nhật Firmware" : "Thay đổi hình nền"}
                </span>
                <StatusBadge status={item.status} />
              </div>

              <div className="text-xs text-muted-foreground bg-muted/50 p-2 rounded-md font-mono">
                {item.type === DeviceCommandType.FORCE_UPDATE ? (
                  <div className="flex gap-4">
                    <span>
                      Ver:{" "}
                      <strong className="text-foreground">
                        {item.payload.version}
                      </strong>
                    </span>
                    {item.payload.description && (
                      <span className="truncate max-w-[150px] opacity-70">
                        - {item.payload.description}
                      </span>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col gap-1">
                    <span
                      className="truncate max-w-[200px] opacity-70"
                      title={item.payload.url}
                    >
                      URL: {item.payload.url}
                    </span>
                    <span className="truncate max-w-[200px] opacity-70">
                      Description: {item.payload.description}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-end text-[10px] text-muted-foreground">
                <Clock className="w-3 h-3 mr-1" />
                {formatDistanceToNow(new Date(item.createdAt), {
                  addSuffix: true,
                  locale: vi,
                })}
              </div>
            </div>
          );
        })}
      </div>
    </ScrollArea>
  );
}

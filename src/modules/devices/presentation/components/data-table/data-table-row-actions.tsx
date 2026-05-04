"use client";

import type { Row } from "@tanstack/react-table";
import {
  EllipsisVertical,
  Monitor,
  Fingerprint,
  Cpu,
  Calendar,
  Power,
  RefreshCw,
  RotateCcw,
  Wrench,
  Send,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/shared/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/shared/ui/drawer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";

import { Device } from "../../../domain/device.entity";
import { useIsMobile } from "@/hooks/use-mobile";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shared/ui/tooltip";
import { formatTimestamp } from "@/shared/lib/utils";
import { useState } from "react";
import { Badge } from "@/shared/ui/badge";
import { Check, Copy, Loader2, Code2, ImageIcon, History } from "lucide-react";
import { Separator } from "@/shared/ui/separator";
import { useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/shared/ui/tabs";
import { Label } from "@/shared/ui/label";
import { Input } from "@/shared/ui/input";
import { Textarea } from "@/shared/ui/textarea";
import { useSendCommand } from "../../hooks/use-devices";
import { DeviceCommandType } from "../../../domain/device.entity";
import { CommandHistoryList } from "../commandhistorylist/CommandHistoryList";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const record = row.original as Device;
  const isMobile = useIsMobile();
  const ips = record.ip_addresses ?? [];
  const checkInTime = formatTimestamp(record.last_heartbeat);

  const { mutate: sendCommand, isPending } = useSendCommand();

  const [swVersion, setSwVersion] = useState("");
  const [swDesc, setSwDesc] = useState("");

  const [imgUrl, setImgUrl] = useState("");
  const [imgDesc, setImgDesc] = useState("");

  const handleSoftwareUpdate = () => {
    if (!swVersion.trim()) {
      toast.error("Vui lòng nhập phiên bản mục tiêu");
      return;
    }

    sendCommand({
      deviceId: record.machine_id,
      command: {
        type: DeviceCommandType.FORCE_UPDATE,
        payload: {
          version: swVersion,
          description: swDesc,
        },
      },
    });
  };

  const handleWallpaperUpdate = () => {
    if (!imgUrl.trim()) {
      toast.error("Vui lòng nhập đường dẫn hình ảnh");
      return;
    }

    sendCommand({
      deviceId: record.machine_id,
      command: {
        type: DeviceCommandType.UPDATE_WALLPAPER,
        payload: {
          url: imgUrl,
          description: imgDesc,
        },
      },
    });
  };

  return (
    <Drawer direction={isMobile ? "bottom" : "right"}>
      <Tooltip>
        <TooltipTrigger asChild>
          <DrawerTrigger asChild>
            <Button variant="ghost" size="icon" className="cursor-pointer">
              <EllipsisVertical className="size-6" />
            </Button>
          </DrawerTrigger>
        </TooltipTrigger>
        <TooltipContent side="right">
          <p>Thao tác</p>
        </TooltipContent>
      </Tooltip>
      <DrawerContent className={isMobile ? "h-[90vh]" : "max-w-2xl"}>
        <DrawerHeader>
          <DrawerTitle className="flex items-center gap-2">
            <Monitor className="w-5 h-5" />
            Thông tin chi tiết
          </DrawerTitle>
          <DrawerDescription>
            Xem thông tin chi tiết của thiết bị
          </DrawerDescription>
        </DrawerHeader>

        <div className="flex flex-col gap-4 overflow-y-auto px-4 pb-4">
          <Card className="border-orange-200 bg-orange-50/50 dark:bg-orange-950/10 dark:border-orange-900 shadow-none">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2 text-orange-700 dark:text-orange-500 font-semibold">
                <RefreshCw className="w-5 h-5" />
                Trung tâm cập nhật
              </CardTitle>
              <CardDescription>
                Cấu hình phiên bản phần mềm hoặc thay đổi tài nguyên hình ảnh.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <Tabs defaultValue="software" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6 bg-orange-100/50 dark:bg-orange-900/20 p-1">
                  <TabsTrigger
                    value="software"
                    className="flex gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-orange-900"
                  >
                    <Code2 className="w-4 h-4" /> Phần mềm
                  </TabsTrigger>
                  <TabsTrigger
                    value="image"
                    className="flex gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-orange-900"
                  >
                    <ImageIcon className="w-4 h-4" /> Hình ảnh
                  </TabsTrigger>
                </TabsList>

                {/* --- Tab Content: Software --- */}
                <TabsContent
                  value="software"
                  className="space-y-4 animate-in fade-in-50 duration-300"
                >
                  <div className="space-y-2">
                    <Label htmlFor="version" className="text-sm font-medium">
                      Phiên bản mục tiêu <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="version"
                      placeholder="Ví dụ: v2.1.0"
                      value={swVersion}
                      onChange={(e) => setSwVersion(e.target.value)}
                      disabled={isPending}
                      className="border-orange-200 focus-visible:ring-orange-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sw-desc" className="text-sm font-medium">
                      Chi tiết bản cập nhật
                    </Label>
                    <Textarea
                      id="sw-desc"
                      placeholder="Nhập các thay đổi quan trọng..."
                      value={swDesc}
                      onChange={(e) => setSwDesc(e.target.value)}
                      disabled={isPending}
                      className="min-h-[100px] border-orange-200 focus-visible:ring-orange-500"
                    />
                  </div>
                  <Button
                    onClick={handleSoftwareUpdate}
                    disabled={isPending}
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white transition-all shadow-md"
                  >
                    {isPending ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <Send className="w-4 h-4 mr-2" />
                    )}
                    {isPending ? "Đang xử lý..." : "Xác nhận cập nhật hệ thống"}
                  </Button>
                </TabsContent>

                {/* --- Tab Content: Image --- */}
                <TabsContent
                  value="image"
                  className="space-y-4 animate-in fade-in-50 duration-300"
                >
                  <div className="space-y-2">
                    <Label htmlFor="url" className="text-sm font-medium">
                      Đường dẫn hình ảnh (URL){" "}
                      <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="url"
                      type="url"
                      placeholder="https://cdn.example.com/banner.png"
                      value={imgUrl}
                      onChange={(e) => setImgUrl(e.target.value)}
                      disabled={isPending}
                      className="border-orange-200 focus-visible:ring-orange-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="img-desc" className="text-sm font-medium">
                      Mô tả hiển thị
                    </Label>
                    <Textarea
                      id="img-desc"
                      placeholder="Ảnh này sẽ hiển thị ở màn hình chờ..."
                      value={imgDesc}
                      onChange={(e) => setImgDesc(e.target.value)}
                      disabled={isPending}
                      className="min-h-[100px] border-orange-200 focus-visible:ring-orange-500"
                    />
                  </div>
                  <Button
                    onClick={handleWallpaperUpdate}
                    disabled={isPending}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-all shadow-md"
                  >
                    {isPending ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <Send className="w-4 h-4 mr-2" />
                    )}
                    {isPending ? "Đang xử lý..." : "Cập nhật hình ảnh"}
                  </Button>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Separator />

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <History className="w-4 h-4" />
                Lịch sử lệnh
              </CardTitle>
              <CardDescription>
                Theo dõi trạng thái xử lý các lệnh gần đây.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CommandHistoryList machineId={record.machine_id} />
            </CardContent>
          </Card>

          <Separator />

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Cpu className="w-4 h-4" />
                Thông tin máy tính
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <CopyableField label="Tên máy tính" value={record.host_name} />
              <CopyableField
                label="Mã định danh duy nhất của máy tính"
                value={record.machine_id}
                className="max-w-full break-all"
              />
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">
                  Địa chỉ IP
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {ips.map((ip: string, index: number) => (
                    <CopyableField
                      key={index}
                      label=""
                      value={ip}
                      variant="outline"
                      className="shrink-0"
                    />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Separator />

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Thời gian đồng bộ
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <CopyableField
                  label="Thời gian đồng bộ gần nhất"
                  value={checkInTime}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export function CopyableField({
  label,
  value,
  className = "",
  variant = "secondary",
}: {
  label: string;
  value: string;
  className?: string;
  variant?: "secondary" | "outline";
}) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch (err) {}
  };

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  if (!label) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <Badge variant={variant} className="font-mono text-xs">
          {value}
        </Badge>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => copyToClipboard(value)}
          className="h-6 w-6 p-0 shrink-0 hover:bg-muted"
          title="Copy to clipboard"
        >
          {copied ? (
            <Check className="h-3 w-3 text-green-600" />
          ) : (
            <Copy className="h-3 w-3" />
          )}
        </Button>
      </div>
    );
  }

  return (
    <div className={`space-y-1 ${className}`}>
      <p className="text-sm font-medium text-muted-foreground">{label}</p>
      <div className="flex items-center gap-2">
        <Badge variant={variant} className="font-mono text-xs flex-1 min-w-0">
          <span className="truncate">{value}</span>
        </Badge>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => copyToClipboard(value)}
          className="h-6 w-6 p-0 shrink-0 hover:bg-muted"
          title="Copy to clipboard"
        >
          {copied ? (
            <Check className="h-3 w-3 text-green-600" />
          ) : (
            <Copy className="h-3 w-3" />
          )}
        </Button>
      </div>
    </div>
  );
}

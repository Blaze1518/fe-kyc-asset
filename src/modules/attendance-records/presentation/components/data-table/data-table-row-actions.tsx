"use client";

import type { Row } from "@tanstack/react-table";
import { ScanSearch, Monitor, Fingerprint, Cpu, Calendar } from "lucide-react";

import { Button } from "@/shared/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/shared/ui/drawer";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";

import { Record } from "../../../domain/record.entity";
import { useIsMobile } from "@/hooks/use-mobile";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shared/ui/tooltip";
import { formatTimestamp } from "@/shared/lib/utils";
import { useState } from "react";
import { Badge } from "@/shared/ui/badge";
import { Check, Copy } from "lucide-react";
import { Separator } from "@/shared/ui/separator";
import { useEffect } from "react";
interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const record = row.original as Record;
  const isMobile = useIsMobile();
  const ips = record.ips ?? [];
  const checkInTime = formatTimestamp(record.client_timestamp);
  const createdTime = formatTimestamp(record.createdAt);
  const updatedTime = formatTimestamp(record.updatedAt);

  return (
    <Drawer direction={isMobile ? "bottom" : "right"}>
      <Tooltip>
        <TooltipTrigger asChild>
          <DrawerTrigger asChild>
            <Button variant="outline" size="icon" className="cursor-pointer">
              <ScanSearch className="size-6" />
            </Button>
          </DrawerTrigger>
        </TooltipTrigger>
        <TooltipContent side="right">
          <p>Xem thông tin chi tiết</p>
        </TooltipContent>
      </Tooltip>
      <DrawerContent className={isMobile ? "h-[90vh]" : "max-w-2xl"}>
        <DrawerHeader>
          <DrawerTitle className="flex items-center gap-2">
            <Monitor className="w-5 h-5" />
            Thông tin chi tiết
          </DrawerTitle>
          <DrawerDescription>
            Xem thông tin chi tiết của bản ghi điểm danh
          </DrawerDescription>
        </DrawerHeader>

        <div className="flex flex-col gap-4 overflow-y-auto px-4 pb-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Fingerprint className="w-4 h-4" />
                Thông tin điểm danh
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <CopyableField label="Tên nhân viên" value={record.name} />
              <CopyableField label="Thời gian điểm danh" value={checkInTime} />
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
                  label="Thời gian điểm danh trên thiết bị"
                  value={checkInTime}
                />
                <CopyableField
                  label="Thời gian tạo bản ghi trên server"
                  value={createdTime}
                />
                <CopyableField
                  label="Thời gian cập nhật bản ghi trên server"
                  value={updatedTime}
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

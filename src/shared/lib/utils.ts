import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTimestamp(
  timestamp: string,
  timeZone: string = "Asia/Ho_Chi_Minh"
) {
  if (!timestamp) return "";

  const date = new Date(timestamp);
  if (Number.isNaN(date.getTime())) return timestamp;

  return date.toLocaleString("vi-VN", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

export type HeartbeatStatus = {
  label: "Đã đồng bộ" | "Mất kết nối";
  minutesAgo: number;
  variant: "success" | "destructive";
};

export function getHeartbeatStatus(
  lastHeartbeat: string,
  now: Date = new Date(),
  onlineThresholdMin = 5
): HeartbeatStatus {
  if (!lastHeartbeat) {
    return {
      label: "Mất kết nối",
      minutesAgo: Infinity,
      variant: "destructive",
    };
  }

  const last = new Date(lastHeartbeat);
  const minutesAgo = Number.isNaN(last.getTime())
    ? Infinity
    : Math.floor((now.getTime() - last.getTime()) / 60000);

  if (minutesAgo <= onlineThresholdMin) {
    return { label: "Đã đồng bộ", minutesAgo, variant: "success" };
  }

  return { label: "Mất kết nối", minutesAgo, variant: "destructive" };
}

export type QueueStatus = {
  label: string;
  variant: "success" | "warning" | "destructive";
};

export function getQueueStatus(
  queueSize: number | undefined,
  warnThreshold = 1,
  dangerThreshold = 100
): QueueStatus {
  const size = queueSize ?? 0;
  if (size <= 0) return { label: "0", variant: "success" };
  if (size < dangerThreshold && size >= warnThreshold) {
    return { label: `${size}`, variant: "warning" };
  }
  return { label: `${size}`, variant: "destructive" };
}

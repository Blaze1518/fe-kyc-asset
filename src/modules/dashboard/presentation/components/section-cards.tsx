"use client";

import * as React from "react";
import { PlugZap, Power, PowerOff } from "lucide-react";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/shared/ui/card";
import { Skeleton } from "@/shared/ui/skeleton";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/shared/ui/chart";
import { Pie, PieChart, Cell } from "recharts";
import { useDeviceStatusSummary } from "../hooks/use-permissions";
import { Badge } from "@/shared/ui/badge";
export function SectionCards() {
  const { data, isLoading, isError } = useDeviceStatusSummary();

  const summary = data?.data;
  const totalOnline = summary?.totalOnline ?? 0;
  const totalOffline = summary?.totalOffline ?? 0;
  const totalDevices = totalOnline + totalOffline;

  const chartConfig = React.useMemo(
    () => ({
      online: { label: "Online", color: "#22c55e" }, // green
      offline: { label: "Offline", color: "#ef4444" }, // red
    }),
    []
  );

  const chartData = React.useMemo(
    () => [
      {
        key: "online",
        name: "Online",
        value: totalOnline,
        fill: "var(--color-online)",
      },
      {
        key: "offline",
        name: "Offline",
        value: totalOffline,
        fill: "var(--color-offline)",
      },
    ],
    [totalOnline, totalOffline]
  );

  return (
    <div className="flex flex-col gap-4 lg:gap-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <Card className="border-border/70 bg-card">
          <CardHeader>
            <CardDescription>Thiết bị Online</CardDescription>
            <CardTitle className="text-3xl font-semibold tabular-nums">
              {isLoading ? <Skeleton className="h-9 w-24" /> : totalOnline}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            {isError ? (
              <div className="text-destructive text-sm">
                Không tải được dữ liệu
              </div>
            ) : (
              <div className="text-muted-foreground flex items-center gap-2 text-sm">
                <Power className="h-4 w-4 text-green-500" />
                Đang hoạt động
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-border/70 bg-card">
          <CardHeader>
            <CardDescription>Thiết bị Offline</CardDescription>
            <CardTitle className="text-3xl font-semibold tabular-nums">
              {isLoading ? <Skeleton className="h-9 w-24" /> : totalOffline}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            {isError ? (
              <div className="text-destructive text-sm">
                Không tải được dữ liệu
              </div>
            ) : (
              <div className="text-muted-foreground flex items-center gap-2 text-sm">
                <PowerOff className="h-4 w-4 text-red-500" />
                Không hoạt động
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-border/70 bg-card">
          <CardHeader>
            <CardDescription>Tổng thiết bị</CardDescription>
            <CardTitle className="text-3xl font-semibold tabular-nums">
              {isLoading ? <Skeleton className="h-9 w-24" /> : totalDevices}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            {isError ? (
              <div className="text-destructive text-sm">
                Không tải được dữ liệu
              </div>
            ) : (
              <div className="text-muted-foreground flex items-center gap-2 text-sm">
                <PlugZap className="h-4 w-4 text-amber-500" />
                Online + Offline
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="border-border/70 bg-card">
        <CardHeader>
          <CardDescription>Biểu đồ Online/Offline</CardDescription>
          <CardTitle className="text-base font-semibold tabular-nums">
            {isLoading ? (
              <Skeleton className="h-5 w-40" />
            ) : (
              "Trạng thái thiết bị"
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          {isError ? (
            <div className="text-destructive text-sm">
              Không tải được dữ liệu
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4 lg:flex-row lg:gap-8">
              <div className="w-full max-w-[280px]">
                <ChartContainer
                  className="mx-auto aspect-square max-h-[240px]"
                  config={chartConfig}
                >
                  <PieChart>
                    <ChartTooltip
                      cursor={false}
                      content={<ChartTooltipContent nameKey="name" />}
                    />
                    <Pie
                      data={chartData}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={70}
                      outerRadius={100}
                      strokeWidth={3}
                    >
                      {chartData.map((item) => (
                        <Cell
                          key={item.key}
                          fill={`var(--color-${item.key})`}
                          stroke="hsl(var(--background))"
                          strokeWidth={3}
                        />
                      ))}
                    </Pie>
                    <ChartLegend content={<ChartLegendContent />} />
                  </PieChart>
                </ChartContainer>
              </div>

              <div className="flex-1 w-full grid gap-3 rounded-lg border border-dashed border-border/70 p-4 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Online</span>
                  <span className="font-semibold tabular-nums">
                    <Badge
                      variant="outline"
                      className="text-muted-foreground text-xs"
                    >
                      <Power className="h-4 w-4 text-green-500" />
                      {totalOnline} Máy tính
                    </Badge>
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Offline</span>
                  <span className="font-semibold tabular-nums">
                    <Badge
                      variant="outline"
                      className="text-muted-foreground text-xs"
                    >
                      <PowerOff className="h-4 w-4 text-red-500" />
                      {totalOffline} Máy tính
                    </Badge>
                  </span>
                </div>
                <div className="flex items-center justify-between border-t border-border/60 pt-3">
                  <span className="text-muted-foreground">Tổng</span>
                  <span className="font-semibold tabular-nums">
                    <Badge
                      variant="outline"
                      className="text-muted-foreground text-xs"
                    >
                      <PlugZap className="h-4 w-4 text-amber-500" />
                      {totalDevices} Máy tính
                    </Badge>
                  </span>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

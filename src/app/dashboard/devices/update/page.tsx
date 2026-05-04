"use client";

import { Hammer } from "lucide-react";
import { Card, CardContent } from "@/shared/ui/card";

const UpdateDevicePage = () => {
  return (
    <div className="flex min-h-[80vh] items-center justify-center p-4">
      <Card className="max-w-md border-none bg-transparent shadow-none text-center">
        <CardContent className="space-y-6">
          <div className="relative flex justify-center">
            <div className="relative rounded-full bg-primary/10 p-6">
              <Hammer className="h-12 w-12 text-primary animate-bounce" />
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              Tính năng đang phát triển
            </h1>
            <p className="text-muted-foreground text-lg">
              Trang <strong>Cập nhật thiết bị</strong> hiện đang được nâng cấp.
            </p>
          </div>

          <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
            <div
              className="bg-primary h-full transition-all duration-1000 ease-out"
              style={{ width: "65%" }}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UpdateDevicePage;

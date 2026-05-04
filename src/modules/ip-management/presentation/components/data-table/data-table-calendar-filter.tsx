"use client";

import * as React from "react";
import { vi } from "date-fns/locale";

import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { Separator } from "@/shared/ui/separator";
import { Calendar } from "@/shared/ui/calendar";

interface DataTableCalendarFilterProps {
  title?: string;
  value?: string;
  onChange?: (value?: string) => void;
}

export function DataTableCalendarFilter({
  title,
  value,
  onChange,
}: DataTableCalendarFilterProps) {
  const rawValue = value as string | Date | undefined;

  const selectedDate =
    rawValue instanceof Date
      ? rawValue
      : rawValue
      ? new Date(rawValue)
      : undefined;

  const formattedLabel = React.useMemo(() => {
    if (!selectedDate) return null;
    try {
      const day = selectedDate.getDate().toString().padStart(2, "0");
      const month = (selectedDate.getMonth() + 1).toString().padStart(2, "0");
      const year = selectedDate.getFullYear();
      return `${day}/${month}/${year}`;
    } catch {
      return selectedDate.toLocaleDateString();
    }
  }, [selectedDate]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-8 border-dashed cursor-pointer"
        >
          {title}
          {formattedLabel && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <div className="space-x-1 lg:flex">
                <Badge
                  variant="secondary"
                  className="rounded-sm px-1 cursor-pointer font-bold"
                >
                  {formattedLabel}
                </Badge>
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          locale={vi}
          mode="single"
          selected={selectedDate}
          onSelect={(date) => onChange?.(date ? date.toISOString() : undefined)}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}

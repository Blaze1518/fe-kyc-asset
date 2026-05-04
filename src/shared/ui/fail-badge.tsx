import { BanIcon } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { Badge } from "@/shared/ui/badge";

interface FailBadgeProps {
  text: string;
  className?: string;
}
export function FailBadge({ text, className }: FailBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "text-destructive [a&]:hover:bg-destructive/10 [a&]:hover:text-destructive/90 border-destructive rounded-sm",
        className
      )}
    >
      <BanIcon className="size-3" />
      {text}
    </Badge>
  );
}

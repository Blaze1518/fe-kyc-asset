import { CheckCircle } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { Badge } from "@/shared/ui/badge";

interface SuccessBadgeProps {
  text: string;
  className?: string;
}

export function SuccessBadge({ text, className }: SuccessBadgeProps) {
  return (
    <Badge
      variant="secondary"
      className={cn(
        "flex items-center gap-1 rounded-sm border-green-600 text-green-600 dark:border-green-400 dark:text-green-400 [a&]:hover:bg-green-600/10 [a&]:hover:text-green-600/90 dark:[a&]:hover:bg-green-400/10 dark:[a&]:hover:text-green-400/90",
        className
      )}
    >
      <CheckCircle className="size-3" />
      {text}
    </Badge>
  );
}

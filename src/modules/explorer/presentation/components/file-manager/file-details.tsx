import { MoreHorizontal, Download, Pencil, Trash2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Button } from "@/shared/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import type { FileData } from "./types";

interface FileDetailsProps {
  data: FileData;
}

export function FileDetails({ data }: FileDetailsProps) {
  const { date, size, authorName, authorImage } = data;
  const displaySize = size ?? "—";
  const fallback = authorName.slice(0, 1).toUpperCase();
  return (
    <div className="text-muted-foreground flex items-center space-x-4 text-sm">
      <span className="hidden w-20 text-right tabular-nums lg:inline">
        {date}
      </span>
      <span className="hidden w-16 text-right tabular-nums lg:inline">
        {displaySize}
      </span>
      <Avatar className="size-6 border shadow-sm">
        <AvatarImage src={authorImage} alt={authorName} />
        <AvatarFallback className="bg-muted text-[10px]">
          {fallback}
        </AvatarFallback>
      </Avatar>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="size-8">
            <MoreHorizontal className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40">
          <DropdownMenuItem className="gap-2">
            <Download className="size-4" /> Download
          </DropdownMenuItem>
          <DropdownMenuItem className="gap-2">
            <Pencil className="size-4" /> Rename
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="gap-2 text-destructive">
            <Trash2 className="size-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

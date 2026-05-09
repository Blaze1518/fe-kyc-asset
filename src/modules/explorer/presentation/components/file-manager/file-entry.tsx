import { useId } from "react";
import { FileText } from "lucide-react";
import { Checkbox } from "@/shared/ui/checkbox";

interface FileEntryProps {
  title: string;
  icon?: React.ReactNode;
  iconBgColor?: string;
}

export function FileEntry({
  title,
  icon,
  iconBgColor = "bg-red-600",
}: FileEntryProps) {
  const id = useId();
  return (
    <div className="flex min-w-0 flex-1 items-center space-x-4">
      <Checkbox id={id} className="peer size-4 shrink-0" />
      <div className="shrink-0">
        <div
          className={`flex h-6 w-6 items-center justify-center rounded-sm ${iconBgColor} text-white shadow-sm`}
        >
          {icon || <FileText className="size-3.5" />}
        </div>
      </div>
      <label
        htmlFor={id}
        className="min-w-0 truncate text-sm font-medium cursor-pointer peer-disabled:opacity-70"
      >
        {title}
      </label>
    </div>
  );
}

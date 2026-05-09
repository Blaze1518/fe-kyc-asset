// file-manager/index.tsx
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FolderIcon, FileIcon } from "lucide-react";
import { FileData } from "./types";
import { FileEntry } from "./file-entry";
import { FileDetails } from "./file-details";

export const FileRow = ({ data }: { data: FileData }) => {
  const pathname = usePathname();

  const folderPath = `${pathname}/${data.id}`;

  const RowContent = (
    <div className="group hover:bg-muted/50 flex cursor-pointer items-center justify-between border-b p-2 transition-colors lg:p-4">
      <FileEntry
        title={data.title}
        icon={
          data.type === "folder" ? (
            <FolderIcon className="text-yellow-500" />
          ) : (
            <FileIcon />
          )
        }
        iconBgColor={
          data.type === "folder" ? "bg-transparent" : data.iconBgColor
        }
      />
      <FileDetails data={data} />
    </div>
  );

  // Nếu là folder thì cho phép bấm vào để chuyển hướng
  if (data.type === "folder") {
    return <Link href={folderPath}>{RowContent}</Link>;
  }

  return RowContent;
};

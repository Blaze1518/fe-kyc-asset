import type { FileData } from "../components/file-manager/types";

const MOCK_FILES_BY_PATH: Record<string, FileData[]> = {
  "": [
    {
      id: "file-1",
      title: "Arion – Admin Dashboard & UI Kit",
      type: "file",
      date: "12.09.20",
      size: "1.2 MB",
      authorName: "U",
      iconBgColor: "bg-yellow-500",
    },
    {
      id: "file-2",
      title: "Brand Styles Guide",
      type: "file",
      date: "12.09.20",
      size: "4.5 MB",
      authorName: "U",
      iconBgColor: "bg-red-600",
    },
    {
      id: "design-assets",
      title: "Design Assets",
      type: "folder",
      date: "12.09.20",
      authorName: "John",
      iconBgColor: "bg-blue-500",
    },
  ],
  "design-assets": [
    {
      id: "file-ui-kit",
      title: "UI Kit.sketch",
      type: "file",
      date: "15.10.20",
      size: "12.4 MB",
      authorName: "John",
      iconBgColor: "bg-violet-500",
    },
    {
      id: "file-readme",
      title: "README.md",
      type: "file",
      date: "16.10.20",
      size: "4 KB",
      authorName: "Jane",
      iconBgColor: "bg-slate-500",
    },
  ],
};

export function getFilesForSlug(slug: string[]): FileData[] {
  const key = slug.join("/");
  return MOCK_FILES_BY_PATH[key] ?? [];
}

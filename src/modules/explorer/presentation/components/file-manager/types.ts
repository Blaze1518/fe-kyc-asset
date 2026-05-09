export interface FileData {
  id: string;
  title: string;
  type: "file" | "folder";
  date: string;
  size?: string;
  authorName: string;
  authorImage?: string;
  iconBgColor?: string;
}

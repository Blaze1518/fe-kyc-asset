import * as z from "zod";

export const formSchema = z.object({
  title: z.string().min(1, "Tiêu đề là bắt buộc"),
  name: z.string().min(1, "Mã quyền là bắt buộc"),
  category: z.string().min(1, "Nhóm chức năng là bắt buộc"),
  description: z.string().optional(),
  parent: z.string().optional(),
});

export type FormValues = z.infer<typeof formSchema>;

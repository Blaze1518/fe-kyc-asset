import * as z from "zod";

export const formSchema = z.object({
  name: z.string().min(1, "Tên vai trò là bắt buộc"),
  code: z.string().min(1, "Mã vai trò là bắt buộc"),
  permissions: z.array(z.string()).optional(),
  isSystem: z.boolean().optional(),
});

export type FormValues = z.infer<typeof formSchema>;

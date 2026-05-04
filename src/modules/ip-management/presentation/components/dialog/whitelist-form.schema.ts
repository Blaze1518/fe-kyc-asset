import * as z from "zod";

export const formSchema = z.object({
  description: z.string().min(1, "Mô tả là bắt buộc"),
  ip: z.string().min(1, "Địa chỉ IP là bắt buộc"),
  status: z.number().min(1, "Trạng thái là bắt buộc"),
});

export type FormValues = z.infer<typeof formSchema>;

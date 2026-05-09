import * as z from "zod";

export const formSchema = z.object({
  username: z.string().min(1, "Tên đăng nhập là bắt buộc"),
  name: z.string().min(1, "Họ và tên là bắt buộc"),
  password: z
    .string()
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
    .optional()
    .or(z.literal("")),
  roles: z.array(z.string()).min(1, "Vui lòng chọn ít nhất một vai trò"),
  status: z.object({
    id: z.union([z.string(), z.number()]),
  }),
});

export type FormValues = z.infer<typeof formSchema>;

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { Input } from "@/shared/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { Checkbox } from "@/shared/ui/checkbox";
import { SignUpPayload } from "../../domain/sign-up.entity";
import { useSignUp } from "../hooks/use-sign-up";

const signupFormSchema = z
  .object({
    name: z.string().min(1, "Tên công việc là bắt buộc"),
    username: z.string().min(1, "Tên đăng nhập là bắt buộc"),
    password: z.string().min(1, "Mật khẩu là bắt buộc"),
    confirmPassword: z.string().min(1, "Xác nhận mật khẩu là bắt buộc"),
    terms: z.boolean().refine((val) => val === true, {
      message: "Bạn phải đồng ý với điều khoản dịch vụ và chính sách bảo mật",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Mật khẩu xác nhận không khớp",
  });

type SignupFormValues = z.infer<typeof signupFormSchema>;
export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { mutate: signUp, isPending } = useSignUp();
  function onSubmit(data: SignupFormValues) {
    const payload: SignUpPayload = {
      username: data.username,
      name: data.name,
      password: data.password,
    };

    signUp(payload);
  }

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      name: "",
      username: "",
      password: "",
      confirmPassword: "",
      terms: true,
    },
  });

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Tạo tài khoản</CardTitle>
          <CardDescription>
            Nhập thông tin của bạn để tạo tài khoản mới
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid gap-6">
                <div className="grid gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tên công việc</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tên đăng nhập</FormLabel>
                        <FormControl>
                          <Input type="text" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mật khẩu</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Xác nhận mật khẩu</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="terms"
                    render={({ field }) => (
                      <FormItem className="flex items-start space-x-2">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="mt-0.5"
                          />
                        </FormControl>
                        <FormLabel className="text-sm">
                          Tôi đồng ý với điều khoản dịch vụ và chính sách bảo
                          mật
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    className="w-full cursor-pointer"
                    disabled={isPending}
                  >
                    {isPending ? "Đang tạo tài khoản..." : "Tạo tài khoản"}
                  </Button>
                </div>
                <div className="text-center text-sm">
                  Đã có tài khoản?{" "}
                  <a href="/sign-in" className="underline underline-offset-4">
                    Đăng nhập
                  </a>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

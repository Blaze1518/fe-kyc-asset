"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/shared/ui/button";
import { Field, FieldError, FieldLabel } from "@/shared/ui/field";
import { Input } from "@/shared/ui/input";
import { Separator } from "@/shared/ui/separator";
import { useSignIn } from "@/modules/sign-in/presentation/hooks/use-sign-in";
import { SignInPayload } from "@/modules/sign-in/domain/sign-in.entity";

const formSchema = z.object({
  username: z.string().min(1, "Tên đăng nhập là bắt buộc"),
  password: z.string().min(1, "Mật khẩu là bắt buộc"),
});

const Login = () => {
  const { mutate: signIn, isPending } = useSignIn();

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    const payload: SignInPayload = {
      username: data.username,
      password: data.password,
    };
    signIn(payload);
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex h-full w-full p-4">
        <div className="m-auto flex w-full max-w-xs flex-col items-center">
          <p className="mt-4 font-sacramento text-3xl">KYC Assets for Attpay</p>
          <div className="my-4 flex w-full items-center justify-center overflow-hidden">
            <Separator />
            <Separator />
          </div>
          <form
            className="w-full space-y-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <Controller
              control={form.control}
              name="username"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Tên tài khoản</FieldLabel>
                  <Input
                    aria-invalid={fieldState.invalid}
                    className="w-full"
                    placeholder="Tên tài khoản"
                    type="username"
                    {...field}
                  />
                  <FieldError errors={[fieldState.error]} />
                </Field>
              )}
            />
            <Controller
              control={form.control}
              name="password"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Mật khẩu</FieldLabel>
                  <Input
                    aria-invalid={fieldState.invalid}
                    className="w-full"
                    placeholder="Mật khẩu"
                    type="password"
                    {...field}
                  />
                  <FieldError errors={[fieldState.error]} />
                </Field>
              )}
            />
            <Button className="mt-4 w-full" type="submit" disabled={isPending}>
              {isPending ? "Đang đăng nhập..." : "Đăng nhập"}
            </Button>
          </form>
        </div>
        <div className="relative hidden max-w-xl grow lg:block">
          <img
            alt="Login"
            className="absolute inset-0 size-full rounded-xl object-cover"
            src="/images/ascii-art.png"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;

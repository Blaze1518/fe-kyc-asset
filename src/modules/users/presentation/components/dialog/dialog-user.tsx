import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/shared/ui/dialog";
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { User, UserListParams } from "../../../domain/users.entity";
import { useCreateUser, useUpdateUser } from "../../hooks/use-users";
import { formSchema, FormValues } from "./user.schema";
import { MultiSelect } from "@/shared/ui/multi-select";
import { useRoles } from "@/modules/roles/presentation/hooks/use-roles";

interface UserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "create" | "edit";
  initialValue?: User;
  params?: UserListParams;
}

export function UserDialog({
  open,
  onOpenChange,
  mode,
  initialValue,
  params,
}: UserDialogProps) {
  const isEdit = mode === "edit";

  const { data: rolesResponse } = useRoles({
    limit: 1000,
  });

  const roleOptions = useMemo(() => {
    return (
      rolesResponse?.data?.map((role) => ({
        label: role.name,
        value: role.id,
      })) || []
    );
  }, [rolesResponse]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      name: "",
      password: "",
      roles: [],
      status: { id: 1 },
    },
  });

  useEffect(() => {
    if (open) {
      form.reset(
        isEdit && initialValue
          ? {
              username: initialValue.username,
              name: initialValue.name,
              roles: initialValue.roles.map((r) => r.id),
              status: initialValue.status,
              password: "",
            }
          : {
              username: "",
              name: "",
              password: "",
              roles: [],
              status: { id: 1 },
            }
      );
    }
  }, [open, initialValue, isEdit, form]);

  const handleClose = () => {
    onOpenChange(false);
    form.reset();
  };

  const { mutate: create, isPending: isCreating } = useCreateUser(params, {
    mutationConfig: {
      onSuccess: handleClose,
    },
  });

  const { mutate: update, isPending: isUpdating } = useUpdateUser(params, {
    mutationConfig: {
      onSuccess: handleClose,
    },
  });

  const isPending = isCreating || isUpdating;

  const onSubmit = (values: FormValues) => {
    const payload = {
      username: values.username,
      name: values.name,
      roles: values.roles,
      status: values.status,
      // Chỉ gửi password nếu có nhập
      ...(values.password ? { password: values.password } : {}),
    };

    if (isEdit && initialValue?.id) {
      update(
        {
          id: initialValue.id,
          payload,
        },
        {
          onSuccess: handleClose,
        }
      );
    } else {
      create(payload);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Chỉnh sửa người dùng" : "Thêm người dùng"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên đăng nhập</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Nhập tên đăng nhập"
                      disabled={isEdit}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Họ và tên</FormLabel>
                  <FormControl>
                    <Input placeholder="Nhập họ và tên" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {!isEdit && (
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mật khẩu</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Nhập mật khẩu"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="roles"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vai trò</FormLabel>
                  <FormControl>
                    <MultiSelect
                      options={roleOptions}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      placeholder="Chọn vai trò..."
                      variant="default"
                      animation={0}
                      maxCount={3}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="mt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Huỷ
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? "Đang xử lý..." : "Lưu"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

import { useEffect, useMemo, useState } from "react";
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
import { Role } from "../../../domain/role.entity";
import { useCreateRole, useUpdateRole } from "../../hooks/use-roles";
import { formSchema, FormValues } from "./role.schema";
import { Switch } from "@/shared/ui/switch";
import { usePermissions } from "@/modules/permissions/presentation/hooks/use-permissions";
import { MultiSelect } from "@/shared/ui/multi-select";

interface RoleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "create" | "edit";
  initialValue?: Role;
}

export function RoleDialog({
  open,
  onOpenChange,
  mode,
  initialValue,
}: RoleDialogProps) {
  const isEdit = mode === "edit";

  const { data: permissionsResponse } = usePermissions({
    limit: 1000,
  });

  const permissionOptions = useMemo(() => {
    return (
      permissionsResponse?.data?.map((p) => ({
        label: `${p.title} (${p.name})`,
        value: p.id,
      })) || []
    );
  }, [permissionsResponse]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      code: "",
      permissions: [],
      isSystem: false,
    },
  });

  useEffect(() => {
    if (open) {
      form.reset(
        isEdit && initialValue
          ? {
              name: initialValue.name,
              code: initialValue.code,
              permissions: Array.isArray(initialValue.permissions)
                ? initialValue.permissions.map((p: any) =>
                    typeof p === "string" ? p : p.id
                  )
                : [],
              isSystem: !!initialValue.isSystem,
            }
          : { name: "", code: "", permissions: [], isSystem: false }
      );
    }
  }, [open, initialValue, isEdit, form]);

  const { mutate: create, isPending: isCreating } = useCreateRole();
  const { mutate: update, isPending: isUpdating } = useUpdateRole();

  const isPending = isCreating || isUpdating;

  const onSubmit = (values: FormValues) => {
    const handleSuccess = () => {
      onOpenChange(false);
      form.reset();
    };

    if (isEdit && initialValue?.id) {
      update(
        {
          id: initialValue.id,
          payload: {
            name: values.name,
            code: values.code,
            permissions: values.permissions || [],
            isSystem: values.isSystem,
          },
        },
        {
          onSuccess: handleSuccess,
        }
      );
    } else {
      create(
        {
          name: values.name,
          code: values.code,
          permissions: values.permissions || [],
          isSystem: values.isSystem,
        },
        {
          onSuccess: handleSuccess,
        }
      );
    }
  };

  const formFields = useMemo(
    () =>
      [
        {
          name: "name",
          label: "Tên vai trò",
          placeholder: "VD: Quản trị viên",
        },
        {
          name: "code",
          label: "Mã vai trò",
          placeholder: "VD: ADMIN",
          disabled: false,
        },
      ] as const,
    []
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Chỉnh sửa vai trò" : "Thêm vai trò"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-4">
              {formFields.map((field) => (
                <FormField
                  key={field.name}
                  control={form.control}
                  name={field.name}
                  render={({ field: formField }) => (
                    <FormItem>
                      <FormLabel>{field.label}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={field.placeholder}
                          disabled={(field as any).disabled}
                          {...formField}
                          value={
                            typeof formField.value === "string"
                              ? formField.value
                              : ""
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}

              <FormField
                control={form.control}
                name="permissions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Danh sách quyền</FormLabel>
                    <FormControl>
                      <MultiSelect
                        options={permissionOptions}
                        onValueChange={field.onChange}
                        defaultValue={field.value || []}
                        placeholder="Chọn quyền..."
                        variant="default"
                        animation={0}
                        maxCount={1}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="isSystem"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel>Vai trò hệ thống</FormLabel>
                      <div className="text-[0.8rem] text-muted-foreground">
                        Vai trò này thuộc về hệ thống và có các quyền đặc biệt?
                      </div>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
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

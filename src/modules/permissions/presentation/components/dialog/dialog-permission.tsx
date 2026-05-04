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
import { Permission } from "../../../domain/permission.entity";
import {
  useCreatePermission,
  useUpdatePermission,
} from "../../hooks/use-permissions";
import { formSchema, FormValues } from "./permission.schema";

interface PermissionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "create" | "edit";
  initialValue?: Permission;
}

export function PermissionDialog({
  open,
  onOpenChange,
  mode,
  initialValue,
}: PermissionDialogProps) {
  const isEdit = mode === "edit";

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      name: "",
      category: "",
      description: "",
      parent: "",
    },
  });

  // Reset form khi mở dialog hoặc thay đổi mode
  useEffect(() => {
    if (open) {
      form.reset(
        isEdit && initialValue
          ? {
              title: initialValue.title,
              name: initialValue.name,
              category: initialValue.category,
              description: initialValue.description ?? "",
              parent: initialValue.parent ?? "",
            }
          : { title: "", name: "", category: "", description: "", parent: "" }
      );
    }
  }, [open, initialValue, isEdit, form]);

  // Khởi tạo hook (không truyền payload vào đây nữa)
  const { mutate: create, isPending: isCreating } = useCreatePermission();
  const { mutate: update, isPending: isUpdating } = useUpdatePermission();

  const isPending = isCreating || isUpdating;

  const onSubmit = (values: FormValues) => {
    // Hàm callback đóng dialog khi thành công
    const handleSuccess = () => {
      onOpenChange(false);
      form.reset();
    };

    if (isEdit && initialValue?.id) {
      // Gọi Update
      update(
        {
          id: initialValue.id,
          payload: {
            title: values.title,
            name: values.name,
            category: values.category,
            description: values.description,
            parent: values.parent,
          },
        },
        {
          onSuccess: handleSuccess,
          // Error đã được xử lý global, không cần thêm ở đây trừ khi muốn custom
        }
      );
    } else {
      // Gọi Create
      create(
        {
          title: values.title,
          name: values.name,
          category: values.category,
          description: values.description,
          parent: values.parent,
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
          name: "title",
          label: "Tiêu đề",
          placeholder: "VD: Xem danh sách thiết bị",
        },
        {
          name: "name",
          label: "Mã quyền",
          placeholder: "VD: devices.read.list",
          disabled: isEdit, // Không cho sửa mã quyền khi edit
        },
        {
          name: "category",
          label: "Nhóm chức năng",
          placeholder: "VD: Thiết bị, Tài khoản...",
        },
        {
          name: "parent",
          label: "Quyền cha (tuỳ chọn)",
          placeholder: "VD: devices.read",
        },
        {
          name: "description",
          label: "Mô tả (tuỳ chọn)",
          placeholder: "Mô tả ngắn về quyền",
        },
      ] as const,
    [isEdit]
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEdit ? "Chỉnh sửa quyền" : "Thêm quyền"}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <div className="space-y-3">
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
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
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

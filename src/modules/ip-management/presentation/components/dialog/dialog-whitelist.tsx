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
import { WhitelistIp } from "../../../domain/whitelist.entity";
import {
  useCreateWhitelistIp,
  useUpdateWhitelistIp,
} from "../../hooks/use-whitelists";
import { formSchema, FormValues } from "./whitelist-form.schema";

interface WhitelistDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "create" | "edit";
  initialValue?: WhitelistIp;
}

export function WhitelistDialog({
  open,
  onOpenChange,
  mode,
  initialValue,
}: WhitelistDialogProps) {
  const isEdit = mode === "edit";

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: initialValue?.description ?? "",
      ip: initialValue?.ip ?? "",
      status: initialValue?.status ?? 1,
    },
  });

  useEffect(() => {
    if (open) {
      form.reset(
        isEdit && initialValue
          ? {
              description: initialValue.description,
              ip: initialValue.ip,
              status: initialValue.status,
            }
          : { description: "", ip: "", status: 1 }
      );
    }
  }, [open, initialValue, isEdit, form]);

  const { mutate: create, isPending: isCreating } = useCreateWhitelistIp();
  const { mutate: update, isPending: isUpdating } = useUpdateWhitelistIp();

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
            description: values.description,
            ip: values.ip,
            status: values.status,
          },
        },
        {
          onSuccess: handleSuccess,
        }
      );
    } else {
      create(
        {
          description: values.description,
          ip: values.ip,
          status: values.status,
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
          name: "description",
          label: "Mô tả",
          placeholder: "VD: Địa chỉ IP của thiết bị",
        },
        {
          name: "ip",
          label: "Địa chỉ IP",
          placeholder: "VD: 192.168.1.1",
        },
      ] as const,
    [isEdit]
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Chỉnh sửa địa chỉ IP" : "Thêm địa chỉ IP"}
          </DialogTitle>
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

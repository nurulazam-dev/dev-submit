"use client";

import CustomSubmitButton from "@/components/shared/form/CustomSubmitButton";
import AppField from "@/components/shared/form/AppField";
import { IUpdateServicePayload } from "@/types/service.type";
import {
  IUpdateServiceFormValues,
  updateServiceZodSchema,
} from "@/zod/service.validation";
import { updateServiceAction } from "@/actions/service.action";
import { useForm } from "@tanstack/react-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Settings2 } from "lucide-react";

interface EditServiceFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  service: IUpdateServicePayload | null;
}

const getInitialValues = (
  service: IUpdateServicePayload | null,
): IUpdateServiceFormValues => ({
  name: service?.name ?? "",
  description: service?.description ?? "",
  imageUrl: service?.imageUrl ?? "",
  isActive: service?.isActive ?? false,
});

export default function EditServiceModal({
  open,
  onOpenChange,
  service,
}: EditServiceFormModalProps) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({
      serviceId,
      payload,
    }: {
      serviceId: string;
      payload: IUpdateServicePayload;
    }) => updateServiceAction(serviceId, payload),
  });

  const form = useForm({
    defaultValues: getInitialValues(service),
    onSubmit: async ({ value }) => {
      if (!service) {
        toast.error("Service context not found");
        return;
      }

      const result = await mutateAsync({
        serviceId: String(service.id),
        payload: value as IUpdateServicePayload,
      });

      if (!result.success) {
        toast.error(result.message || "Failed to update service");
        return;
      }

      toast.success(result.message || "Service updated successfully");
      onOpenChange(false);
      form.reset();
      void queryClient.invalidateQueries({ queryKey: ["services"] });
      router.refresh();
    },
  });

  useEffect(() => {
    if (open && service) {
      form.reset(getInitialValues(service));
    }
  }, [service, form, open]);

  const handleOpenChange = useCallback(
    (nextOpen: boolean) => {
      onOpenChange(nextOpen);
      if (!nextOpen) form.reset();
    },
    [form, onOpenChange],
  );

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-150 p-0 overflow-hidden gap-0 border-none shadow-2xl">
        <DialogHeader className="px-6 py-6 bg-muted/30 border-b">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Settings2 className="w-5 h-5 text-primary" />
            </div>
            <div>
              <DialogTitle className="text-xl font-bold">
                Edit Service
              </DialogTitle>
              <DialogDescription className="text-sm">
                Modify the details of your service offering below.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <ScrollArea className="max-h-[80vh]">
          <form
            onSubmit={(event) => {
              event.preventDefault();
              event.stopPropagation();
              form.handleSubmit();
            }}
            className="p-6 space-y-6"
          >
            <div className="grid gap-6">
              <form.Field
                name="name"
                validators={{ onChange: updateServiceZodSchema.shape.name }}
              >
                {(field) => (
                  <AppField
                    field={field}
                    label="Service Name"
                    placeholder="e.g. Premium Healthcare"
                  />
                )}
              </form.Field>

              <form.Field
                name="imageUrl"
                validators={{ onChange: updateServiceZodSchema.shape.imageUrl }}
              >
                {(field) => (
                  <AppField
                    field={field}
                    label="Cover Image URL"
                    placeholder="https://example.com/image.jpg"
                  />
                )}
              </form.Field>

              <form.Field
                name="description"
                validators={{
                  onChange: updateServiceZodSchema.shape.description,
                }}
              >
                {(field) => (
                  <AppField
                    field={field}
                    label="Description"
                    placeholder="Provide a detailed description of the service..."
                  />
                )}
              </form.Field>

              <form.Field name="isActive">
                {(field) => (
                  <div className="space-y-2">
                    <Label htmlFor="status" className="font-semibold text-sm">
                      Publication Status
                    </Label>
                    <Select
                      value={String(field.state.value)}
                      onValueChange={(val) =>
                        field.handleChange(val === "true")
                      }
                    >
                      <SelectTrigger id="status" className="w-full h-11">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="true">
                          <span className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-green-500" />
                            Active & Public
                          </span>
                        </SelectItem>
                        <SelectItem value="false">
                          <span className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-slate-400" />
                            Inactive / Hidden
                          </span>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </form.Field>
            </div>

            <div className="flex items-center justify-end gap-3 pt-6 border-t">
              <Button
                type="button"
                variant="ghost"
                disabled={isPending}
                onClick={() => onOpenChange(false)}
                className="px-6"
              >
                Cancel
              </Button>

              <form.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
              >
                {([canSubmit, isSubmitting]) => (
                  <CustomSubmitButton
                    isPending={isSubmitting || isPending}
                    pendingLabel="Saving changes..."
                    disabled={!canSubmit}
                    className="min-w-35 shadow-lg shadow-primary/20"
                  >
                    Save Changes
                  </CustomSubmitButton>
                )}
              </form.Subscribe>
            </div>
          </form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

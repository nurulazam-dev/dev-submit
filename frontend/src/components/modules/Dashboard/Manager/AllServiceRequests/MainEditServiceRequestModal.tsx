/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import CustomSubmitButton from "@/components/shared/form/CustomSubmitButton";
import AppField from "@/components/shared/form/AppField";
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
import { IServiceRequestUpdatePayload } from "@/zod/serviceRequest.validation";
import { updateServiceRequestAction } from "@/actions/serviceRequest.action";

interface EditServiceRequestFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  serviceRequest: (IServiceRequestUpdatePayload & { id: string }) | null;
}

const getInitialValues = (
  serviceRequest: (IServiceRequestUpdatePayload & { id: string }) | null,
): IServiceRequestUpdatePayload => ({
  status: serviceRequest?.status ?? "PENDING",
  rejectionReason: serviceRequest?.rejectionReason ?? "",
  providerId: serviceRequest?.providerId ?? "",
  scheduleId: serviceRequest?.scheduleId ?? "",
});

export default function MainEditServiceRequestModal({
  open,
  onOpenChange,
  serviceRequest,
}: EditServiceRequestFormModalProps) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({
      serviceRequestId,
      payload,
    }: {
      serviceRequestId: string;
      payload: IServiceRequestUpdatePayload;
    }) => updateServiceRequestAction(serviceRequestId, payload),
  });

  const form = useForm({
    defaultValues: getInitialValues(serviceRequest),
    onSubmit: async ({ value }) => {
      if (!serviceRequest?.id) {
        toast.error("Service request ID not found");
        return;
      }

      const result = await mutateAsync({
        serviceRequestId: serviceRequest.id,
        payload: value,
      });

      if (!result.success) {
        toast.error(result.message || "Failed to update status");
        return;
      }

      toast.success(result.message || "Updated successfully");
      onOpenChange(false);
      void queryClient.invalidateQueries({ queryKey: ["service-requests"] });
      router.refresh();
    },
  });

  useEffect(() => {
    if (open && serviceRequest) {
      form.reset(getInitialValues(serviceRequest));
    }
  }, [serviceRequest, form, open]);

  const handleOpenChange = useCallback(
    (nextOpen: boolean) => {
      onOpenChange(nextOpen);
      if (!nextOpen) form.reset();
    },
    [form, onOpenChange],
  );

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-150 p-0 overflow-hidden border-none shadow-2xl bg-white dark:bg-slate-950">
        <DialogHeader className="px-6 py-6 bg-muted/30 border-b">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Settings2 className="w-5 h-5 text-primary" />
            </div>
            <div>
              <DialogTitle className="text-xl font-bold">
                Manage Request
              </DialogTitle>
              <DialogDescription>
                Accept or reject this service request and assign providers.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <ScrollArea className="max-h-[80vh]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
            className="p-6 space-y-6"
          >
            <form.Field name="status">
              {(field) => (
                <div className="space-y-1.5">
                  <Label htmlFor="status">Action Status</Label>
                  <Select
                    value={field.state.value}
                    onValueChange={(val) => field.handleChange(val as any)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Action" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PENDING">Accept & Assign</SelectItem>
                      <SelectItem value="ACCEPTED">Accept & Assign</SelectItem>
                      <SelectItem value="REJECTED">Reject</SelectItem>
                      <SelectItem value="COMPLETED">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </form.Field>

            <form.Subscribe selector={(state) => state.values.status}>
              {(status) => (
                <div className="space-y-6">
                  {status === "REJECTED" && (
                    <form.Field name="rejectionReason">
                      {(field) => (
                        <AppField
                          field={field}
                          label="Rejection Reason"
                          placeholder="Why is this request being rejected?"
                        />
                      )}
                    </form.Field>
                  )}
                  {status === "ACCEPTED" && (
                    <>
                      <form.Field name="providerId">
                        {(field) => (
                          <AppField
                            field={field}
                            label="Provider ID"
                            placeholder="Enter Provider UUID"
                          />
                        )}
                      </form.Field>

                      <form.Field name="scheduleId">
                        {(field) => (
                          <AppField
                            field={field}
                            label="Schedule ID"
                            placeholder="Enter Schedule UUID"
                          />
                        )}
                      </form.Field>
                    </>
                  )}
                </div>
              )}
            </form.Subscribe>

            <div className="flex items-center justify-end gap-3 pt-6 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>

              <form.Subscribe selector={(state) => [state.canSubmit]}>
                {([canSubmit]) => (
                  <CustomSubmitButton
                    isPending={isPending}
                    disabled={!canSubmit}
                    pendingLabel="Processing..."
                  >
                    Confirm Changes
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

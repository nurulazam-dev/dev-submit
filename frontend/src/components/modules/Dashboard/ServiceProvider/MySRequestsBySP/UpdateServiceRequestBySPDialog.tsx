/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect } from "react";
import { useForm } from "@tanstack/react-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Settings2 } from "lucide-react";

import CustomSubmitButton from "@/components/shared/form/CustomSubmitButton";
import AppField from "@/components/shared/form/AppField";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

import { IServiceRequestUpdateCostBySPPayload } from "@/zod/serviceRequest.validation";
import { IServiceRequestPayload } from "@/types/serviceRequest.type";
import { updateServiceRequestCostBySPAction } from "@/actions/serviceRequest.action";
import { ApiErrorResponse, ApiResponse } from "@/types/api.types";

interface UpdateProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mySRequest: IServiceRequestPayload | null;
}

const getInitialValues = (
  mySRequest: IServiceRequestPayload | null,
): IServiceRequestUpdateCostBySPPayload => ({
  serviceCharge: mySRequest?.costBreakdown?.serviceCharge ?? 0,
  productCost: mySRequest?.costBreakdown?.productCost ?? 0,
  additionalCost: mySRequest?.costBreakdown?.additionalCost ?? 0,
});

export default function UpdateServiceRequestCostBySPDialog({
  open,
  onOpenChange,
  mySRequest,
}: UpdateProps) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutateAsync, isPending } = useMutation<
    ApiResponse | ApiErrorResponse,
    Error,
    { id: string; payload: IServiceRequestUpdateCostBySPPayload }
  >({
    mutationFn: ({ id, payload }) =>
      updateServiceRequestCostBySPAction(id, payload),
  });

  const form = useForm({
    defaultValues: getInitialValues(mySRequest),
    onSubmit: async ({ value }) => {
      if (!mySRequest?.id) return;

      try {
        const payload: IServiceRequestUpdateCostBySPPayload = {
          serviceCharge: Number(value.serviceCharge) || 0,
          productCost: Number(value.productCost) || 0,
          additionalCost: Number(value.additionalCost) || 0,
        };

        const result = await mutateAsync({
          id: String(mySRequest.id),
          payload,
        });

        if (result.success) {
          toast.success(result.message);
          onOpenChange(false);
          form.reset();
          await queryClient.invalidateQueries({ queryKey: ["my-requests-sp"] });
          router.refresh();
        } else {
          toast.error(result.message);
        }
      } catch (error: any) {
        toast.error(error?.message || "An unexpected error occurred");
      }
    },
  });

  useEffect(() => {
    if (open && mySRequest) {
      form.reset(getInitialValues(mySRequest));
    }
  }, [open, mySRequest, form]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-0 overflow-hidden bg-white dark:bg-slate-950">
        <DialogHeader className="px-6 py-6 border-b bg-muted/20">
          <div className="flex items-center gap-3">
            <Settings2 className="w-5 h-5 text-primary" />
            <div>
              <DialogTitle className="text-xl font-bold">
                Update Service Cost
              </DialogTitle>
              <DialogDescription>
                Enter the breakdown of the service costs.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <ScrollArea className="max-h-[70vh]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
            className="p-6 space-y-5"
          >
            <form.Field name="serviceCharge">
              {(field) => (
                <AppField
                  field={field}
                  label="Service Charge"
                  type="number"
                  placeholder="0.00"
                />
              )}
            </form.Field>

            <form.Field name="productCost">
              {(field) => (
                <AppField
                  field={field}
                  label="Product Cost"
                  type="number"
                  placeholder="0.00"
                />
              )}
            </form.Field>

            <form.Field name="additionalCost">
              {(field) => (
                <AppField
                  field={field}
                  label="Additional Cost"
                  type="number"
                  placeholder="0.00"
                />
              )}
            </form.Field>

            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isPending}
              >
                Cancel
              </Button>
              <form.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
              >
                {([canSubmit, isSubmitting]) => (
                  <CustomSubmitButton
                    isPending={isSubmitting || isPending}
                    pendingLabel="Updating..."
                    disabled={!canSubmit}
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

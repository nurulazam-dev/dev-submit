"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

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
import { Button } from "@/components/ui/button";
import CustomSubmitButton from "@/components/shared/form/CustomSubmitButton";
import AppField from "@/components/shared/form/AppField";
import {
  IJobApplicationPayload,
  IUpdateJobApplicationPayload,
} from "@/types/jobApplication.type";
import {
  IUpdateJobApplicationFormValues,
  updateJobApplicationZodSchema,
} from "@/zod/jobApplication.validation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { updateJobApplicationAction } from "@/actions/jobApplication.action";

interface UpdateJobApplicationFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  jobApplication: IJobApplicationPayload | null;
}

const getInitialValues = (
  jobApplication: IJobApplicationPayload | null,
): IUpdateJobApplicationFormValues => ({
  status: jobApplication?.status ?? "PENDING",
  feedback: jobApplication?.feedback ?? "",
});

const zodValidator = (schema: any) => {
  return ({ value }: { value: unknown }) => {
    const result = schema.safeParse(value);
    return result.success ? undefined : result.error.issues[0]?.message;
  };
};

const zodFormValidator = (schema: any) => {
  return ({ value }: { value: unknown }) => {
    const result = schema.safeParse(value);
    if (!result.success) {
      return result.error.formErrors.fieldErrors;
    }
    return undefined;
  };
};

const getErrorMessage = (error: unknown): string => {
  if (typeof error === "string") {
    return error;
  }

  if (error && typeof error === "object" && "message" in error) {
    return String(error.message);
  }

  return "Invalid input";
};

const FieldMessage = ({ error }: { error: unknown }) => {
  if (!error) {
    return null;
  }

  return <p className="text-sm text-destructive">{getErrorMessage(error)}</p>;
};

export default function UpdateJobApplicationModal({
  open,
  onOpenChange,
  jobApplication,
}: UpdateJobApplicationFormModalProps) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({
      jobApplicationId,
      payload,
    }: {
      jobApplicationId: string;
      payload: IUpdateJobApplicationPayload;
    }) => updateJobApplicationAction(jobApplicationId, payload),
  });

  const form = useForm({
    defaultValues: getInitialValues(jobApplication),
    validators: {
      onSubmit: zodFormValidator(updateJobApplicationZodSchema),
    },
    onSubmit: async ({ value }) => {
      if (!jobApplication) {
        toast.error("Job application not found");
        return;
      }

      const payload: IUpdateJobApplicationPayload = {
        status: value.status as IUpdateJobApplicationPayload["status"],
        feedback: value.feedback || null,
      };

      const result = await mutateAsync({
        jobApplicationId: String(jobApplication.id),
        payload,
      });

      console.log("Result from action:", result);

      if (!result || result.success === false) {
        toast.error(result?.message || "Failed to update job Application");
        return;
      }

      toast.success(result.message || "Job Application updated successfully");
      onOpenChange(false);

      form.reset();

      /*  void queryClient.invalidateQueries({ queryKey: ["job-applications"] });
      void queryClient.refetchQueries({
        queryKey: ["job-applications"],
        type: "active",
      });
       */

      await queryClient.invalidateQueries({
        queryKey: ["job-applications"],
        exact: false,
      });

      router.refresh();
    },
  });

  useEffect(() => {
    if (open) {
      form.reset(getInitialValues(jobApplication));
    }
  }, [jobApplication, form, open]);

  const handleOpenChange = useCallback(
    (nextOpen: boolean) => {
      onOpenChange(nextOpen);
      if (!nextOpen) {
        form.reset();
      }
    },
    [form, onOpenChange],
  );

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-h-[90vh] w-[calc(100vw-1.5rem)] max-w-[calc(100vw-1.5rem)] gap-0 overflow-hidden p-0 sm:w-[calc(100vw-3rem)] sm:max-w-[calc(100vw-3rem)] md:w-[calc(100vw-4rem)] md:max-w-[calc(100vw-4rem)] lg:w-[min(92vw,78rem)] lg:max-w-[min(92vw,78rem)] xl:w-[min(88vw,88rem)] xl:max-w-[min(88vw,88rem)] 2xl:w-[min(84vw,96rem)] 2xl:max-w-[min(84vw,96rem)]">
        <DialogHeader className="border-b px-6 py-5 pr-14">
          <DialogTitle>Update Job Application</DialogTitle>
          <DialogDescription>
            Update job application information and details.
          </DialogDescription>
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
            <div className="space-y-5">
              <form.Field
                name="status"
                validators={{
                  onChange: updateJobApplicationZodSchema.shape.status,
                }}
              >
                {(field) => {
                  const firstError =
                    field.state.meta.isTouched &&
                    field.state.meta.errors.length > 0
                      ? field.state.meta.errors[0]
                      : null;

                  return (
                    <div className="space-y-1.5">
                      <Label
                        htmlFor="edit-application-status"
                        className={cn(firstError && "text-destructive")}
                      >
                        Application Status
                      </Label>
                      <Select
                        value={field.state.value}
                        onValueChange={(value) => {
                          field.handleChange(
                            value as IUpdateJobApplicationPayload["status"],
                          );
                          field.handleBlur();
                        }}
                      >
                        <SelectTrigger
                          id="edit-application-status"
                          className={cn(
                            "w-full",
                            firstError && "border-destructive",
                          )}
                        >
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="PENDING">Pending</SelectItem>
                          <SelectItem value="ACCEPTED">Accepted</SelectItem>
                          <SelectItem value="REJECTED">Rejected</SelectItem>
                        </SelectContent>
                      </Select>
                      <FieldMessage error={firstError} />
                    </div>
                  );
                }}
              </form.Field>

              <form.Field
                name="feedback"
                validators={{
                  onChange: zodValidator(
                    updateJobApplicationZodSchema.shape.feedback,
                  ),
                }}
              >
                {(field) => (
                  <AppField
                    field={field}
                    label="Job Application Feedback"
                    placeholder="Add the Job Application Feedback"
                  />
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

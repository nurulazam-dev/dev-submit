/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { createServiceScheduleAction } from "@/actions/serviceSchedule.action";
import AppField from "@/components/shared/form/AppField";
import CustomSubmitButton from "@/components/shared/form/CustomSubmitButton";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  createServiceScheduleZodSchema,
  ICreateServiceSchedulePayload,
} from "@/zod/schedule.validation";

import { useForm } from "@tanstack/react-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, CalendarDays, Clock, Info } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { toast } from "sonner";

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

const defaultValues: ICreateServiceSchedulePayload = {
  scheduleDate: "",
  startTime: "",
};

const CreateServiceScheduleModal = () => {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (scheduleData: ICreateServiceSchedulePayload) =>
      createServiceScheduleAction(scheduleData),
  });

  const form = useForm({
    defaultValues,
    validators: {
      onSubmit: zodFormValidator(createServiceScheduleZodSchema),
    },
    onSubmit: async ({ value }) => {
      const result = await mutateAsync(value as ICreateServiceSchedulePayload);

      if (!result.success) {
        toast.error(result.message || "Failed to create schedule");
        return;
      }

      toast.success(result.message || "Service schedule created successfully");
      setOpen(false);
      form.reset();
      void queryClient.invalidateQueries({ queryKey: ["service-schedules"] });
      router.refresh();
    },
  });

  const handleOpenChange = useCallback(
    (nextOpen: boolean) => {
      setOpen(nextOpen);
      if (!nextOpen) form.reset();
    },
    [form],
  );

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger
        render={
          <Button className="gap-2 shadow-md hover:shadow-lg transition-all bg-primary hover:bg-primary/90">
            <Plus className="size-4" />
            Create New Schedule
          </Button>
        }
      />

      <DialogContent className="max-w-lg p-0 overflow-hidden border-none shadow-2xl">
        <DialogHeader className="px-6 py-6 bg-primary/5 border-b">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-full">
              <CalendarDays className="size-6 text-primary" />
            </div>
            <div>
              <DialogTitle className="text-xl font-bold uppercase tracking-tight">
                New Service Schedule
              </DialogTitle>
              <DialogDescription>
                Set a date and time for your upcoming service availability.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <ScrollArea className="max-h-[70vh]">
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
                name="scheduleDate"
                validators={{
                  onChange: zodValidator(
                    createServiceScheduleZodSchema.shape.scheduleDate,
                  ),
                }}
              >
                {(field) => (
                  <div className="relative">
                    <AppField
                      field={field}
                      label="Schedule Date"
                      type="date"
                      placeholder="Select Date"
                    />
                  </div>
                )}
              </form.Field>

              <form.Field
                name="startTime"
                validators={{
                  onChange: zodValidator(
                    createServiceScheduleZodSchema.shape.startTime,
                  ),
                }}
              >
                {(field) => (
                  <div className="relative">
                    <AppField
                      field={field}
                      label="Start Time"
                      placeholder="e.g. 09:00 AM"
                    />
                    <Clock className="absolute right-3 top-9 size-4 text-muted-foreground/50" />
                    <p className="text-[10px] text-muted-foreground mt-1 flex items-center gap-1">
                      <Info size={12} /> Format: HH:MM AM/PM (e.g., 10:30 AM)
                    </p>
                  </div>
                )}
              </form.Field>
            </div>

            <div className="flex items-center justify-end gap-3 pt-6 border-t">
              <Button
                type="button"
                variant="ghost"
                disabled={isPending}
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>

              <form.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
              >
                {([canSubmit, isSubmitting]) => (
                  <CustomSubmitButton
                    isPending={isSubmitting || isPending}
                    pendingLabel="Creating..."
                    disabled={!canSubmit}
                    className="min-w-32 shadow-lg shadow-primary/20"
                  >
                    Create Schedule
                  </CustomSubmitButton>
                )}
              </form.Subscribe>
            </div>
          </form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default CreateServiceScheduleModal;

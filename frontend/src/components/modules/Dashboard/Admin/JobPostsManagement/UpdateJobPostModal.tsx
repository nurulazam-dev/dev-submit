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
import { IJobPostPayload, IUpdateJobPostPayload } from "@/types/jobPost.type";
import {
  IUpdateJobPostFormValues,
  updateJobPostZodSchema,
} from "@/zod/jobPost.validation";
import { updateJobPostService } from "@/services/jobPosts.services";
import { CircleDollarSign, MapPin } from "lucide-react";

interface UpdateJobPostFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  jobPost: IJobPostPayload | null;
}

const getInitialValues = (
  jobPost: IJobPostPayload | null,
): IUpdateJobPostFormValues => ({
  title: jobPost?.title ?? "",
  description: jobPost?.description ?? "",
  requirements: jobPost?.requirements ?? "",
  location: jobPost?.location ?? "",
  serviceType: jobPost?.serviceType ?? "",
  vacancy: jobPost?.vacancy ?? 1,
  salaryRange: jobPost?.salaryRange ?? "",
  deadline:
    jobPost?.deadline ?? (new Date().toISOString().split("T")[0] as any),
  isActive: jobPost?.isActive ?? true,
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

export default function UpdateJobPostModal({
  open,
  onOpenChange,
  jobPost,
}: UpdateJobPostFormModalProps) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({
      jobPostId,
      payload,
    }: {
      jobPostId: string;
      payload: IUpdateJobPostPayload;
    }) => updateJobPostService(jobPostId, payload),
  });

  const form = useForm({
    defaultValues: getInitialValues(jobPost),
    validators: {
      onSubmit: zodFormValidator(updateJobPostZodSchema),
    },
    onSubmit: async ({ value }) => {
      if (!jobPost) {
        toast.error("Job post not found");
        return;
      }

      const payload: IUpdateJobPostPayload = {
        title: value.title,
        description: value.description,
        requirements: value.requirements,
        location: value.location,
        serviceType: value.serviceType,
        vacancy: value.vacancy,
        salaryRange: value.salaryRange,
        deadline: value.deadline,
        isActive: value.isActive,
      };

      const result = await mutateAsync({
        jobPostId: String(jobPost.id),
        payload,
      });

      if (!result.success) {
        toast.error(result.message || "Failed to update job post");
        return;
      }

      toast.success(result.message || "Job post updated successfully");
      onOpenChange(false);
      form.reset();

      void queryClient.invalidateQueries({ queryKey: ["job-posts"] });
      void queryClient.refetchQueries({
        queryKey: ["job-posts"],
        type: "active",
      });
      router.refresh();
    },
  });

  useEffect(() => {
    if (open) {
      form.reset(getInitialValues(jobPost));
    }
  }, [jobPost, form, open]);

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
          <DialogTitle>Update Job Post</DialogTitle>
          <DialogDescription>
            Update job post information and details.
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <form.Field
                name="title"
                validators={{
                  onChange: zodValidator(updateJobPostZodSchema.shape.title),
                }}
              >
                {(field) => (
                  <AppField
                    field={field}
                    label="Job Title"
                    placeholder="e.g. Senior Software Engineer"
                  />
                )}
              </form.Field>

              <form.Field
                name="serviceType"
                validators={{
                  onChange: zodValidator(
                    updateJobPostZodSchema.shape.serviceType,
                  ),
                }}
              >
                {(field) => (
                  <AppField
                    field={field}
                    label="Service Type"
                    placeholder="e.g. Full-time, Contract"
                  />
                )}
              </form.Field>
              <form.Field
                name="location"
                validators={{
                  onChange: zodValidator(updateJobPostZodSchema.shape.location),
                }}
              >
                {(field) => (
                  <div className="relative">
                    <AppField
                      field={field}
                      label="Location"
                      placeholder="e.g. Remote or Dhaka, BD"
                    />
                    <MapPin className="absolute right-3 top-9 size-4 text-muted-foreground/50" />
                  </div>
                )}
              </form.Field>
              <form.Field
                name="vacancy"
                validators={{
                  /* onChange: ({ value }) => {
                    const result = zodValidator(
                      updateJobPostZodSchema.shape.vacancy,
                    )({ value });

                    return result;
                  }, */

                  onChange: ({ value }) => {
                    const parsedValue =
                      typeof value === "number"
                        ? value
                        : value
                          ? Number(value)
                          : undefined;

                    const result =
                      updateJobPostZodSchema.shape.vacancy.safeParse(
                        parsedValue,
                      );

                    return result.success
                      ? undefined
                      : result.error.issues[0]?.message;
                  },
                }}
              >
                {(field) => (
                  <AppField
                    field={field}
                    label="Vacancy Count"
                    type="number"
                    placeholder="Number of seats"
                  />
                )}
              </form.Field>
              <form.Field
                name="salaryRange"
                validators={{
                  onChange: zodValidator(
                    updateJobPostZodSchema.shape.salaryRange,
                  ),
                }}
              >
                {(field) => (
                  <div className="relative">
                    <AppField
                      field={field}
                      label="Salary Range"
                      placeholder="e.g. 50k - 80k BDT"
                    />
                    <CircleDollarSign className="absolute right-3 top-9 size-4 text-muted-foreground/50" />
                  </div>
                )}
              </form.Field>
              <form.Field
                name="deadline"
                validators={{
                  onChange: ({ value }) => {
                    const result = zodValidator(
                      updateJobPostZodSchema.shape.deadline,
                    )({ value });

                    return result;
                  },
                }}
              >
                {(field) => (
                  <div className="relative">
                    <AppField
                      field={field}
                      label="Application Deadline"
                      type="date"
                    />
                  </div>
                )}
              </form.Field>

              <div className="space-y-5">
                <form.Field
                  name="description"
                  validators={{
                    onChange: zodValidator(
                      updateJobPostZodSchema.shape.description,
                    ),
                  }}
                >
                  {(field) => (
                    <AppField
                      field={field}
                      label="Job Description"
                      placeholder="What will the person do in this role?"
                    />
                  )}
                </form.Field>

                <form.Field
                  name="requirements"
                  validators={{
                    onChange: zodValidator(
                      updateJobPostZodSchema.shape.requirements,
                    ),
                  }}
                >
                  {(field) => (
                    <AppField
                      field={field}
                      label="Requirements"
                      placeholder="Skills, experience, or certifications needed..."
                    />
                  )}
                </form.Field>
              </div>
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

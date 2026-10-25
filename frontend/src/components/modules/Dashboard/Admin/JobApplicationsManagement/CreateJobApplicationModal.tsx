"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { createJobPostAction } from "@/actions/jobPost.action";
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
import { ICreateJobPostPayload } from "@/types/jobPost.type";
import {
  createJobPostZodSchema,
  ICreateJobPostFormValues,
} from "@/zod/jobPost.validation";
import { useForm } from "@tanstack/react-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Plus,
  BriefcaseBusiness,
  MapPin,
  CircleDollarSign,
} from "lucide-react";
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

const defaultValues: ICreateJobPostFormValues = {
  title: "",
  description: "",
  requirements: "",
  location: "",
  serviceType: "",
  vacancy: 1,
  salaryRange: "",
  deadline: new Date(),
};

const CreateJobApplicationModal = () => {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (jobPostData: ICreateJobPostFormValues) =>
      createJobPostAction(jobPostData as ICreateJobPostPayload),
  });

  const form = useForm({
    defaultValues,
    validators: {
      onSubmit: zodFormValidator(createJobPostZodSchema),
    },
    onSubmit: async ({ value }) => {
      const result = await mutateAsync(value);

      if (!result.success) {
        toast.error(result.message || "Failed to create job post");
        return;
      }

      toast.success(result.message || "Job post created successfully");
      setOpen(false);
      form.reset();
      void queryClient.invalidateQueries({ queryKey: ["job-posts"] });
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
          <Button className="gap-2 shadow-md hover:shadow-lg transition-all">
            <Plus className="size-4" />
            Post a New Job
          </Button>
        }
      />
      <DialogContent className="max-w-2xl p-0 overflow-hidden border-none shadow-2xl">
        <DialogHeader className="px-6 py-6 bg-primary/5 border-b">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-full">
              <BriefcaseBusiness className="size-6 text-primary" />
            </div>
            <div>
              <DialogTitle className="text-xl font-bold">
                Create Job Opening
              </DialogTitle>
              <DialogDescription>
                Fill in the details to attract the best candidates.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <ScrollArea className="max-h-[75vh]">
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
                  onChange: zodValidator(createJobPostZodSchema.shape.title),
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
                    createJobPostZodSchema.shape.serviceType,
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
                  onChange: zodValidator(createJobPostZodSchema.shape.location),
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
                  onChange: ({ value }) => {
                    const result = zodValidator(
                      createJobPostZodSchema.shape.vacancy,
                    )({ value });

                    return result;
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
                    createJobPostZodSchema.shape.salaryRange,
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
                      createJobPostZodSchema.shape.deadline,
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
            </div>

            <div className="space-y-5">
              <form.Field
                name="description"
                validators={{
                  onChange: zodValidator(
                    createJobPostZodSchema.shape.description,
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
                    createJobPostZodSchema.shape.requirements,
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

            {/* Footer Actions */}
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
                    pendingLabel="Posting job..."
                    disabled={!canSubmit}
                    className="min-w-40 shadow-lg shadow-primary/20"
                  >
                    Post Job Now
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

export default CreateJobApplicationModal;

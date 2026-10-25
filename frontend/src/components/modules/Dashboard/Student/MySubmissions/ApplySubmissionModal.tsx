"use client";

import { useCallback, useState } from "react";
import { useForm } from "@tanstack/react-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  Zap,
  GitBranch,
  ExternalLink,
  FileText,
  ChevronRight,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import AppField from "@/components/shared/form/AppField";
import CustomSubmitButton from "@/components/shared/form/CustomSubmitButton";

import { createSubmissionAction } from "@/actions/submission.action";
import type { ISubmissionPayload } from "@/types/submission.type";
import { createSubmissionZodSchema } from "@/zod/submission.validation";

interface ApplySubmissionModalProps {
  studentId: string;
  submission: ISubmissionPayload;
}

export default function ApplySubmissionModal({
  studentId,
  submission,
}: ApplySubmissionModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: createSubmissionAction,

    onSuccess: async (res) => {
      if (!res.success) {
        toast.error(res.message || "Failed to submit your application.");
        return;
      }

      toast.success("Submission submitted successfully!");

      await queryClient.invalidateQueries({
        queryKey: ["my-submissions"],
      });

      setIsOpen(false);
    },

    onError: (error) => {
      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    },
  });

  const form = useForm({
    defaultValues: {
      studentId,
      title: "",
      description: "",
      githubUrl: "",
      liveUrl: "",
    },

    // validators: {
    //   onSubmit: createSubmissionZodSchema,
    // },

    onSubmit: async ({ value }) => {
      await mutateAsync(value);
    },
  });

  const handleOpenChange = useCallback(
    (nextOpen: boolean) => {
      setIsOpen(nextOpen);
      if (!nextOpen) form.reset();
    },
    [form],
  );
  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger
        render={
          <Button className="group h-12 w-full rounded-md text-lg font-black transition-all hover:-translate-y-1">
            Apply for Submission
            <ChevronRight className="ml-2 size-5 transition-transform group-hover:translate-x-1" />
          </Button>
        }
      />

      <DialogContent className="overflow-hidden rounded-2xl border-none p-0 shadow-2xl sm:max-w-xl">
        <DialogHeader className="relative bg-primary p-8 text-primary-foreground">
          <div className="absolute right-0 top-0 p-4 opacity-10">
            <Zap className="size-24" />
          </div>

          <DialogTitle className="text-2xl font-black">
            Apply for Submission
          </DialogTitle>

          <DialogDescription className="font-medium text-primary-foreground/80">
            Submit your work for{" "}
            <span className="font-bold text-white">{submission.title}</span>
          </DialogDescription>
        </DialogHeader>

        <div className="p-6 sm:p-8">
          <form
            noValidate
            onSubmit={(event) => {
              event.preventDefault();
              event.stopPropagation();
              form.handleSubmit();
            }}
            className="space-y-5"
          >
            <form.Field
              name="title"
              validators={{
                onChange: ({ value }) => {
                  const result =
                    createSubmissionZodSchema.shape.title.safeParse(value);

                  return result.success
                    ? undefined
                    : result.error.issues[0]?.message;
                },
              }}
            >
              {(field) => (
                <AppField
                  field={field}
                  label="Submission Title"
                  placeholder="Enter your project title"
                  append={
                    <FileText className="mr-2 size-4 text-muted-foreground" />
                  }
                />
              )}
            </form.Field>

            <form.Field
              name="description"
              validators={{
                onChange: ({ value }) => {
                  const result =
                    createSubmissionZodSchema.shape.description.safeParse(
                      value,
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
                  label="Project Description"
                  placeholder="Describe your project and its features"
                  append={
                    <FileText className="mr-2 size-4 text-muted-foreground" />
                  }
                />
              )}
            </form.Field>

            <form.Field
              name="githubUrl"
              validators={{
                onChange: ({ value }) => {
                  const result =
                    createSubmissionZodSchema.shape.githubUrl.safeParse(value);

                  return result.success
                    ? undefined
                    : result.error.issues[0]?.message;
                },
              }}
            >
              {(field) => (
                <AppField
                  field={field}
                  label="GitHub Repository URL"
                  placeholder="https://github.com/username/project"
                  append={
                    <GitBranch className="mr-2 size-4 text-muted-foreground" />
                  }
                />
              )}
            </form.Field>

            <form.Field
              name="liveUrl"
              validators={{
                onChange: ({ value }) => {
                  const result =
                    createSubmissionZodSchema.shape.liveUrl.safeParse(value);

                  return result.success
                    ? undefined
                    : result.error.issues[0]?.message;
                },
              }}
            >
              {(field) => (
                <AppField
                  field={field}
                  label="Live Project URL"
                  placeholder="https://your-project.vercel.app"
                  append={
                    <ExternalLink className="mr-2 size-4 text-muted-foreground" />
                  }
                />
              )}
            </form.Field>

            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
            >
              {([canSubmit, isSubmitting]) => (
                <CustomSubmitButton
                  isPending={isSubmitting || isPending}
                  pendingLabel="Submitting..."
                  disabled={!canSubmit || isPending}
                  className="h-12 w-full rounded-xl text-lg font-bold shadow-lg shadow-primary/20"
                >
                  Submit Application
                  <Zap className="ml-2 size-5 fill-current" />
                </CustomSubmitButton>
              )}
            </form.Subscribe>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

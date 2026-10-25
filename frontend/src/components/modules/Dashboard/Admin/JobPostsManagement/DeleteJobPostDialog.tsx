"use client";

import { deleteJobPostAction } from "@/actions/jobPost.action";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { IJobPostPayload } from "@/types/jobPost.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface DeleteJobPostConfirmationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  jobPost: IJobPostPayload | null;
}

export default function DeleteJobPostDialog({
  open,
  onOpenChange,
  jobPost,
}: DeleteJobPostConfirmationDialogProps) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: deleteJobPostAction,
  });

  const handleConfirmDelete = async () => {
    if (!jobPost) {
      toast.error("job post not found");
      return;
    }

    if (!jobPost.isActive) {
      toast.error("Job post already deleted");
      return;
    }

    const result = await mutateAsync(String(jobPost.id));

    if (!result.success) {
      toast.error(result.message || "Failed to delete job post");
      return;
    }

    toast.success(result.message || "Job Post deleted successfully");
    onOpenChange(false);

    void queryClient.invalidateQueries({ queryKey: ["job-posts"] });
    void queryClient.refetchQueries({
      queryKey: ["job-posts"],
      type: "active",
    });
    router.refresh();
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Job Post</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete {jobPost?.title ?? "this job post"}?
            This action will mark the user as deleted.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            onClick={(event) => {
              event.preventDefault();
              void handleConfirmDelete();
            }}
            disabled={isPending}
          >
            {isPending ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

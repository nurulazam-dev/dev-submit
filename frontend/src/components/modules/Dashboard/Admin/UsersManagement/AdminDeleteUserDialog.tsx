"use client";

import { adminDeleteUserAction } from "@/actions/user.action";
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
import { IUserPayload } from "@/types/users.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface DeleteUserConfirmationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: IUserPayload | null;
}

export default function AdminDeleteUserDialog({
  open,
  onOpenChange,
  user,
}: DeleteUserConfirmationDialogProps) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: adminDeleteUserAction,
  });

  const handleConfirmDelete = async () => {
    if (!user) {
      toast.error("User not found");
      return;
    }

    if (user.isDeleted || user.status === "DELETED") {
      toast.error("User already deleted");
      return;
    }

    const result = await mutateAsync(String(user.id));

    if (!result.success) {
      toast.error(result.message || "Failed to delete user");
      return;
    }

    toast.success(result.message || "User deleted successfully");
    onOpenChange(false);

    void queryClient.invalidateQueries({ queryKey: ["users"] });
    void queryClient.refetchQueries({ queryKey: ["users"], type: "active" });
    router.refresh();
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete User</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete {user?.name ?? "this user"}? This
            action will mark the user as deleted.
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

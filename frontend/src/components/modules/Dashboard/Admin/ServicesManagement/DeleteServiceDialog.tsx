"use client";

import { deleteServiceAction } from "@/actions/service.action";
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
import { IServicePayload } from "@/types/service.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface DeleteServiceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  service: IServicePayload | null;
}

export default function DeleteServiceDialog({
  open,
  onOpenChange,
  service,
}: DeleteServiceDialogProps) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: deleteServiceAction,
  });

  const handleConfirmDelete = async () => {
    if (!service || !service.isActive) {
      toast.error("Service not found or already deleted");
      return;
    }

    const result = await mutateAsync(String(service.id));

    if (!result.success) {
      toast.error(result.message || "Failed to delete service");
      return;
    }

    toast.success(result.message || "Service deleted successfully");
    onOpenChange(false);

    void queryClient.invalidateQueries({ queryKey: ["services"] });
    void queryClient.refetchQueries({ queryKey: ["services"], type: "active" });
    router.refresh();
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Service</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete {service?.name ?? "this service"}?
            This action will mark the service as deleted.
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

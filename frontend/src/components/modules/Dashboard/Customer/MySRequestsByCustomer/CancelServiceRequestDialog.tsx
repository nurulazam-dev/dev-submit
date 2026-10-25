"use client";

import { cancelServiceRequestAction } from "@/actions/serviceRequest.action";
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
import { IServiceRequestPayload } from "@/types/serviceRequest.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface CancelServiceRequestConfirmationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  myServiceRequest: IServiceRequestPayload | null;
}

export default function CancelServiceRequestDialog({
  open,
  onOpenChange,
  myServiceRequest,
}: CancelServiceRequestConfirmationDialogProps) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: cancelServiceRequestAction,
  });

  const handleConfirmDelete = async () => {
    if (!myServiceRequest) {
      toast.error("service request not found");
      return;
    }

    if (myServiceRequest.isDeleted === true) {
      toast.error("service request already cancelled");
      return;
    }

    const result = await mutateAsync(String(myServiceRequest.id));

    if (!result.success) {
      toast.error(result.message || "Failed to cancel service request");
      return;
    }

    toast.success(result.message || "service request cancelled successfully");
    onOpenChange(false);

    void queryClient.invalidateQueries({
      queryKey: ["my-service-requests-customer"],
    });
    void queryClient.refetchQueries({
      queryKey: ["my-service-requests-customer"],
      type: "active",
    });
    router.refresh();
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Cancel service request</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to cancel{" "}
            {myServiceRequest?.service?.name ?? "this service request"} service
            request? This action will mark the service request as deleted.
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

import { getUserByIdAction } from "@/actions/user.action";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ApiResponse } from "@/types/api.types";
import { IUserPayload } from "@/types/users.type";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";

interface ViewUserProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: IUserPayload | null;
}

const formatDateTime = (value?: string | Date | null) => {
  if (!value) {
    return "N/A";
  }

  const dateValue = new Date(value);
  if (Number.isNaN(dateValue.getTime())) {
    return "N/A";
  }

  return format(dateValue, "MMM dd, yyyy hh:mm a");
};

export default function ViewUserProfileModel({
  open,
  onOpenChange,
  user,
}: ViewUserProfileDialogProps) {
  const userId = user ? String(user.id) : "";

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["user-details", userId],
    queryFn: () => getUserByIdAction(userId),
    enabled: open && userId.length > 0,
    staleTime: 1000 * 60,
  });

  const hasError = data && !data.success;
  const userDetails =
    data && data.success ? (data as ApiResponse<IUserPayload>).data : null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] w-[calc(100vw-1.5rem)] max-w-[calc(100vw-1.5rem)] gap-0 overflow-hidden p-0 sm:w-[calc(100vw-3rem)] sm:max-w-[calc(100vw-3rem)] md:w-[calc(100vw-4rem)] md:max-w-[calc(100vw-4rem)] lg:w-[min(92vw,78rem)] lg:max-w-[min(92vw,78rem)] xl:w-[min(88vw,88rem)] xl:max-w-[min(88vw,88rem)] 2xl:w-[min(84vw,96rem)] 2xl:max-w-[min(84vw,96rem)]">
        <DialogHeader className="border-b px-6 py-5 pr-14">
          <DialogTitle>User Profile</DialogTitle>
          <DialogDescription>
            Comprehensive profile view with user info, account details.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(90vh-5.5rem)]">
          <div className="space-y-4 px-6 py-5">
            {(isLoading || isFetching) && (
              <div className="rounded-md border p-4 text-sm text-muted-foreground">
                Loading user details...
              </div>
            )}

            {hasError && (
              <div className="rounded-md border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
                {data.message || "Failed to load user details."}
              </div>
            )}

            {!isLoading && !isFetching && userDetails && (
              <>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-lg border p-4">
                    <h3 className="mb-3 text-sm font-semibold">User Info</h3>
                    <div className="space-y-2 text-sm">
                      <p>
                        <span className="font-medium">Name:</span>{" "}
                        {userDetails.name || "N/A"}
                      </p>
                      <p>
                        <span className="font-medium">Email:</span>{" "}
                        {userDetails.email || "N/A"}
                      </p>
                      <p>
                        <span className="font-medium">Contact:</span>{" "}
                        {userDetails.phone || "N/A"}
                      </p>
                      <p>
                        <span className="font-medium">Status:</span>{" "}
                        {userDetails.status || "N/A"}
                      </p>

                      <p>
                        <span className="font-medium">Address:</span>{" "}
                        {userDetails.address || "N/A"}
                      </p>
                    </div>
                  </div>

                  <div className="rounded-lg border p-4">
                    <h3 className="mb-3 text-sm font-semibold">User Account</h3>
                    <div className="space-y-2 text-sm">
                      <p>
                        <span className="font-medium">User Name:</span>{" "}
                        {userDetails.name || "N/A"}
                      </p>
                      <p>
                        <span className="font-medium">User Email:</span>{" "}
                        {userDetails.email || "N/A"}
                      </p>
                      <p>
                        <span className="font-medium">Role:</span>{" "}
                        {userDetails.role || "N/A"}
                      </p>
                      <p>
                        <span className="font-medium">Status:</span>{" "}
                        {userDetails.status || "N/A"}
                      </p>
                      <p>
                        <span className="font-medium">Email Verified:</span>{" "}
                        {userDetails.emailVerified ? "Yes" : "No"}
                      </p>
                      <p>
                        <span className="font-medium">Created:</span>{" "}
                        {formatDateTime(userDetails.createdAt)}
                      </p>
                      <p>
                        <span className="font-medium">Updated:</span>{" "}
                        {formatDateTime(userDetails.updatedAt)}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

import { getServiceByIdAction } from "@/actions/service.action";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ApiResponse } from "@/types/api.types";
import { IServicePayload } from "@/types/service.type";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Star, Calendar, Info, Activity } from "lucide-react";
import Image from "next/image";

interface ViewServiceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  service: IServicePayload | null;
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

export default function ViewServiceModel({
  open,
  onOpenChange,
  service,
}: ViewServiceDialogProps) {
  const serviceId = service ? String(service.id) : "";

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["service-details", serviceId],
    queryFn: () => getServiceByIdAction(serviceId),
    enabled: open && serviceId.length > 0,
    staleTime: 1000 * 60,
  });

  const hasError = data && !data.success;
  const serviceDetails =
    data && data.success ? (data as ApiResponse<IServicePayload>).data : null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] w-[95vw] max-w-6xl overflow-hidden p-0">
        <DialogHeader className="border-b px-6 py-5">
          <DialogTitle>Service Details</DialogTitle>
          <DialogDescription>
            Detailed information about the professional service offered.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(90vh-8rem)]">
          <div className="space-y-6 px-6 py-5">
            {(isLoading || isFetching) && (
              <div className="flex h-32 items-center justify-center rounded-md border border-dashed">
                <p className="text-sm text-muted-foreground animate-pulse">
                  Loading service details...
                </p>
              </div>
            )}

            {hasError && (
              <div className="rounded-md border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
                {data?.message || "Failed to load service details."}
              </div>
            )}

            {!isLoading && !isFetching && serviceDetails && (
              <div className="grid gap-6">
                <div className="flex flex-col gap-6 md:flex-row">
                  <div className="relative h-48 w-full overflow-hidden rounded-lg border bg-muted md:w-1/3">
                    {serviceDetails.imageUrl ? (
                      <Image
                        src={serviceDetails.imageUrl}
                        alt={serviceDetails.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
                        No Image Available
                      </div>
                    )}
                  </div>

                  <div className="flex-1 space-y-3">
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-bold text-primary">
                        {serviceDetails.name}
                      </h2>
                      <Badge
                        variant={
                          serviceDetails.isActive ? "default" : "destructive"
                        }
                      >
                        {serviceDetails.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm">
                      <div className="flex items-center gap-1.5">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold">
                          {serviceDetails.averageRating?.toFixed(1) || "0.0"}
                        </span>
                        <span className="text-muted-foreground">
                          ({serviceDetails.totalReviews} reviews)
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>
                          Created: {formatDateTime(serviceDetails.createdAt)}
                        </span>
                      </div>
                    </div>

                    <div className="rounded-lg bg-muted/50 p-3">
                      <h4 className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Description
                      </h4>
                      <p className="text-sm leading-relaxed">
                        {serviceDetails.description ||
                          "No description provided."}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <div className="rounded-lg border p-4 shadow-sm">
                    <div className="mb-2 flex items-center gap-2 text-primary">
                      <Activity className="h-4 w-4" />
                      <span className="text-sm font-semibold">
                        Availability
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Status:{" "}
                      <span
                        className={
                          serviceDetails.isActive
                            ? "text-green-600 font-medium"
                            : "text-red-500"
                        }
                      >
                        {serviceDetails.isActive
                          ? "Visible to customers"
                          : "Hidden from customers"}
                      </span>
                    </p>
                  </div>

                  <div className="rounded-lg border p-4 shadow-sm">
                    <div className="mb-2 flex items-center gap-2 text-primary">
                      <Info className="h-4 w-4" />
                      <span className="text-sm font-semibold">System Info</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      ID:{" "}
                      <code className="bg-muted px-1 rounded text-xs">
                        {serviceDetails.id.substring(0, 8)}...
                      </code>
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Total Requests:{" "}
                      {serviceDetails.serviceRequests?.length || 0}
                    </p>
                  </div>

                  <div className="rounded-lg border p-4 shadow-sm sm:col-span-2 lg:col-span-1">
                    <div className="mb-2 flex items-center gap-2 text-primary">
                      <Calendar className="h-4 w-4" />
                      <span className="text-sm font-semibold">
                        Last Updated
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {formatDateTime(serviceDetails.updatedAt)}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

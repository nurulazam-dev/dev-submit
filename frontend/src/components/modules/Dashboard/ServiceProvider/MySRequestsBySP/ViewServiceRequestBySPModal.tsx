"use client";

import { getServiceRequestByIdAction } from "@/actions/serviceRequest.action";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { ApiResponse } from "@/types/api.types";
import { IServiceRequestPayload } from "@/types/serviceRequest.type";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import {
  Clock,
  MapPin,
  Phone,
  User,
  AlertCircle,
  Receipt,
  Star,
  Wrench,
} from "lucide-react";

interface ViewServiceRequestBySPDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mySRequest: IServiceRequestPayload | null;
}

const formatDateTime = (value?: string | Date | null) => {
  if (!value) return "N/A";
  const dateValue = new Date(value);
  return isNaN(dateValue.getTime())
    ? "N/A"
    : format(dateValue, "MMM dd, yyyy hh:mm a");
};

export default function ViewServiceRequestBySPModal({
  open,
  onOpenChange,
  mySRequest,
}: ViewServiceRequestBySPDialogProps) {
  const serviceRequestId = mySRequest ? String(mySRequest.id) : "";

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["my-request-sp-details", serviceRequestId],
    queryFn: () => getServiceRequestByIdAction(serviceRequestId),
    enabled: open && serviceRequestId.length > 0,
    staleTime: 1000 * 60,
  });

  const hasError = data && !data.success;
  const details =
    data && data.success
      ? (data as ApiResponse<IServiceRequestPayload>).data
      : null;
  const isDeleted = details?.isDeleted;
  const status = details?.status;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[95vh] w-[95vw] lg:max-w-5xl p-0 overflow-hidden gap-0 border-none shadow-2xl">
        <DialogHeader className="px-8 py-6 bg-slate-50 dark:bg-slate-900 border-b">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <DialogTitle className="text-2xl font-black tracking-tight">
                Request Details
              </DialogTitle>
              <DialogDescription className="font-medium">
                Tracking ID:{" "}
                <span className="text-indigo-600 font-mono select-all">
                  #{serviceRequestId.slice(0, 8)}
                </span>
              </DialogDescription>
            </div>
            {details && (
              <div className="flex gap-2">
                <Badge
                  className={`font-semibold ${
                    isDeleted
                      ? "bg-red-100 text-red-700 hover:bg-red-100"
                      : status === "COMPLETED"
                        ? "bg-green-100 text-green-700 hover:bg-green-100"
                        : status === "PENDING"
                          ? "bg-blue-100 text-blue-700 hover:bg-blue-100"
                          : status === "CANCELLED"
                            ? "bg-red-100 text-red-700 hover:bg-red-100"
                            : "bg-slate-100 text-slate-700"
                  }`}
                >
                  {isDeleted ? "CANCELLED" : status}
                </Badge>
                <Badge
                  variant={
                    details.paymentStatus === "PAID" ? "default" : "outline"
                  }
                  className="px-4 py-1.5 rounded-full font-bold"
                >
                  {details.paymentStatus}
                </Badge>
              </div>
            )}
          </div>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(95vh-120px)] bg-white dark:bg-slate-950">
          <div className="p-8">
            {isLoading || isFetching ? (
              <div className="flex items-center justify-center py-20 animate-pulse flex-col gap-4">
                <div className="size-12 rounded-full border-4 border-indigo-600 border-t-transparent animate-spin" />
                <p className="text-sm font-bold text-slate-500 italic">
                  Fetching request details...
                </p>
              </div>
            ) : hasError ? (
              <div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-6 flex items-center gap-4 text-destructive">
                <AlertCircle className="size-8" />
                <p className="font-bold">
                  {data?.message || "Something went wrong!"}
                </p>
              </div>
            ) : (
              details && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                  <div className="lg:col-span-7 space-y-8">
                    <section>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-indigo-600 text-white rounded-lg">
                          <Wrench size={20} />
                        </div>
                        <h3 className="text-xl font-black text-slate-900 dark:text-white">
                          Service Overview
                        </h3>
                      </div>
                      <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-3xl border border-slate-100 dark:border-slate-800">
                        <h4 className="text-lg font-bold text-indigo-600 mb-2">
                          {details.service?.name || "Service Name N/A"}
                        </h4>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                          {details.serviceDescription ||
                            "No Service Request description provided."}
                        </p>
                      </div>
                    </section>

                    <section>
                      <h4 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                        <User className="size-5 text-indigo-500" /> Customer
                      </h4>
                      {details.customer ? (
                        <div className="flex items-center gap-4 p-4 rounded-2xl border border-indigo-100 bg-indigo-50/30">
                          <div className="size-12 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">
                            {details?.customer?.name?.charAt(0)}
                          </div>
                          <div>
                            <p className="font-black text-slate-900 dark:text-white">
                              {details?.customer?.name}
                            </p>
                            <p className="font-semibold text-slate-700 dark:text-slate-400">
                              {details?.customer?.email}
                            </p>
                            <p className="font-semibold text-slate-700 dark:text-slate-400">
                              {details?.customer?.phone}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="p-4 rounded-2xl border border-dashed text-center text-slate-400 font-medium">
                          Provider will be assigned after manager approval.
                        </div>
                      )}
                    </section>

                    {details.status === "COMPLETED" && details.review && (
                      <section className="p-6 rounded-3xl bg-amber-50 border border-amber-100">
                        <h4 className="font-bold text-amber-800 mb-3 flex items-center gap-2">
                          <Star className="size-5 fill-amber-500 text-amber-500" />{" "}
                          Your Review
                        </h4>
                        <p className="text-sm text-amber-900 italic">
                          &quot;{details.review.comment}&quot;
                        </p>
                      </section>
                    )}
                  </div>

                  <div className="lg:col-span-5 space-y-6">
                    <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 space-y-5">
                      <div className="flex items-start gap-4">
                        <MapPin className="size-5 text-slate-400 mt-1" />
                        <div>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                            Service Location
                          </p>
                          <p className="text-sm font-bold">
                            {details.serviceAddress}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <Phone className="size-5 text-slate-400 mt-1" />
                        <div>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                            Contact Phone
                          </p>
                          <p className="text-sm font-bold">
                            {details.activePhone}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <Clock className="size-5 text-slate-400 mt-1" />
                        <div>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                            Created At
                          </p>
                          <p className="text-sm font-bold">
                            {formatDateTime(details.createdAt)}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-indigo-600 rounded-3xl p-6 text-white shadow-xl shadow-indigo-500/20">
                      <h4 className="font-black text-sm uppercase tracking-widest mb-4 flex items-center gap-2">
                        <Receipt className="size-4" /> Billing Summary
                      </h4>
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="opacity-80">Service Charge</span>
                          <span className="font-bold">
                            ৳{details.costBreakdown?.serviceCharge || 0}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="opacity-80">Product Cost</span>
                          <span className="font-bold">
                            ৳{details.costBreakdown?.productCost || 0}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="opacity-80">Other Expenses</span>
                          <span className="font-bold">
                            ৳{details.costBreakdown?.additionalCost || 0}
                          </span>
                        </div>
                        <Separator className="bg-white/20" />
                        <div className="flex justify-between items-center pt-2">
                          <span className="text-lg font-black">
                            Total Payable
                          </span>
                          <span className="text-2xl font-black text-amber-400">
                            ৳{details.costBreakdown?.totalAmount || 0}
                          </span>
                        </div>
                      </div>
                    </div>

                    {details.status === "REJECTED" && (
                      <div className="p-4 rounded-2xl bg-destructive/10 border border-destructive/20 text-destructive text-sm italic">
                        <strong>Reason:</strong>{" "}
                        {details.rejectionReason ||
                          "No specific reason provided."}
                      </div>
                    )}
                  </div>
                </div>
              )
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

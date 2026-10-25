"use client";

import { getServiceScheduleByIdAction } from "@/actions/serviceSchedule.action";
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
import { IServiceSchedulePayload } from "@/types/schedule.type";
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
  Wrench,
  CalendarDays,
  Layers,
} from "lucide-react";

interface ViewMyScheduleModalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mySchedule: IServiceSchedulePayload | null;
}

const formatDateTime = (value?: string | Date | null) => {
  if (!value) return "N/A";
  const dateValue = new Date(value);
  return isNaN(dateValue.getTime()) ? "N/A" : format(dateValue, "MMM dd, yyyy");
};

export default function ViewMyScheduleModal({
  open,
  onOpenChange,
  mySchedule,
}: ViewMyScheduleModalDialogProps) {
  const myScheduleId = mySchedule ? String(mySchedule.id) : "";

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["my-schedule-details", myScheduleId],
    queryFn: () => getServiceScheduleByIdAction(myScheduleId),
    enabled: open && !!myScheduleId,
    staleTime: 1000 * 60,
  });

  const response = data as ApiResponse<IServiceRequestPayload>;
  const details = response?.success ? response.data : null;
  // const hasError = data && !response?.success;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] w-[95vw] lg:max-w-5xl p-0 overflow-hidden border-none shadow-2xl rounded-[2rem]">
        <DialogHeader className="px-8 py-6 bg-slate-50 dark:bg-slate-900/50 border-b">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <DialogTitle className="text-2xl font-black tracking-tight flex items-center gap-2">
                <CalendarDays className="text-indigo-600" />
                Schedule Slot Details
              </DialogTitle>
              <DialogDescription className="font-mono text-xs flex items-center gap-2">
                Slot ID:{" "}
                <span className="text-indigo-600 font-bold">
                  #{myScheduleId.slice(0, 8)}
                </span>
                <Badge variant="outline" className="text-[10px] h-5">
                  Slot {mySchedule?.slotNumber}
                </Badge>
              </DialogDescription>
            </div>

            <div className="flex gap-2">
              <Badge
                className={`px-4 py-1.5 rounded-full font-bold shadow-sm ${
                  mySchedule?.isBooked
                    ? "bg-rose-100 text-rose-700 hover:bg-rose-100"
                    : "bg-emerald-100 text-emerald-700 hover:bg-emerald-100"
                }`}
              >
                {mySchedule?.isBooked ? "BOOKED" : "AVAILABLE"}
              </Badge>

              {details && (
                <Badge className="bg-indigo-600 text-white px-4 py-1.5 rounded-full">
                  {details.status}
                </Badge>
              )}
            </div>
          </div>
        </DialogHeader>

        <ScrollArea className="h-full max-h-[calc(90vh-100px)] bg-white dark:bg-slate-950">
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
              <InfoCard
                icon={<CalendarDays className="text-indigo-500" />}
                label="Date"
                value={formatDateTime(mySchedule?.scheduleDate)}
              />
              <InfoCard
                icon={<Clock className="text-amber-500" />}
                label="Time Window"
                value={`${mySchedule?.startTime} - ${mySchedule?.endTime}`}
              />
              <InfoCard
                icon={<Layers className="text-emerald-500" />}
                label="Slot Position"
                value={`Slot Number ${mySchedule?.slotNumber}`}
              />
            </div>

            <Separator className="my-8 opacity-50" />

            {isLoading || isFetching ? (
              <div className="flex flex-col items-center justify-center py-10 gap-3">
                <div className="size-10 rounded-full border-4 border-indigo-600 border-t-transparent animate-spin" />
                <p className="text-sm font-bold text-slate-400">
                  Loading request data...
                </p>
              </div>
            ) : !mySchedule?.isBooked ? (
              <div className="text-center py-10 bg-slate-50 dark:bg-slate-900/40 rounded-3xl border border-dashed border-slate-200">
                <p className="text-slate-500 font-medium italic">
                  This slot is currently empty and available for booking.
                </p>
              </div>
            ) : details ? (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                <div className="lg:col-span-7 space-y-8">
                  <section>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-indigo-600 text-white rounded-lg shadow-lg">
                        <Wrench size={20} />
                      </div>
                      <h3 className="text-xl font-black">Service Details</h3>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-3xl border border-slate-100 dark:border-slate-800">
                      <h4 className="text-lg font-bold text-indigo-600 mb-2">
                        {details.service?.name}
                      </h4>
                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium italic">
                        &ldquo;
                        {details.serviceDescription ||
                          "No specific instructions."}
                        &rdquo;
                      </p>
                    </div>
                  </section>

                  <section>
                    <h4 className="font-bold mb-4 flex items-center gap-2">
                      <User className="size-5 text-indigo-500" /> Assigned
                      Specialist
                    </h4>
                    <div className="flex items-center gap-4 p-4 rounded-2xl border border-indigo-50/50 bg-indigo-50/20">
                      <div className="size-12 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-lg">
                        {details.provider?.user?.name?.charAt(0) || "P"}
                      </div>
                      <div>
                        <p className="font-black text-slate-900 dark:text-white">
                          {details.provider?.user?.name || "System Assigned"}
                        </p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                          Service Professional
                        </p>
                      </div>
                    </div>
                  </section>
                </div>

                <div className="lg:col-span-5 space-y-6">
                  <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 space-y-5">
                    <MetaItem
                      icon={<MapPin />}
                      label="Location"
                      value={details.serviceAddress}
                    />
                    <MetaItem
                      icon={<Phone />}
                      label="Contact"
                      value={details.activePhone}
                    />
                  </div>

                  <div className="bg-indigo-600 rounded-3xl p-6 text-white shadow-xl shadow-indigo-500/20 relative overflow-hidden">
                    <Receipt className="absolute -bottom-4 -right-4 size-24 opacity-10" />
                    <h4 className="font-black text-xs uppercase tracking-widest mb-4 flex items-center gap-2">
                      <Receipt className="size-4" /> Billing Summary
                    </h4>
                    <div className="space-y-3 relative z-10">
                      {/* <PriceRow label="Service Charge" value={details.costBreakdown?.serviceCharge || 0} />
                      <PriceRow label="Product/Parts" value={details.costBreakdown?.productCost || 0} /> */}
                      <Separator className="bg-white/20" />
                      <div className="flex justify-between items-center pt-2">
                        <span className="text-lg font-black">Total</span>
                        <span className="text-2xl font-black text-amber-300">
                          ৳{details.costBreakdown?.totalAmount || 0}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3 p-6 bg-amber-50 rounded-2xl border border-amber-100 text-amber-700">
                <AlertCircle />
                <p className="font-bold">
                  Request details not found for this booked slot.
                </p>
              </div>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

function InfoCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="bg-slate-50 dark:bg-slate-900/40 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center gap-4">
      <div className="p-2 bg-white dark:bg-slate-800 rounded-xl shadow-sm">
        {icon}
      </div>
      <div>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
          {label}
        </p>
        <p className="text-sm font-bold text-slate-900 dark:text-slate-100">
          {value}
        </p>
      </div>
    </div>
  );
}

function MetaItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value?: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="mt-1 text-slate-400">{icon}</div>
      <div>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
          {label}
        </p>
        <p className="text-sm font-bold leading-tight">{value || "N/A"}</p>
      </div>
    </div>
  );
}

/* function PriceRow({ label, value }: { label: string; value?: number }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="opacity-80">{label}</span>
      <span className="font-bold">৳{value || 0}</span>
    </div>
  );
} */

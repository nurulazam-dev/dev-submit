"use client";

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
import { IPaymentPayload } from "@/types/payment.type";
import { format } from "date-fns";
import {
  Clock,
  MapPin,
  FileText,
  ExternalLink,
  Calendar,
  User,
  ShieldCheck,
  Receipt,
  Info,
} from "lucide-react";
import Link from "next/link";

interface ViewPaymentByIdDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  payment: IPaymentPayload | null;
}

const formatDateTime = (value?: string | Date | null) => {
  if (!value) return "N/A";
  const dateValue = new Date(value);
  return isNaN(dateValue.getTime())
    ? "N/A"
    : format(dateValue, "MMM dd, yyyy hh:mm a");
};

export default function ViewPaymentByIdModal({
  open,
  onOpenChange,
  payment: details,
}: ViewPaymentByIdDialogProps) {
  if (!details) return null;

  const status = details.status;
  const breakdown = details.serviceRequest?.costBreakdown;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] w-[95vw] lg:max-w-5xl p-0 overflow-hidden border-none shadow-2xl rounded-lg">
        <DialogHeader className="px-8 py-8 bg-slate-50 dark:bg-slate-900 border-b">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <DialogTitle className="text-2xl font-black">
                Payment Confirmation
              </DialogTitle>
              <DialogDescription className="font-medium flex items-center gap-2 mt-1">
                Transaction ID:
                <span className="text-indigo-600 font-mono bg-indigo-50 dark:bg-indigo-900/30 px-2 py-0.5 rounded">
                  {details.transactionId}
                </span>
              </DialogDescription>
            </div>
            <Badge
              className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider ${
                status === "PAID"
                  ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100"
                  : "bg-amber-100 text-amber-700 hover:bg-amber-100"
              }`}
            >
              {status}
            </Badge>
          </div>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(90vh-100px)] bg-white dark:bg-slate-950">
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-7 space-y-6">
                <section>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-indigo-600 text-white rounded-xl">
                      <ShieldCheck size={20} />
                    </div>
                    <h3 className="text-xl font-black uppercase tracking-tight">
                      Service Details
                    </h3>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-[2rem] border border-slate-100">
                    <h4 className="text-xl font-bold text-indigo-600 mb-3">
                      {details.serviceRequest?.service?.name}
                    </h4>
                    <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                      <div className="flex items-center gap-2 text-slate-500">
                        <MapPin size={14} />{" "}
                        {details.serviceRequest?.serviceAddress}
                      </div>
                      <div className="flex items-center gap-2 text-slate-500">
                        <User size={14} />{" "}
                        {details.serviceRequest?.customer?.name}
                      </div>
                    </div>
                    <Separator className="my-4" />
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {details.serviceRequest?.serviceDescription}
                    </p>
                  </div>
                </section>

                <section>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-amber-500 text-white rounded-xl">
                      <Receipt size={20} />
                    </div>
                    <h3 className="text-xl font-black uppercase tracking-tight">
                      Cost Breakdown
                    </h3>
                  </div>
                  <div className="p-6 rounded-[2rem] border border-slate-200 space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Service Charge</span>
                      <span className="font-semibold">
                        {breakdown?.serviceCharge} BDT
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Product Cost</span>
                      <span className="font-semibold">
                        {breakdown?.productCost} BDT
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Additional Cost</span>
                      <span className="font-semibold">
                        {breakdown?.additionalCost} BDT
                      </span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-lg font-black text-indigo-600">
                      <span>Total Paid</span>
                      <span>{breakdown?.totalAmount} BDT</span>
                    </div>
                  </div>
                </section>
              </div>

              <div className="lg:col-span-5 space-y-6">
                <div className="bg-slate-900 text-white rounded-[2rem] p-6 shadow-xl">
                  <h4 className="font-black text-xs uppercase tracking-[0.2em] mb-6 text-indigo-400">
                    Payment Timeline
                  </h4>
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-white/10 rounded-lg">
                        <Calendar size={18} className="text-indigo-300" />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase font-bold text-slate-400">
                          Paid At
                        </p>
                        <p className="text-sm font-bold">
                          {formatDateTime(details.createdAt)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-white/10 rounded-lg">
                        <Clock size={18} className="text-rose-300" />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase font-bold text-slate-400">
                          Last Updated
                        </p>
                        <p className="text-sm font-bold">
                          {formatDateTime(details.updatedAt)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 rounded-[2rem] p-6 text-center">
                  <div className="size-16 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <FileText size={32} className="text-indigo-600" />
                  </div>
                  <h5 className="font-bold text-slate-400  mb-1">
                    Official Invoice
                  </h5>
                  <p className="text-xs text-slate-500 mb-6">
                    Download your payment receipt as PDF
                  </p>

                  <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-xl h-12 transition-all">
                    {details.invoiceUrl ? (
                      <Link
                        href={details.invoiceUrl}
                        target="_blank"
                        className="flex justify-center items-center"
                      >
                        View Invoice <ExternalLink size={16} className="ml-2" />
                      </Link>
                    ) : (
                      "Invoice Pending"
                    )}
                  </button>
                </div>

                <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100 flex gap-3">
                  <Info size={20} className="text-blue-600 shrink-0 mt-0.5" />
                  <p className="text-[11px] text-blue-800 font-medium">
                    This is a secure payment processed via Stripe. Please keep
                    the Transaction ID for future support requests.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

"use client";

import DateCell from "@/components/shared/cell/DateCell";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { FileText, CreditCard, ExternalLink, Hash, Mail } from "lucide-react";
import { IPaymentPayload } from "@/types/payment.type";

export const allPaymentsColumns: ColumnDef<IPaymentPayload>[] = [
  {
    accessorKey: "serviceRequest.customer.name",
    header: "Customer Details",
    cell: ({ row }) => {
      const customerName = row.original.serviceRequest?.customer?.name || "N/A";
      const customerEmail =
        row.original.serviceRequest?.customer?.email || "N/A";

      return (
        <div className="flex flex-col gap-1 min-w-44">
          <span className="font-bold text-slate-900 dark:text-white leading-none">
            {customerName}
          </span>
          <span className="flex items-center gap-1 text-[11px] text-muted-foreground truncate">
            <Mail size={12} className="shrink-0" /> {customerEmail}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "serviceRequest.service.name",
    header: "Service Details",
    cell: ({ row }) => {
      const serviceName = row.original.serviceRequest?.service?.name || "N/A";
      const serviceId = row.original.serviceRequest?.service?.id || "N/A";

      return (
        <div className="flex flex-col gap-1 min-w-44">
          <span className="font-bold text-slate-900 dark:text-white leading-none">
            {serviceName}
          </span>
          <span className="flex items-center gap-1 text-[11px] text-muted-foreground uppercase">
            <Hash size={12} className="shrink-0" /> {serviceId.slice(0, 18)}...
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "transactionId",
    header: "Transaction ID",
    cell: ({ row }) => (
      <div className="flex items-center text-[11px] text-slate-600 bg-slate-100 dark:bg-slate-800 dark:text-slate-400 p-1 uppercase rounded w-fit">
        {row.original.transactionId}
      </div>
    ),
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => (
      <div className="flex items-center gap-1 font-bold text-indigo-600 dark:text-indigo-400">
        <CreditCard size={14} />
        {row.original.amount} BDT
      </div>
    ),
  },
  {
    accessorKey: "invoiceUrl",
    header: "Invoice",
    cell: ({ row }) => {
      const url = row.original.invoiceUrl;

      if (!url) {
        return <span className="text-slate-400 italic text-xs">N/A</span>;
      }

      return (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-semibold text-xs transition-colors"
        >
          <FileText size={14} />
          View PDF
          <ExternalLink size={12} />
        </a>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;

      const statusConfig: Record<string, string> = {
        PENDING:
          "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400",
        PAID: "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400",
        UNPAID:
          "bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-400",
        FAILED:
          "bg-rose-100 text-rose-700 border-rose-200 dark:bg-rose-900/30 dark:text-rose-400",
      };

      return (
        <Badge
          variant="outline"
          className={`font-bold tracking-tight uppercase text-[10px] px-2 py-0.5 rounded-md ${statusConfig[status] || "bg-blue-100 text-blue-700"}`}
        >
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => (
      <div className="text-xs font-medium text-slate-500">
        <DateCell date={row.original.createdAt} formatString="MMM dd, yyyy" />
      </div>
    ),
  },
];

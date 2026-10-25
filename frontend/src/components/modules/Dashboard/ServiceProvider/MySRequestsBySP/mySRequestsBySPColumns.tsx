import { Badge } from "@/components/ui/badge";
import { IServiceRequestPayload } from "@/types/serviceRequest.type";
import { ColumnDef } from "@tanstack/react-table";
import {
  CreditCard,
  User,
  Mail,
  StarHalf,
  PhoneCall,
  Calendar,
  ShieldQuestionMark,
} from "lucide-react";
import { format } from "date-fns";

export const mySRequestsBySPColumns: ColumnDef<IServiceRequestPayload>[] = [
  {
    id: "id",
    accessorKey: "id",
    header: "SR No",
    cell: ({ row }) => (
      <span className="font-mono text-xs font-semibold uppercase text-slate-500">
        #{row.original.id.slice(-6)}
      </span>
    ),
  },
  {
    id: "service",
    accessorKey: "service",
    header: "Service Details",
    cell: ({ row }) => {
      const { service, status, isDeleted } = row.original;

      let badgeClass = "bg-slate-100 text-slate-700";

      if (isDeleted || status === "CANCELLED" || status === "REJECTED") {
        badgeClass = "bg-red-100 text-red-700 hover:bg-red-200";
      } else if (status === "COMPLETED") {
        badgeClass = "bg-green-100 text-green-700 hover:bg-green-200";
      } else if (status === "ACCEPTED") {
        badgeClass = "bg-blue-100 text-blue-700 hover:bg-blue-200";
      } else if (status === "PENDING") {
        badgeClass = "bg-amber-100 text-amber-700 hover:bg-amber-200";
      }

      return (
        <div className="flex flex-col gap-1">
          <span className="font-bold text-sm text-primary line-clamp-1">
            {service?.name || "Service Requested"}
          </span>
          <div className="flex items-center">
            <Badge
              className={`font-semibold border-none text-[10px] h-4 ${badgeClass}`}
            >
              {isDeleted ? "CANCELLED" : status}
            </Badge>
          </div>
        </div>
      );
    },
  },
  {
    id: "customer",
    accessorKey: "customer",
    header: "Customer",
    cell: ({ row }) => {
      const customer = row.original.customer;
      const customerStatus = customer?.isDeleted ? "DELETED" : "ACTIVE";

      return (
        <div className="flex flex-col gap-1">
          {customer ? (
            <>
              <div className="flex items-center gap-2 text-sm">
                <User className="size-3.5 text-slate-400" />
                <span className="font-medium">{customer.name}</span>
              </div>
              <div className="flex items-center gap-1">
                <ShieldQuestionMark className="size-3.5 text-slate-400" />

                <Badge
                  variant="outline"
                  className={`text-[10px] h-4 ${
                    customer.isDeleted
                      ? "text-red-600 border-red-200 bg-red-50"
                      : "text-green-600 border-green-200 bg-green-50"
                  }`}
                >
                  {customerStatus}
                </Badge>
              </div>
            </>
          ) : (
            <span className="text-xs text-muted-foreground">Guest User</span>
          )}
        </div>
      );
    },
  },
  {
    id: "contact",
    accessorKey: "contact",
    header: "Contact Info",
    cell: ({ row }) => {
      const { customer, activePhone } = row.original;
      return (
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Mail className="size-3 text-slate-400" />
            <span className="truncate max-w-[150px]">
              {customer?.email || "N/A"}
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs font-medium">
            <PhoneCall className="size-3 text-slate-400" />
            <span>{activePhone || customer?.phone || "N/A"}</span>
          </div>
        </div>
      );
    },
  },
  {
    id: "schedule",
    header: "Schedule",
    cell: ({ row }) => {
      const schedule = row.original.schedule;
      return (
        <div className="flex flex-col text-xs gap-1">
          {schedule ? (
            <>
              <div className="flex items-center gap-1.5 font-medium">
                <Calendar className="size-3 text-primary" />
                {format(new Date(schedule.scheduleDate), "dd MMM, yy")}
              </div>
              <div className="text-muted-foreground ml-4">
                {schedule.startTime} - {schedule.endTime}
              </div>
            </>
          ) : (
            <span className="text-muted-foreground">Not Scheduled</span>
          )}
        </div>
      );
    },
  },
  {
    id: "cost",
    accessorKey: "costBreakdown",
    header: "Total Cost",
    cell: ({ row }) => {
      const total = row.original.costBreakdown?.totalAmount || 0;
      return (
        <div className="text-sm font-bold text-slate-900 dark:text-slate-100">
          ৳{total.toLocaleString()}
        </div>
      );
    },
  },
  {
    id: "paymentStatus",
    accessorKey: "paymentStatus",
    header: "Payment",
    cell: ({ row }) => {
      const isPaid = row.original.paymentStatus === "PAID";
      return (
        <Badge
          variant="outline"
          className={`text-[10px] font-semibold uppercase ${
            isPaid
              ? "bg-emerald-50 text-emerald-600 border-emerald-200"
              : "bg-amber-50 text-amber-600 border-amber-200"
          }`}
        >
          <CreditCard className="size-3 mr-1" />
          {row.original.paymentStatus}
        </Badge>
      );
    },
  },
  {
    id: "review",
    accessorKey: "review",
    header: "Rating",
    cell: ({ row }) => {
      const rating = row.original.review?.rating;
      return (
        <div className="flex items-center gap-1.5 text-sm font-semibold">
          <StarHalf
            className={`size-3.5 ${rating ? "text-orange-500 fill-orange-500" : "text-muted-foreground"}`}
          />
          <span>{rating ? rating.toFixed(1) : "N/A"}</span>
        </div>
      );
    },
  },
];

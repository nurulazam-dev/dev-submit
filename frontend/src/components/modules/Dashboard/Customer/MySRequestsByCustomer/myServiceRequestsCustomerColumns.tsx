import DateCell from "@/components/shared/cell/DateCell";
import { Badge } from "@/components/ui/badge";
import { IServiceRequestPayload } from "@/types/serviceRequest.type";
import { ColumnDef } from "@tanstack/react-table";
import { CreditCard, User, Mail, StarHalf } from "lucide-react";

export const myServiceRequestsCustomerColumns: ColumnDef<IServiceRequestPayload>[] =
  [
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
        const service = row.original.service;
        const status = row.original.status;
        const isDeleted = row.original.isDeleted;
        return (
          <div className="flex flex-col gap-1">
            <span className="font-bold text-sm text-primary line-clamp-1">
              {service?.name || "Service Requested"}
            </span>
            <div className="flex items-center">
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
            </div>
          </div>
        );
      },
    },
    {
      id: "provider",
      accessorKey: "provider",
      header: "Provider",
      cell: ({ row }) => {
        const provider = row.original.provider;
        return (
          <>
            {provider ? (
              <div>
                <div className="flex items-center gap-2 text-sm">
                  <User className="size-3.5 text-slate-400" />
                  <span className="font-medium">{provider.user?.name}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="size-3.5 text-slate-400" />
                  <span className="font-medium">{provider.user?.email}</span>
                </div>
              </div>
            ) : (
              "Pending Assignment"
            )}
          </>
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
      cell: ({ row }) => (
        <Badge
          variant="outline"
          className={`text-[10px] font-bold uppercase ${
            row.original.paymentStatus === "PAID"
              ? "bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-500/10"
              : "bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-500/10"
          }`}
        >
          <CreditCard className="size-3 mr-1" />
          {row.original.paymentStatus}
        </Badge>
      ),
    },
    {
      id: "review",
      accessorKey: "review",
      header: "Review",
      cell: ({ row }) => (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <StarHalf className="size-3.5" />
          <span>{row.original.review?.rating || "N/A"}</span>
        </div>
      ),
    },
    {
      id: "createdAt",
      accessorKey: "createdAt",
      header: "Requested On",
      cell: ({ row }) => (
        <DateCell date={row.original.createdAt} formatString="MMM dd, yyyy" />
      ),
    },
  ];

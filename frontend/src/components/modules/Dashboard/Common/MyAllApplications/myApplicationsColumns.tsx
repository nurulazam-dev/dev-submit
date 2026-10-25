"use client";

import DateCell from "@/components/shared/cell/DateCell";
import { IJobApplicationPayload } from "@/types/jobApplication.type";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { FileText, MapPin, Banknote, ExternalLink } from "lucide-react";

export const myApplicationsColumns: ColumnDef<IJobApplicationPayload>[] = [
  {
    accessorKey: "jobPost.title",
    header: "Job Details",
    cell: ({ row }) => {
      const job = row.original.jobPost;
      return (
        <div className="flex flex-col gap-1 min-w-50">
          <span className="font-bold text-slate-900 dark:text-white leading-none">
            {job?.title || "Untitled Position"}
          </span>
          <div className="flex items-center gap-3 mt-1">
            <span className="flex items-center gap-1 text-[11px] text-muted-foreground italic">
              <MapPin size={12} /> {job?.location}
            </span>
            <span className="flex items-center gap-1 text-[11px] text-indigo-600 font-medium">
              <Banknote size={12} /> {job?.salaryRange}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "jobPost.serviceType",
    header: "Category",
    cell: ({ row }) => (
      <Badge variant="outline" className="bg-slate-600 font-medium">
        {row.original.jobPost?.serviceType}
      </Badge>
    ),
  },
  {
    accessorKey: "cvUrl",
    header: "Documents",
    cell: ({ row }) => (
      <a
        href={row.original.cvUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-800 font-semibold text-xs transition-colors"
      >
        <FileText size={14} />
        View CV
        <ExternalLink size={12} />
      </a>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      const statusConfig: Record<string, string> = {
        PENDING: "bg-amber-100 text-amber-700 border-amber-200",
        ACCEPTED: "bg-emerald-100 text-emerald-700 border-emerald-200",
        REJECTED: "bg-rose-100 text-rose-700 border-rose-200",
      };

      return (
        <Badge
          className={`font-black tracking-tighter uppercase text-[10px] ${statusConfig[status] || "bg-green-100"}`}
        >
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Applied Date",
    cell: ({ row }) => (
      <div className="text-xs font-medium text-slate-500">
        <DateCell date={row.original.createdAt} formatString="MMM dd, yyyy" />
      </div>
    ),
  },
  {
    id: "feedback",
    header: "Feedback",
    cell: ({ row }) => (
      <span className="text-xs text-muted-foreground italic">
        {row.original.feedback || "No feedback yet"}
      </span>
    ),
  },
];

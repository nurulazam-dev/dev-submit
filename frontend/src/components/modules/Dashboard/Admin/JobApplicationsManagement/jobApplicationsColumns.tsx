import DateCell from "@/components/shared/cell/DateCell";
import { Badge } from "@/components/ui/badge";
import { IJobApplicationPayload } from "@/types/jobApplication.type";
import { ColumnDef } from "@tanstack/react-table";
import {
  ExternalLink,
  FileText,
  MailCheck,
  MailWarning,
  ShieldCheck,
  ShieldAlert,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const jobApplicationsColumns: ColumnDef<IJobApplicationPayload>[] = [
  {
    id: "applicant",
    header: "Applicant",
    cell: ({ row }) => {
      const user = row.original.user;
      return (
        <div className="flex items-center gap-3">
          <Avatar className="size-8">
            <AvatarImage src={user?.image || ""} alt={user?.name} />
            <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-medium text-sm leading-none flex items-center gap-1">
              {user?.name || "Unknown User"}
              {user &&
                (user.status === "ACTIVE" ? (
                  <ShieldCheck className="size-3 text-emerald-600" />
                ) : (
                  <ShieldAlert className="size-3 text-rose-600" />
                ))}
            </span>
            <span className="text-xs text-muted-foreground mt-1.5 flex items-center gap-1">
              {user?.emailVerified ? (
                <MailCheck className="size-3 text-blue-600" />
              ) : (
                <MailWarning className="size-3 text-amber-500" />
              )}
              <span className="truncate max-w-37.5">{user?.email}</span>
            </span>
          </div>
        </div>
      );
    },
  },

  {
    id: "phone",
    header: "Contact No",
    cell: ({ row }) => (
      <span className="text-sm font-medium text-slate-300">
        {row.original.user?.phone || "N/A"}
      </span>
    ),
  },

  {
    id: "jobTitle",
    header: "Job Post",
    cell: ({ row }) => {
      const jobPost = row.original.jobPost;
      return (
        <>
          {jobPost ? (
            <div className="flex flex-col gap-1">
              <span className="font-semibold text-sm text-primary line-clamp-1">
                {jobPost?.title}
              </span>
              <div className="flex items-center gap-2 text-[10px] text-muted-foreground uppercase tracking-wider">
                <span className="bg-slate-100 px-1.5 py-0.5 rounded">
                  {jobPost?.serviceType}
                </span>
                <span>•</span>
                <span>{jobPost?.location || "Remote"}</span>
              </div>
            </div>
          ) : (
            <div>
              <span className="text-slate-400">N/A</span>
            </div>
          )}
        </>
      );
    },
  },

  {
    id: "cvUrl",
    header: "CV / Resume",
    cell: ({ row }) => (
      <a
        href={row.original.cvUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 text-sm text-blue-600 hover:underline font-medium"
      >
        <FileText className="size-4" />
        <span>View CV</span>
        <ExternalLink className="size-3" />
      </a>
    ),
  },

  {
    id: "status",
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const statusValue = row.original.status;

      const statusStyles = {
        PENDING:
          "bg-amber-100 text-amber-700 hover:bg-amber-100 border-amber-200",
        ACCEPTED:
          "bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-emerald-200",
        REJECTED: "bg-rose-100 text-rose-700 hover:bg-rose-100 border-rose-200",
      };

      return (
        <Badge
          variant="outline"
          className={`${statusStyles[statusValue as keyof typeof statusStyles]} font-bold capitalize`}
        >
          {statusValue.toLowerCase()}
        </Badge>
      );
    },
  },

  /*  {
    id: "salaryRange",
    header: "Salary",
    cell: ({ row }) => (
      <span className="text-sm font-medium text-slate-700">
        {row.original.jobPost?.salaryRange || "Negotiable"}
      </span>
    ),
  }, */

  {
    id: "deadline",
    header: "Deadline",
    cell: ({ row }) => {
      const deadline = row.original.jobPost?.deadline;
      return (
        <>
          {deadline ? (
            <DateCell date={deadline} formatString="mm-dd-yy" />
          ) : (
            <div>
              <span className="text-slate-400">N/A</span>
            </div>
          )}
        </>
      );
    },
  },

  {
    id: "createdAt",
    header: "Applied Date",
    cell: ({ row }) => (
      // <DateCell date={row.original.createdAt} formatString="MMM dd, yyyy" />
      <DateCell date={row.original.createdAt} formatString="mm-dd-yy" />
    ),
  },

  {
    id: "feedback",
    header: "Feedback",
    cell: ({ row }) => (
      <span className="text-xs text-muted-foreground italic truncate max-w-37.5 block">
        {row.original.feedback?.slice(0, 40) || (
          <p className="text-yellow-600">No feedback provided</p>
        )}
      </span>
    ),
  },
];

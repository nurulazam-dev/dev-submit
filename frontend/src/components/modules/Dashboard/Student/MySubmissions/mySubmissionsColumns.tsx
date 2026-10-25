import DateCell from "@/components/shared/cell/DateCell";
import { Badge } from "@/components/ui/badge";
// import type {
//   SubmissionStatus,
// } from "@/types/submission.type";
// import type { ColumnDef, StockFeatures } from "@tanstack/react-table";
import type {
  ISubmissionPayload,
  SubmissionStatus,
} from "@/types/submission.type";
import type { ColumnDef, StockFeatures } from "@tanstack/react-table";
import type { LucideIcon } from "lucide-react";
import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  ExternalLink,
  FileCode2,
  FolderGit2,
  MessageSquareText,
  XCircle,
} from "lucide-react";
import Link from "next/link";

const statusConfig: Record<
  SubmissionStatus,
  {
    label: string;
    className: string;
    icon: LucideIcon;
  }
> = {
  PENDING: {
    label: "Pending",
    className:
      "border-amber-500/20 bg-amber-500/10 text-amber-600 dark:text-amber-400",
    icon: Clock3,
  },
  APPROVED: {
    label: "Approved",
    className:
      "border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    icon: CheckCircle2,
  },
  REJECTED: {
    label: "Rejected",
    className: "border-red-500/20 bg-red-500/10 text-red-600 dark:text-red-400",
    icon: XCircle,
  },
};

export const mySubmissionsColumns: ColumnDef<
  StockFeatures,
  ISubmissionPayload
>[] = [
  {
    id: "id",
    accessorKey: "id",
    header: "Submission",
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-primary/10 bg-primary/5 text-primary">
          <FileCode2 className="size-5" />
        </div>

        <div className="flex min-w-0 flex-col gap-1">
          <span className="font-mono text-xs font-semibold text-muted-foreground">
            #{row.original.id.slice(-6).toUpperCase()}
          </span>
          <span className="text-xs text-muted-foreground">
            Project submission
          </span>
        </div>
      </div>
    ),
  },
  {
    id: "title",
    accessorKey: "title",
    header: "Project Details",
    cell: ({ row }) => {
      const { title, description, githubUrl, liveUrl } = row.original;

      return (
        <div className="flex min-w-50 max-w-85 flex-col gap-2 py-1">
          <span className="line-clamp-1 text-sm font-semibold text-foreground">
            {title || "Untitled project"}
          </span>

          <p className="line-clamp-2 text-xs leading-5 text-muted-foreground">
            {description || "No project description provided."}
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            {githubUrl && (
              <Link
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${title} source code on GitHub`}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                <FolderGit2 className="size-3.5" />
                Source
                <ExternalLink className="size-3" />
              </Link>
            )}

            {liveUrl && (
              <Link
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View live demo of ${title}`}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                <ExternalLink className="size-3.5" />
                Live Demo
              </Link>
            )}
          </div>
        </div>
      );
    },
  },
  {
    id: "status",
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      const config = statusConfig[status];
      const StatusIcon = config.icon;

      return (
        <Badge
          variant="outline"
          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${config.className}`}
        >
          <StatusIcon className="size-3.5" />
          {config.label}
        </Badge>
      );
    },
  },
  {
    id: "review",
    accessorKey: "review",
    header: "Review & Feedback",
    cell: ({ row }) => {
      const review = row.original.review;

      if (!review) {
        return (
          <div className="flex min-w-37.5 items-center gap-2 text-muted-foreground">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted">
              <MessageSquareText className="size-4" />
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-xs font-medium text-foreground">
                No feedback yet
              </span>
              <span className="text-xs">Awaiting review</span>
            </div>
          </div>
        );
      }

      const isCompleted = review.status === "COMPLETED";

      return (
        <div className="flex min-w-42.5 max-w-70 items-start gap-2.5">
          <div
            className={`mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg ${
              isCompleted
                ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                : "bg-blue-500/10 text-blue-600 dark:text-blue-400"
            }`}
          >
            <MessageSquareText className="size-4" />
          </div>

          <div className="flex min-w-0 flex-col gap-1.5">
            <Badge
              variant="outline"
              className={`w-fit rounded-full text-[10px] ${
                isCompleted
                  ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                  : "border-blue-500/20 bg-blue-500/10 text-blue-600 dark:text-blue-400"
              }`}
            >
              {isCompleted ? "Review completed" : "In progress"}
            </Badge>

            <p
              title={review.feedback}
              className="line-clamp-2 text-xs leading-5 text-muted-foreground"
            >
              {review.feedback || "No feedback details provided."}
            </p>
          </div>
        </div>
      );
    },
  },
  {
    id: "createdAt",
    accessorKey: "createdAt",
    header: () => (
      <div className="flex items-center gap-2">
        <CalendarDays className="size-4" />
        Submitted On
      </div>
    ),
    cell: ({ row }) => (
      <div className="whitespace-nowrap">
        <DateCell date={row.original.createdAt} formatString="MMM dd, yyyy" />
      </div>
    ),
  },
];

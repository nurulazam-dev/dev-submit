"use client";

import { getSubmissionByIdAction } from "@/actions/submission.action";
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
import { ISubmissionPayload, SubmissionStatus } from "@/types/submission.type";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import {
  AlertCircle,
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Code2,
  FileCode2,
  GitBranch,
  Globe,
  LoaderCircle,
  MessageSquareText,
  UserRound,
  XCircle,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";

interface ViewSubmissionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mySubmission: ISubmissionPayload | null;
}

interface StatusConfig {
  label: string;
  className: string;
  icon: LucideIcon;
}

const statusConfig: Record<SubmissionStatus, StatusConfig> = {
  PENDING: {
    label: "Pending Review",
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

const formatDateTime = (value?: string | Date | null): string => {
  if (!value) return "N/A";

  const date = new Date(value);

  return Number.isNaN(date.getTime())
    ? "N/A"
    : format(date, "MMM dd, yyyy 'at' hh:mm a");
};

export default function ViewSubmissionModal({
  open,
  onOpenChange,
  mySubmission,
}: ViewSubmissionDialogProps) {
  const mySubmissionId = mySubmission?.id ?? "";

  const { data, isLoading, isFetching, isError, error, refetch } = useQuery({
    queryKey: ["my-submission-details", mySubmissionId],
    queryFn: () => getSubmissionByIdAction(mySubmissionId),
    enabled: open && mySubmissionId.length > 0,
    staleTime: 1000 * 60,
  });

  const hasError = isError || (Boolean(data) && !data?.success);

  const details =
    data && data.success
      ? (data as ApiResponse<ISubmissionPayload>).data
      : null;

  const status = details?.status;
  const currentStatus = status ? statusConfig[status] : null;
  const StatusIcon = currentStatus?.icon;

  const review = details?.review;
  const reviewCompleted = review?.status === "COMPLETED";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[92vh] w-[calc(100%-1rem)] max-w-8xl flex-col gap-0 overflow-hidden rounded-2xl border-border bg-background p-0 shadow-2xl sm:w-[calc(100%-2rem)]">
        {/* Header */}
        <DialogHeader className="shrink-0 border-b border-border bg-muted/30 px-5 py-5 sm:px-7">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                <Code2 className="size-4" />
                Dev Submit
              </div>

              <DialogTitle className="text-xl font-bold tracking-tight sm:text-2xl">
                Submission Details
              </DialogTitle>

              <DialogDescription className="mt-1 text-sm">
                Review your project information and feedback.
              </DialogDescription>

              <p className="mt-3 font-mono text-xs text-muted-foreground">
                Submission ID:{" "}
                <span className="select-all font-semibold text-foreground">
                  #{mySubmissionId.slice(-8).toUpperCase() || "N/A"}
                </span>
              </p>
            </div>

            {currentStatus && StatusIcon && (
              <Badge
                variant="outline"
                className={`w-fit shrink-0 gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${currentStatus.className}`}
              >
                <StatusIcon className="size-3.5" />
                {currentStatus.label}
              </Badge>
            )}
          </div>
        </DialogHeader>

        {/* Content */}
        <ScrollArea className="min-h-0 flex-1">
          <div className="p-5 sm:p-7">
            {isLoading || (isFetching && !details) ? (
              <div className="flex flex-col items-center justify-center gap-4 py-20">
                <LoaderCircle className="size-10 animate-spin text-primary" />
                <div className="text-center">
                  <p className="font-semibold text-foreground">
                    Loading submission...
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Please wait while we fetch your project details.
                  </p>
                </div>
              </div>
            ) : hasError ? (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-destructive/20 bg-destructive/5 px-5 py-12 text-center">
                <div className="flex size-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                  <AlertCircle className="size-6" />
                </div>

                <h3 className="mt-4 font-semibold text-foreground">
                  Unable to load submission
                </h3>

                <p className="mt-2 max-w-md text-sm text-muted-foreground">
                  {data && !data.success
                    ? data.message || "Something went wrong."
                    : error instanceof Error
                      ? error.message
                      : "Please check your connection and try again."}
                </p>

                <button
                  type="button"
                  onClick={() => void refetch()}
                  className="mt-5 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
                >
                  Try Again
                </button>
              </div>
            ) : !details ? (
              <div className="py-16 text-center">
                <FileCode2 className="mx-auto size-10 text-muted-foreground" />
                <h3 className="mt-4 font-semibold">Submission not found</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  We could not find the requested submission.
                </p>
              </div>
            ) : (
              <div className="space-y-7">
                {/* Project overview */}
                <section>
                  <SectionHeading
                    icon={FileCode2}
                    title="Project Overview"
                    description="Your project details and description."
                  />

                  <div className="mt-4 rounded-2xl border border-border bg-card p-5 sm:p-6">
                    <div className="flex items-start gap-3">
                      <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <Code2 className="size-5" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <h3 className="wrap-break-word text-lg font-bold text-foreground sm:text-xl">
                          {details.title || "Untitled project"}
                        </h3>

                        <p className="mt-3 whitespace-pre-wrap wrap-break-word text-sm leading-7 text-muted-foreground">
                          {details.description ||
                            "No project description provided."}
                        </p>
                      </div>
                    </div>

                    <Separator className="my-5" />

                    <div className="grid gap-3 sm:grid-cols-2">
                      <ProjectLink
                        href={details.githubUrl}
                        icon={GitBranch}
                        title="Source Code"
                        description="View repository on GitHub"
                      />

                      <ProjectLink
                        href={details.liveUrl}
                        icon={Globe}
                        title="Live Demo"
                        description="Explore the live project"
                      />
                    </div>
                  </div>
                </section>

                {/* Submission information */}
                <section>
                  <SectionHeading
                    icon={CalendarDays}
                    title="Submission Information"
                    description="Track your submission and its current status."
                  />

                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <InfoCard
                      icon={CalendarDays}
                      label="Submitted On"
                      value={formatDateTime(details.createdAt)}
                    />

                    <InfoCard
                      icon={StatusIcon ?? Clock3}
                      label="Current Status"
                      value={currentStatus?.label ?? details.status}
                    />

                    <InfoCard
                      icon={UserRound}
                      label="Student"
                      value={details.student?.name || "Student"}
                    />

                    <InfoCard
                      icon={MessageSquareText}
                      label="Review Status"
                      value={
                        review
                          ? reviewCompleted
                            ? "Review Completed"
                            : "In Progress"
                          : "Awaiting Review"
                      }
                    />
                  </div>
                </section>

                {/* Review feedback */}
                <section>
                  <SectionHeading
                    icon={MessageSquareText}
                    title="Review & Feedback"
                    description="Feedback associated with your submission."
                  />

                  <div className="mt-4 rounded-2xl border border-border bg-card p-5 sm:p-6">
                    {review ? (
                      <div className="space-y-4">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                          <div className="flex items-center gap-3">
                            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                              <UserRound className="size-5" />
                            </div>

                            <div>
                              <p className="text-sm font-semibold text-foreground">
                                {review.reviewer?.name || "Reviewer"}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {review.reviewer?.email || "Project reviewer"}
                              </p>
                            </div>
                          </div>

                          <Badge
                            variant="outline"
                            className={
                              reviewCompleted
                                ? "w-fit border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                                : "w-fit border-blue-500/20 bg-blue-500/10 text-blue-600 dark:text-blue-400"
                            }
                          >
                            {reviewCompleted ? "Completed" : "In Progress"}
                          </Badge>
                        </div>

                        <Separator />

                        <div className="rounded-xl bg-muted/50 p-4">
                          <p className="whitespace-pre-wrap wrap-break-word text-sm leading-7 text-foreground">
                            {review.feedback || "No feedback details provided."}
                          </p>
                        </div>

                        <p className="text-xs text-muted-foreground">
                          Review date: {formatDateTime(review.createdAt)}
                        </p>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center rounded-xl border border-dashed border-border px-5 py-9 text-center">
                        <div className="flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
                          <MessageSquareText className="size-5" />
                        </div>

                        <h4 className="mt-3 text-sm font-semibold text-foreground">
                          No feedback yet
                        </h4>

                        <p className="mt-1 max-w-sm text-sm leading-6 text-muted-foreground">
                          Your project has not received review feedback yet.
                          Check back later for updates.
                        </p>
                      </div>
                    )}
                  </div>
                </section>
              </div>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

interface SectionHeadingProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

function SectionHeading({
  icon: Icon,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-primary/10 bg-primary/5 text-primary">
        <Icon className="size-5" />
      </div>

      <div>
        <h2 className="font-bold tracking-tight text-foreground">{title}</h2>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

interface InfoCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
}

function InfoCard({ icon: Icon, label, value }: InfoCardProps) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-border bg-card p-4">
      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
        <Icon className="size-4" />
      </div>

      <div className="min-w-0">
        <p className="text-xs font-medium text-muted-foreground">{label}</p>
        <p className="mt-1 wrap-break-word text-sm font-semibold text-foreground">
          {value}
        </p>
      </div>
    </div>
  );
}

interface ProjectLinkProps {
  href?: string | null;
  icon: LucideIcon;
  title: string;
  description: string;
}

function ProjectLink({
  href,
  icon: Icon,
  title,
  description,
}: ProjectLinkProps) {
  if (!href) {
    return (
      <div className="flex items-center gap-3 rounded-xl border border-border bg-muted/30 p-3.5 opacity-60">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
          <Icon className="size-5" />
        </div>

        <div className="min-w-0">
          <p className="text-sm font-semibold text-foreground">{title}</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Link not provided
          </p>
        </div>
      </div>
    );
  }

  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex min-w-0 items-center gap-3 rounded-xl border border-border bg-background p-3.5 transition-colors hover:border-primary/40 hover:bg-primary/3"
    >
      <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/15">
        <Icon className="size-5" />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-foreground">{title}</p>
        <p className="mt-1 text-xs text-muted-foreground">{description}</p>
      </div>

      <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
    </Link>
  );
}

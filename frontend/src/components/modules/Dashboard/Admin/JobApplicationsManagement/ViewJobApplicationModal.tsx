import { getJobApplicationAction } from "@/actions/jobApplication.action";
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
import { IJobApplicationPayload } from "@/types/jobApplication.type";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Clock, DollarSign, MapPinHouse, Users } from "lucide-react";

interface ViewJobApplicationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  jobApplication: IJobApplicationPayload | null;
}

const formatDateTime = (value?: string | Date | null) => {
  if (!value) {
    return "N/A";
  }

  const dateValue = new Date(value);
  if (Number.isNaN(dateValue.getTime())) {
    return "N/A";
  }

  return format(dateValue, "MMM dd, yyyy hh:mm a");
};

export default function ViewJobApplicationModal({
  open,
  onOpenChange,
  jobApplication,
}: ViewJobApplicationDialogProps) {
  const jobApplicationId = jobApplication ? String(jobApplication.id) : "";

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["job-application-details", jobApplicationId],
    queryFn: () => getJobApplicationAction(jobApplicationId),
    enabled: open && jobApplicationId.length > 0,
    staleTime: 1000 * 60,
  });

  const hasError = data && !data.success;
  const jobApplicationDetails =
    data && data.success
      ? (data as ApiResponse<IJobApplicationPayload>).data
      : null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] w-[calc(100vw-1.5rem)] max-w-[calc(100vw-1.5rem)] gap-0 overflow-hidden p-0 sm:w-[calc(100vw-3rem)] sm:max-w-[calc(100vw-3rem)] md:w-[calc(100vw-4rem)] md:max-w-[calc(100vw-4rem)] lg:w-[min(92vw,78rem)] lg:max-w-[min(92vw,78rem)] xl:w-[min(88vw,88rem)] xl:max-w-[min(88vw,88rem)] 2xl:w-[min(84vw,96rem)] 2xl:max-w-[min(84vw,96rem)]">
        <DialogHeader className="border-b px-6 py-5 pr-14">
          <DialogTitle>Job Application Details</DialogTitle>
          <DialogDescription>
            Comprehensive job application view with more details.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(90vh-5.5rem)]">
          <div className="space-y-4 px-6 py-5">
            {(isLoading || isFetching) && (
              <div className="rounded-md border p-4 text-sm text-muted-foreground">
                Loading job application details...
              </div>
            )}

            {hasError && (
              <div className="rounded-md border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
                {data.message || "Failed to load job post details."}
              </div>
            )}

            {!isLoading && !isFetching && jobApplicationDetails && (
              <>
                <div className="space-y-8 animate-in fade-in duration-500">
                  <div className="flex flex-col md:flex-row justify-between items-start gap-6 bg-slate-700 p-6 rounded-2xl border">
                    <div className="flex gap-4">
                      <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center text-primary text-2xl font-bold border-2 border-primary/20">
                        {jobApplicationDetails.user?.name
                          ?.charAt(0)
                          .toUpperCase()}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                          {jobApplicationDetails.user?.name}
                          {jobApplicationDetails.user?.emailVerified && (
                            <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 border-blue-200 text-[10px] h-5">
                              Verified
                            </Badge>
                          )}
                        </h3>
                        <p className="text-slate-500 font-medium">
                          {jobApplicationDetails.user?.email} -{" "}
                          {jobApplicationDetails.user?.phone}
                        </p>
                        <div className="flex items-center gap-3 mt-2">
                          <Badge
                            variant="outline"
                            className="capitalize font-bold"
                          >
                            Role: {jobApplicationDetails.user?.role}
                          </Badge>
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="size-3" /> Applied{" "}
                            {formatDateTime(jobApplicationDetails.createdAt)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-2 w-full md:w-auto">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        Current Status
                      </span>
                      <Badge
                        className={`text-sm px-4 py-1 rounded-full font-bold ${
                          jobApplicationDetails.status === "ACCEPTED"
                            ? "bg-emerald-500 hover:bg-emerald-600"
                            : jobApplicationDetails.status === "REJECTED"
                              ? "bg-rose-500 hover:bg-rose-600"
                              : "bg-amber-500 hover:bg-amber-600"
                        }`}
                      >
                        {jobApplicationDetails.status}
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Side: Submission Content */}
                    <div className="lg:col-span-2 space-y-6">
                      <section className="space-y-4">
                        <h4 className="text-sm font-bold uppercase tracking-widest text-primary flex items-center gap-2">
                          <span className="p-1 bg-primary/10 rounded">📄</span>{" "}
                          Submission Details
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <a
                            href={jobApplicationDetails.cvUrl}
                            target="_blank"
                            className="group flex items-center justify-between p-4 rounded-xl border-2 border-dashed border-slate-200 hover:border-primary hover:bg-primary/5 transition-all"
                          >
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-slate-100 rounded-lg group-hover:bg-primary/10 transition-colors">
                                <svg
                                  className="size-6 text-slate-600 group-hover:text-primary"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                  />
                                </svg>
                              </div>
                              <div>
                                <p className="font-bold text-slate-800">
                                  Curriculum Vitae
                                </p>
                                <p className="text-xs text-slate-500 italic">
                                  Click to view/download
                                </p>
                              </div>
                            </div>
                            <svg
                              className="size-5 text-slate-400 group-hover:text-primary transition-transform group-hover:translate-x-1"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M14 5l7 7m0 0l-7 7m7-7H3"
                              />
                            </svg>
                          </a>
                        </div>
                      </section>

                      <Separator />

                      <section className="space-y-3">
                        <h4 className="text-sm font-bold uppercase tracking-widest text-primary">
                          Recruiter Feedback
                        </h4>
                        <div className="p-5 rounded-xl bg-slate-50 border min-h-25 italic text-slate-600 leading-relaxed">
                          {jobApplicationDetails.feedback ||
                            "No feedback has been provided yet by the recruiter."}
                        </div>
                      </section>
                    </div>

                    {/* Right Side: Job Post Quick Summary */}
                    <div className="space-y-4">
                      <div className="p-6 rounded-2xl border bg-card shadow-sm space-y-5 sticky top-0">
                        <h4 className="font-black text-xs uppercase tracking-tighter text-muted-foreground border-b pb-3">
                          Associated Job Post
                        </h4>

                        <div className="space-y-4">
                          <div>
                            <h5 className="font-bold text-slate-900 leading-tight">
                              {jobApplicationDetails.jobPost?.title}
                            </h5>
                            <p className="text-xs text-primary font-semibold mt-1">
                              {jobApplicationDetails.jobPost?.serviceType}
                            </p>
                          </div>

                          <div className="space-y-3 pt-2">
                            <div className="flex items-center gap-3 text-sm text-slate-600">
                              <MapPinHouse className="size-4 text-slate-400" />
                              <span>
                                {jobApplicationDetails.jobPost?.location ||
                                  "Remote"}
                              </span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-slate-600">
                              <Users className="size-4 text-slate-400" />
                              <span>
                                {jobApplicationDetails.jobPost?.vacancy}{" "}
                                Positions
                              </span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-slate-600">
                              <DollarSign className="size-4 text-slate-400" />
                              <span className="font-medium text-emerald-600">
                                {jobApplicationDetails.jobPost?.salaryRange ||
                                  "Negotiable"}
                              </span>
                            </div>
                          </div>
                        </div>

                        <Separator />

                        <div className="bg-amber-50 p-4 rounded-xl border border-amber-100 flex items-start gap-3">
                          <Clock className="size-4 text-amber-600 mt-0.5" />
                          <div>
                            <p className="text-[10px] uppercase font-bold text-amber-700">
                              Application Deadline
                            </p>
                            <p className="text-xs font-semibold text-amber-900">
                              {jobApplicationDetails.jobPost?.deadline
                                ? format(
                                    new Date(
                                      jobApplicationDetails.jobPost.deadline,
                                    ),
                                    "PPP",
                                  )
                                : "N/A"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

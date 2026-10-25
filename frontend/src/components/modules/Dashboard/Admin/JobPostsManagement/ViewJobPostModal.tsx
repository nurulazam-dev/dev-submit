import { getJobPostAction } from "@/actions/jobPost.action";
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
import { IJobPostPayload } from "@/types/jobPost.type";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Clock, DollarSign, MapPinHouse, Users } from "lucide-react";

interface ViewJobPostDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  jobPost: IJobPostPayload | null;
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

export default function ViewJobPostModal({
  open,
  onOpenChange,
  jobPost,
}: ViewJobPostDialogProps) {
  const jobPostId = jobPost ? String(jobPost.id) : "";

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["job-post-details", jobPostId],
    queryFn: () => getJobPostAction(jobPostId),
    enabled: open && jobPostId.length > 0,
    staleTime: 1000 * 60,
  });

  const hasError = data && !data.success;
  const jobPostDetails =
    data && data.success ? (data as ApiResponse<IJobPostPayload>).data : null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] w-[calc(100vw-1.5rem)] max-w-[calc(100vw-1.5rem)] gap-0 overflow-hidden p-0 sm:w-[calc(100vw-3rem)] sm:max-w-[calc(100vw-3rem)] md:w-[calc(100vw-4rem)] md:max-w-[calc(100vw-4rem)] lg:w-[min(92vw,78rem)] lg:max-w-[min(92vw,78rem)] xl:w-[min(88vw,88rem)] xl:max-w-[min(88vw,88rem)] 2xl:w-[min(84vw,96rem)] 2xl:max-w-[min(84vw,96rem)]">
        <DialogHeader className="border-b px-6 py-5 pr-14">
          <DialogTitle>Job Post Details</DialogTitle>
          <DialogDescription>
            Comprehensive job post view with more details.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(90vh-5.5rem)]">
          <div className="space-y-4 px-6 py-5">
            {(isLoading || isFetching) && (
              <div className="rounded-md border p-4 text-sm text-muted-foreground">
                Loading job post details...
              </div>
            )}

            {hasError && (
              <div className="rounded-md border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
                {data.message || "Failed to load job post details."}
              </div>
            )}

            {!isLoading && !isFetching && jobPostDetails && (
              <>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 space-y-6">
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-2">
                        {jobPostDetails.title}
                      </h3>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <Badge
                          variant="secondary"
                          className="bg-blue-100 text-blue-700 hover:bg-blue-100"
                        >
                          {jobPostDetails.serviceType}
                        </Badge>
                        <Badge
                          variant={
                            jobPostDetails.isActive ? "default" : "destructive"
                          }
                        >
                          {jobPostDetails.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                    </div>

                    <Separator />

                    <section>
                      <h4 className="font-semibold text-lg flex items-center gap-2 mb-3">
                        <span className="w-1 h-6 bg-primary rounded-full" />
                        Job Description
                      </h4>
                      <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                        {jobPostDetails.description}
                      </p>
                    </section>

                    <section>
                      <h4 className="font-semibold text-lg flex items-center gap-2 mb-3">
                        <span className="w-1 h-6 bg-primary rounded-full" />
                        Requirements
                      </h4>
                      <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                        {jobPostDetails.requirements}
                      </p>
                    </section>
                  </div>

                  <div className="space-y-4">
                    <div className="rounded-xl border bg-card p-5 shadow-sm space-y-4">
                      <h4 className="font-bold text-sm uppercase tracking-wider text-muted-foreground border-b pb-2">
                        Job Overview
                      </h4>

                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-primary/10 rounded-lg text-primary">
                            <MapPinHouse />
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">
                              Location
                            </p>
                            <p className="text-sm font-medium">
                              {jobPostDetails.location || "Not Specified"}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-primary/10 rounded-lg text-primary">
                            <Users />
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">
                              Vacancy
                            </p>
                            <p className="text-sm font-medium">
                              {jobPostDetails.vacancy} Position(s)
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-primary/10 rounded-lg text-primary">
                            <DollarSign />
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">
                              Salary Range
                            </p>
                            <p className="text-sm font-medium">
                              {jobPostDetails.salaryRange || "Negotiable"}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-destructive/10 rounded-lg text-destructive">
                            <Clock />
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">
                              Deadline
                            </p>
                            <p className="text-sm font-bold text-destructive">
                              {formatDateTime(jobPostDetails.deadline)}
                            </p>
                            <p>
                              Applied :{" "}
                              <span>
                                {jobPostDetails.applications?.length || 0}{" "}
                                Candidates
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>

                      <Separator />

                      <div className="pt-2 space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">
                            Posted on:
                          </span>
                          <span>
                            {formatDateTime(jobPostDetails.createdAt)}
                          </span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">
                            Last updated:
                          </span>
                          <span>
                            {formatDateTime(jobPostDetails.updatedAt)}
                          </span>
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

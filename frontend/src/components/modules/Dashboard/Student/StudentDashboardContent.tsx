"use client";

import { useQuery } from "@tanstack/react-query";
import { getDashboardData } from "@/services/dashboard.services";
import StatsCard from "../StatsCard";
import { IStudentDashboardStats } from "@/types/dashboard.types";
import DashboardBanner from "../DashboardBanner";
import DashboardSkeleton from "../DashboardSkeleton";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FilePlus,
  FileText,
  MessageSquare,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";

const StudentDashboardContent = () => {
  const { data: response, isLoading } = useQuery({
    queryKey: ["student-dashboard-data"],
    queryFn: getDashboardData,
    refetchOnWindowFocus: false,
  });

  const data = response?.data as IStudentDashboardStats;

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="space-y-8 p-6">
      <DashboardBanner />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Submissions"
          value={data?.totalSubmissions || 0}
          iconName="FileText"
          description="Projects submitted for review"
          className="border-l-4 border-l-blue-500 shadow-sm transition-all hover:scale-[1.02]"
        />

        <StatsCard
          title="Pending Review"
          value={data?.myPendingSubmissions || 0}
          iconName="Clock"
          description="Awaiting evaluation from admin"
          className="border-l-4 border-l-amber-500 shadow-sm transition-all hover:scale-[1.02]"
        />

        <StatsCard
          title="Approved Projects"
          value={data?.myApprovedSubmissions || 0}
          iconName="CheckCircle"
          description="Successfully approved projects"
          className="border-l-4 border-l-emerald-500 shadow-sm transition-all hover:scale-[1.02]"
        />

        <StatsCard
          title="Needs Revision"
          value={data?.myRejectedSubmissions || 0}
          iconName="XCircle"
          description="Rejected or requiring fixes"
          className="border-l-4 border-l-rose-500 shadow-sm transition-all hover:scale-[1.02]"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-12">
        <Card className="md:col-span-8 shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold">
                  Quick Actions
                </CardTitle>
                <CardDescription>
                  Manage and track your project submissions
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border bg-card p-5 space-y-3 transition-colors hover:border-primary/50">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-primary/10 text-primary">
                    <FilePlus className="size-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">
                      Submit New Project
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Submit a GitHub repo & live URL
                    </p>
                  </div>
                </div>
                <Button
                  className="w-full gap-2"
                  render={
                    <Link href="/dashboard/submissions/create">
                      Submit Project <ArrowRight className="size-4" />
                    </Link>
                  }
                />
              </div>

              <div className="rounded-xl border bg-card p-5 space-y-3 transition-colors hover:border-primary/50">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-500">
                    <FileText className="size-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">My Submissions</h3>
                    <p className="text-xs text-muted-foreground">
                      View status of all your projects
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="w-full gap-2"
                  render={
                    <Link href="/dashboard/my-submissions">
                      View Submissions <ArrowRight className="size-4" />
                    </Link>
                  }
                />
              </div>
            </div>

            <div className="rounded-xl border bg-muted/40 p-5 mt-4">
              <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                <MessageSquare className="size-4 text-primary" /> Evaluation
                Process
              </h4>
              <ul className="text-xs text-muted-foreground space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="size-3.5 text-emerald-500 mt-0.5 shrink-0" />
                  <span>
                    Only one project can be in <strong>PENDING</strong> review
                    at a time.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="size-3.5 text-emerald-500 mt-0.5 shrink-0" />
                  <span>
                    Admins review your code repository and live deployment URL.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="size-3.5 text-emerald-500 mt-0.5 shrink-0" />
                  <span>
                    Once reviewed, detailed feedback and your final status
                    (APPROVED or REJECTED) will be displayed.
                  </span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-4 shadow-sm flex flex-col justify-between">
          <CardHeader>
            <CardTitle className="text-xl font-bold">
              Submission Guidelines
            </CardTitle>
            <CardDescription>Tips for guaranteed approval</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-xs text-muted-foreground">
            <div className="flex items-start gap-3">
              <ShieldCheck className="size-4 text-foreground shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-foreground">
                  Valid GitHub Repository
                </p>
                <p>
                  Ensure repository is public with a clear README, clean commit
                  history, and setup instructions.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <ShieldCheck className="size-4 text-emerald-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-foreground">
                  Working Live Deployment
                </p>
                <p>
                  Deploy on Vercel, Netlify, Render, or another hosting service
                  with no console errors.
                </p>
              </div>
            </div>
          </CardContent>
          <div className="p-6 pt-0">
            <Button
              variant="secondary"
              className="w-full gap-2"
              render={
                <Link href="/dashboard/my-reviews">
                  <MessageSquare className="size-4" /> Check Reviews Received
                </Link>
              }
            />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default StudentDashboardContent;

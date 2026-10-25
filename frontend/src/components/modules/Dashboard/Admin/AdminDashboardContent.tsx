"use client";

import { getDashboardData } from "@/services/dashboard.services";
import { useQuery } from "@tanstack/react-query";
import StatsCard from "../StatsCard";
import { IAdminDashboardStats } from "@/types/dashboard.types";
import DashboardBanner from "../DashboardBanner";
import DashboardSkeleton from "../DashboardSkeleton";
import SubmissionBarChart from "../SubmissionBarChart";
import SubmissionPieChart from "../SubmissionPieChart";

const AdminDashboardContent = () => {
  const { data: response, isLoading } = useQuery({
    queryKey: ["admin-dashboard-data"],
    queryFn: getDashboardData,
    refetchOnWindowFocus: false,
  });

  const data = response?.data as IAdminDashboardStats;

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="space-y-8 p-6">
      <DashboardBanner />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Submissions"
          value={data?.submissionCount || 0}
          iconName="FileText"
          description="All submitted code projects"
          className="border-l-4 border-l-indigo-600 shadow-sm"
        />

        <StatsCard
          title="Pending Submissions"
          value={data?.pendingSubmissions || 0}
          iconName="Clock"
          description="Awaiting mentor review"
          className="border-l-4 border-l-amber-500 shadow-sm"
        />

        <StatsCard
          title="Approved Projects"
          value={data?.approvedSubmissions || 0}
          iconName="CheckCircle"
          description="Passed quality inspection"
          className="border-l-4 border-l-emerald-500 shadow-sm"
        />

        <StatsCard
          title="Rejected Projects"
          value={data?.rejectedSubmissions || 0}
          iconName="XCircle"
          description="Requires code changes"
          className="border-l-4 border-l-rose-500 shadow-sm"
        />

        <StatsCard
          title="Total Reviews"
          value={data?.reviewCount || 0}
          iconName="MessageSquare"
          description="Feedback items given"
          className="border-l-4 border-l-purple-500 shadow-sm"
        />

        <StatsCard
          title="Active Students"
          value={data?.studentCount || 0}
          iconName="GraduationCap"
          description="Submitting developers"
          className="border-l-4 border-l-blue-500 shadow-sm"
        />

        <StatsCard
          title="Reviewer Admins"
          value={data?.adminCount || 0}
          iconName="ShieldCheck"
          description="Code reviewers & mentors"
          className="border-l-4 border-l-teal-500 shadow-sm"
        />

        <StatsCard
          title="Total Accounts"
          value={data?.userCount || 0}
          iconName="Users"
          description="All platform accounts"
          className="border-l-4 border-l-slate-500 shadow-sm"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-12">
        <div className="md:col-span-7 lg:col-span-8">
          <SubmissionBarChart data={data?.monthlyRequests || []} />
        </div>

        <div className="md:col-span-5 lg:col-span-4">
          <SubmissionPieChart
            data={data?.requestStatusDistribution || []}
            title="Submission Status"
            description="Breakdown of project outcomes"
          />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardContent;

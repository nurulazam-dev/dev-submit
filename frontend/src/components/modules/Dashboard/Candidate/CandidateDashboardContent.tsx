"use client";

import { useQuery } from "@tanstack/react-query";
import { getDashboardData } from "@/services/dashboard.services";
import StatsCard from "../StatsCard";
import ServiceRequestBarChart from "../ServiceRequestBarChart";
import ServiceRequestPieChart from "../ServiceRequestPieChart";
import { IDashboardStatsDataPayload } from "@/types/dashboard.types";
import DashboardBanner from "../DashboardBanner";
import DashboardSkeleton from "../DashboardSkeleton";

const CandidateDashboardContent = () => {
  const { data: response, isLoading } = useQuery({
    queryKey: ["candidate-dashboard-data"],
    queryFn: getDashboardData,
    refetchOnWindowFocus: false,
  });

  const data = response?.data as IDashboardStatsDataPayload;
  console.log("dashboard data===", data);

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="space-y-8 p-6">
      <DashboardBanner />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Applied Jobs"
          value={data?.totalJobApplied || 0}
          iconName="Briefcase"
          description="Total positions you've applied for"
          className="border-l-4 border-l-blue-500 shadow-sm transition-all hover:scale-[1.02]"
        />

        <StatsCard
          title="Pending Review"
          value={data?.pendingApplications || 0}
          iconName="Clock"
          description="Applications currently under review"
          className="border-l-4 border-l-amber-500 shadow-sm transition-all hover:scale-[1.02]"
        />

        <StatsCard
          title="Accepted"
          value={data?.acceptedApplications || 0}
          iconName="CheckCircle2"
          description="Shortlisted or accepted offers"
          className="border-l-4 border-l-emerald-500 shadow-sm transition-all hover:scale-[1.02]"
        />

        <StatsCard
          title="Rejected"
          value={data?.rejectedApplications || 0}
          iconName="XCircle"
          description="Applications not moved forward"
          className="border-l-4 border-l-rose-500 shadow-sm transition-all hover:scale-[1.02]"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-12">
        <div className="md:col-span-7 lg:col-span-8 bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm">
          <div className="mb-6">
            <h3 className="text-xl font-black tracking-tight uppercase">
              Application Activity
            </h3>
            <p className="text-xs text-muted-foreground">
              Your monthly job application trends
            </p>
          </div>
          <ServiceRequestBarChart data={data?.monthlyRequests || []} />
        </div>

        <div className="md:col-span-5 lg:col-span-4 bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm">
          <div className="mb-6">
            <h3 className="text-xl font-black tracking-tight uppercase">
              Success Rate
            </h3>
            <p className="text-xs text-muted-foreground">
              Distribution of your application statuses
            </p>
          </div>
          <ServiceRequestPieChart
            data={data?.requestStatusDistribution || []}
          />
        </div>
      </div>
    </div>
  );
};

export default CandidateDashboardContent;

"use client";

import { useQuery } from "@tanstack/react-query";
import { getDashboardData } from "@/services/dashboard.services";
import StatsCard from "../StatsCard";
import ServiceRequestBarChart from "../ServiceRequestBarChart";
import ServiceRequestPieChart from "../ServiceRequestPieChart";
import { IDashboardStatsDataPayload } from "@/types/dashboard.types";
import DashboardBanner from "../DashboardBanner";
import DashboardSkeleton from "../DashboardSkeleton";

const ProviderDashboardContent = () => {
  const { data: response, isLoading } = useQuery({
    queryKey: ["provider-dashboard-data"],
    queryFn: getDashboardData,
    refetchOnWindowFocus: false,
  });

  const data = response?.data as IDashboardStatsDataPayload;

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="space-y-8 p-6">
      <DashboardBanner />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <StatsCard
          title="Assigned Tasks"
          value={data?.totalAssignedRequests || 0}
          iconName="Briefcase"
          description="Total requests assigned to you"
          className="border-l-4 border-l-blue-500 shadow-sm"
        />

        <StatsCard
          title="Completed Request"
          value={data?.completedRequests || 0}
          iconName="CheckCircle2"
          description="Tasks successfully delivered"
          trend={{ value: "8%", isPositive: true }}
          className="border-l-4 border-l-emerald-500 shadow-sm"
        />

        <StatsCard
          title="Client Reviews"
          value={data?.reviewCount || 0}
          iconName="MessageSquareText"
          description="Total feedback received"
          className="border-l-4 border-l-indigo-600 shadow-sm"
        />

        <StatsCard
          title="Average Rating"
          value={`${data?.averageRating?.toFixed(1) || "0.0"}/5`}
          iconName="Star"
          description="Overall service quality"
          trend={{ value: "Excellent", isPositive: true }}
          className="border-l-4 border-l-amber-500 shadow-sm"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-12">
        <div className="md:col-span-7 lg:col-span-8 bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm">
          <div className="mb-6">
            <h3 className="text-xl font-black tracking-tight">
              Earnings & Growth
            </h3>
            <p className="text-sm text-muted-foreground">
              Monthly overview of your service performance
            </p>
          </div>
          <ServiceRequestBarChart data={data?.monthlyRequests || []} />
        </div>

        <div className="md:col-span-5 lg:col-span-4 bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm">
          <div className="mb-6">
            <h3 className="text-xl font-black tracking-tight">
              Status Overview
            </h3>
            <p className="text-sm text-muted-foreground">
              Distribution of your current tasks
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

export default ProviderDashboardContent;

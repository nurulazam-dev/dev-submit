"use client";

import { useQuery } from "@tanstack/react-query";
import { getDashboardData } from "@/services/dashboard.services";
import StatsCard from "../StatsCard";
import { IDashboardStatsDataPayload } from "@/types/dashboard.types";
import DashboardBanner from "../DashboardBanner";
import DashboardSkeleton from "../DashboardSkeleton";
import CustomerServiceRequestActivity from "./CustomerServiceRequestActivity";
import EnhancedCalendar from "./EnhancedCalendar";

const CustomerDashboardContent = () => {
  const { data: response, isLoading } = useQuery({
    queryKey: ["customer-dashboard-data"],
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

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Requests"
          value={data?.totalRequests || 0}
          iconName="Briefcase"
          description="Total service requests you've made"
          className="border-l-4 border-l-blue-500 shadow-sm transition-all hover:scale-[1.02]"
        />

        <StatsCard
          title="Active Requests"
          value={data?.activeRequests || 0}
          iconName="Clock"
          description="Requests currently in progress"
          className="border-l-4 border-l-amber-500 shadow-sm transition-all hover:scale-[1.02]"
        />

        <StatsCard
          title="Completed Requests"
          value={data?.completedRequests || 0}
          iconName="CheckCircle"
          description="Requests that have been completed"
          className="border-l-4 border-l-emerald-500 shadow-sm transition-all hover:scale-[1.02]"
        />

        <StatsCard
          title="Total Spent"
          value={data?.totalSpent || 0}
          iconName="DollarSign"
          description="Amount spent on service requests"
          className="border-l-4 border-l-indigo-500 shadow-sm transition-all hover:scale-[1.02]"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-12">
        <CustomerServiceRequestActivity />
        <EnhancedCalendar />
      </div>
    </div>
  );
};

export default CustomerDashboardContent;

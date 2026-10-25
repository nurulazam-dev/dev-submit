"use client";

import { getDashboardData } from "@/services/dashboard.services";
import { useQuery } from "@tanstack/react-query";
import StatsCard from "../StatsCard";
import ServiceRequestBarChart from "../ServiceRequestBarChart";
import ServiceRequestPieChart from "../ServiceRequestPieChart";
import { IDashboardStatsDataPayload } from "@/types/dashboard.types";
import DashboardBanner from "../DashboardBanner";
import DashboardSkeleton from "../DashboardSkeleton";

const AdminDashboardContent = () => {
  const { data: response, isLoading } = useQuery({
    queryKey: ["admin-dashboard-data"],
    queryFn: getDashboardData,
    refetchOnWindowFocus: false,
  });

  const data = response?.data as IDashboardStatsDataPayload;

  const formatCurrency = (value: number = 0) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);
  };

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="space-y-8 p-6">
      <DashboardBanner />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <StatsCard
          title="Total Services"
          value={data?.serviceCount || 0}
          iconName="LayoutGrid"
          description="Live services in categories"
          className="border-l-blue-500"
        />

        <StatsCard
          title="Service Requests"
          value={data?.requestCount || 0}
          iconName="Activity"
          description="Total orders received"
          trend={{ value: "12%", isPositive: true }}
          className="border-l-rose-500"
        />

        <StatsCard
          title="Total Users"
          value={data?.userCount || 0}
          iconName="Users"
          description="Registered customers"
          trend={{ value: "5%", isPositive: true }}
          className="border-l-indigo-600"
        />

        <StatsCard
          title="Providers"
          value={data?.providerCount || 0}
          iconName="ShieldCheck"
          description="Active verified partners"
          className="border-l-emerald-500"
        />

        <StatsCard
          title="Pending Apps"
          value={data?.pendingApplications || 0}
          iconName="FileSearch"
          description="Awaiting review"
          className="border-l-amber-500"
        />

        <StatsCard
          title="Total Revenue"
          value={formatCurrency(data?.totalRevenue as number)}
          iconName="CircleDollarSign"
          description="Net earnings so far"
          className="border-l-4 border-l-violet-600 shadow-sm"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-12">
        <div className="md:col-span-7 lg:col-span-8">
          <ServiceRequestBarChart data={data?.monthlyRequests || []} />
        </div>

        <div className="md:col-span-5 lg:col-span-4">
          <ServiceRequestPieChart
            data={data?.requestStatusDistribution || []}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardContent;

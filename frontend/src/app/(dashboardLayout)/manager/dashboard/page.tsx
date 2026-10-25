import ManagerDashboardContent from "@/components/modules/Dashboard/Manager/ManagerDashboardContent";
import { getDashboardData } from "@/services/dashboard.services";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default async function ManagerDashboardPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["manager-dashboard-data"],
    queryFn: getDashboardData,
    staleTime: 30 * 1000,
    gcTime: 5 * 60 * 1000,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ManagerDashboardContent />
    </HydrationBoundary>
  );
}

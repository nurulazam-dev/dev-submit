import ProviderDashboardContent from "@/components/modules/Dashboard/ServiceProvider/ProviderDashboardContent";
import { getDashboardData } from "@/services/dashboard.services";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default async function ProviderDashboardPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["provider-dashboard-data"],
    queryFn: getDashboardData,
    staleTime: 30 * 1000,
    gcTime: 5 * 60 * 1000,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProviderDashboardContent />
    </HydrationBoundary>
  );
}

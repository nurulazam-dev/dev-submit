import CustomerDashboardContent from "@/components/modules/Dashboard/Customer/CustomerDashboardContent";
import { getDashboardData } from "@/services/dashboard.services";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default async function CustomerDashboardPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["customer-dashboard-data"],
    queryFn: getDashboardData,
    staleTime: 30 * 1000,
    gcTime: 5 * 60 * 1000,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CustomerDashboardContent />
    </HydrationBoundary>
  );
}

import CandidateDashboardContent from "@/components/modules/Dashboard/Candidate/CandidateDashboardContent";
import { getDashboardData } from "@/services/dashboard.services";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default async function CandidateDashboardPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["candidate-dashboard-data"],
    queryFn: getDashboardData,
    staleTime: 30 * 1000,
    gcTime: 5 * 60 * 1000,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CandidateDashboardContent />
    </HydrationBoundary>
  );
}

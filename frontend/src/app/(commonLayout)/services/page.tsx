"use server";

import ServicesComp from "@/components/modules/Services/ServicesComp";
import { getAllServices } from "@/services/servicesData.services";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default async function ServicesPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["services"],
    queryFn: () => getAllServices(""),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="mx-auto w-full max-w-(--breakpoint-xl) px-6">
        <ServicesComp />
      </div>
    </HydrationBoundary>
  );
}

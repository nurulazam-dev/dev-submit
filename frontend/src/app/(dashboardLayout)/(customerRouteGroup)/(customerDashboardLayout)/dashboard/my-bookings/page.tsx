import MyAllSRsByCustomerTable from "@/components/modules/Dashboard/Customer/MySRequestsByCustomer/MyAllSRsByCustomerTable";
import { getMyAllServiceRequestByCustomerService } from "@/services/serviceRequest.services";

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default async function MyServiceRequestsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const queryParamsObjects = await searchParams;

  const queryString = Object.keys(queryParamsObjects)
    .map((key) => {
      const value = queryParamsObjects[key];
      if (value === undefined) {
        return "";
      }

      if (Array.isArray(value)) {
        return value
          .map((v) => `${encodeURIComponent(key)}=${encodeURIComponent(v)}`)
          .join("&");
      }

      return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
    })
    .filter(Boolean)
    .join("&");

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["my-service-requests-customer", queryString],
    queryFn: () => getMyAllServiceRequestByCustomerService(queryString),
    staleTime: 30 * 1000,
    gcTime: 5 * 60 * 1000,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MyAllSRsByCustomerTable initialQueryString={queryString} />
    </HydrationBoundary>
  );
}

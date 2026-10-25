// import MyAllSchedulesTable from "@/components/modules/Dashboard/ServiceProvider/MySchedules/MyAllSchedulesTable";
// import { getMyAllSchedulesService } from "@/services/serviceSchedules.services";
import MyAllRequestsBySPTable from "@/components/modules/Dashboard/ServiceProvider/MySRequestsBySP/MyAllRequestsBySPTable";
import { getMyAllRequestsBySPService } from "@/services/serviceRequest.services";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default async function MyRequestsBySPPage({
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
    queryKey: ["my-requests-sp", queryString],
    queryFn: () => getMyAllRequestsBySPService(queryString),
    staleTime: 30 * 1000,
    gcTime: 5 * 60 * 1000,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MyAllRequestsBySPTable initialQueryString={queryString} />
    </HydrationBoundary>
  );
}

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import { getMyAllJobApplicationsService } from "@/services/jobApplications.services";
import ManageMyAllApplicationsTable from "@/components/modules/Dashboard/Common/MyAllApplications/ManageMyAllApplicationsTable";

export default async function MyAppliedJobSByCandidatePage({
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
    queryKey: ["my-all-applications"],
    queryFn: () => getMyAllJobApplicationsService(queryString),
    staleTime: 30 * 1000,
    gcTime: 5 * 60 * 1000,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ManageMyAllApplicationsTable initialQueryString={queryString} />
    </HydrationBoundary>
  );
}

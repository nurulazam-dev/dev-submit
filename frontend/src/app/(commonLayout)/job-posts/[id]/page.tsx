"use server";

import JobPostDetails from "@/components/modules/Career-Job-Post/JobPostDetails";
import { getJobPostService } from "@/services/jobPosts.services";

export default async function JobPostDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const paramsId = await params;
  const id = paramsId.id;

  const response = await getJobPostService(id);
  const jobPost = response?.data;

  return <JobPostDetails jobPost={jobPost} />;
}

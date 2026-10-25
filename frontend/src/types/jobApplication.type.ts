import { IJobPostPayload } from "./jobPost.type";
import { IUserPayload } from "./users.type";

export type JobApplicationStatus = "PENDING" | "ACCEPTED" | "REJECTED";

export interface IJobApplicationPayload {
  id: string;
  userId: string;
  user?: IUserPayload;
  jobPostId?: string | null;
  jobPost?: IJobPostPayload;
  cvUrl: string;
  status: JobApplicationStatus;
  feedback?: string | null;
  createdAt: Date | string;
}

export interface IMyJobApplicationPayload {
  id: string;
  jobPostId?: string | null;
  jobPost?: IJobPostPayload;
  cvUrl: string;
  status: JobApplicationStatus;
  feedback?: string | null;
  createdAt: Date | string;
}

export interface IApplyJobApplicationPayload {
  userId: string;
  jobPostId?: string | null;
  cvUrl: string;
  status: JobApplicationStatus;
  createdAt: Date | string;
}

export interface IUpdateJobApplicationPayload {
  status: JobApplicationStatus;
  feedback?: string | null;
}

import { IReviewPayload } from "./review.type";

export type SubmissionStatus = "PENDING" | "APPROVED" | "REJECTED";

export interface ISubmissionPayload {
  title: string;
  description: string;
  githubUrl: string;
  liveUrl: string;
  status: SubmissionStatus;
  review?: IReviewPayload;
  createdAt: Date | string;
}

export interface IAdminUpdateSubmissionPayload {
  status?: SubmissionStatus;
}

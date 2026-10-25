import { IReviewPayload } from "./review.type";
import { IUserPayload } from "./users.type";

export type SubmissionStatus = "PENDING" | "APPROVED" | "REJECTED";

export interface ISubmissionPayload {
  id: string;
  title: string;
  description: string;
  githubUrl: string;
  liveUrl: string;
  status: SubmissionStatus;
  studentId: string;
  student?: IUserPayload;
  review?: IReviewPayload | null;
  createdAt: Date | string;
}

export interface ICreateSubmissionPayload {
  title: string;
  description: string;
  githubUrl: string;
  liveUrl: string;
}

export interface IAdminUpdateSubmissionPayload {
  status?: SubmissionStatus;
}

import { ISubmissionPayload } from "./submission.type";
import { IUserPayload } from "./users.type";

export type ReviewStatus = "IN_PROGRESS" | "COMPLETED";

export interface IReviewPayload {
  id: string;
  submissionId: string;
  submission?: ISubmissionPayload;
  reviewerId: string;
  reviewer?: IUserPayload;
  feedback: string;
  status: ReviewStatus;
  createdAt: Date | string;
}

export interface ICreateReviewPayload {
  submissionId: string;
  feedback: string;
}

export interface IReviewStatusUpdatePayload {
  status: ReviewStatus;
}

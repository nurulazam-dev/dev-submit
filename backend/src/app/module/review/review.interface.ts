export type ReviewStatus = "IN_PROGRESS" | "COMPLETED";

export interface IReviewPayload {
  submissionId: string;
  feedback: string;
  status: ReviewStatus;
}

export interface IReviewStatusUpdatePayload {
  status: ReviewStatus;
}

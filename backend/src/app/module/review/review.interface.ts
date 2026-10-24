export type ReviewStatus = "PENDING" | "IN_PROGRESS" | "COMPLETED";

export interface IReviewPayload {
  feedback: string;
  status: ReviewStatus;
}

import { z } from "zod";

const feedbackSchema = z
  .string("Feedback is required!")
  .min(10, "Feedback must be at least 10 characters")
  .max(100, "Feedback must not exceed 100 characters");

const createReviewZodSchema = z.object({
  feedback: feedbackSchema,
});

export const ReviewValidation = {
  createReviewZodSchema,
};

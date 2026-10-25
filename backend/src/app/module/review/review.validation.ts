import { z } from "zod";

const createReviewZodSchema = z.object({
  submissionId: z.string().uuid("Invalid submission ID"),
  feedback: z
    .string("Feedback is required!")
    .trim()
    .min(10, "Feedback must be at least 10 characters")
    .max(100, "Feedback must not exceed 100 characters"),
});

const updateReviewStatusZodSchema = z.object({
  status: z.enum(["IN_PROGRESS", "COMPLETED"]),
});

export const ReviewValidation = {
  createReviewZodSchema,
  updateReviewStatusZodSchema,
};

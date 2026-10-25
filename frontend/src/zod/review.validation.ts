import { z } from "zod";

export const createReviewZodSchema = z.object({
  submissionId: z.string().uuid("Invalid submission ID"),
  feedback: z
    .string("Feedback is required")
    .trim()
    .min(10, "Feedback must be at least 10 characters")
    .max(100, "Feedback must not exceed 100 characters"),
});

export type ICreateReviewFormValues = z.infer<typeof createReviewZodSchema>;

export const updateReviewStatusZodSchema = z.object({
  status: z.enum(
    ["IN_PROGRESS", "COMPLETED"],
    "Status must be IN_PROGRESS or COMPLETED",
  ),
});

export type IUpdateReviewStatusFormValues = z.infer<
  typeof updateReviewStatusZodSchema
>;

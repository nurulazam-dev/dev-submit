import { z } from "zod";

export const createSubmissionZodSchema = z.object({
  title: z
    .string("Title is required")
    .trim()
    .min(3, "Title must be at least 3 characters")
    .max(150, "Title must not exceed 150 characters"),
  description: z
    .string("Description is required")
    .trim()
    .min(10, "Description must be at least 10 characters")
    .max(1000, "Description must not exceed 1000 characters"),
  githubUrl: z
    .string("GitHub URL is required")
    .trim()
    .url("Invalid URL")
    .regex(
      /^https:\/\/(www\.)?github\.com\/.+/,
      "Must be a valid GitHub URL (e.g. https://github.com/username/repo)",
    ),
  liveUrl: z
    .string("Live URL is required")
    .trim()
    .url("Invalid Live URL (e.g. https://my-project.vercel.app)"),
});

export type ICreateSubmissionFormValues = z.infer<
  typeof createSubmissionZodSchema
>;

export const adminUpdateSubmissionZodSchema = z.object({
  status: z.enum(
    ["PENDING", "APPROVED", "REJECTED"],
    "Status must be PENDING, APPROVED, or REJECTED",
  ),
});

export type IAdminUpdateSubmissionFormValues = z.infer<
  typeof adminUpdateSubmissionZodSchema
>;

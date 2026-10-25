import { z } from "zod";

export const applyJobApplicationZodSchema = z.object({
  userId: z.string(),
  // .uuid("User ID must be a valid UUID"),

  jobPostId: z
    .string()
    // .uuid("Job Post ID must be a valid UUID")
    .nullable()
    .optional(),

  // cvUrl: z.string().url("CV must be a valid URL"),
  cvUrl: z
    .string()
    .url("CV must be a valid URL")
    .refine(
      (url) => {
        const cleanUrl = url.split("?")[0]!.toLowerCase();
        return cleanUrl.endsWith(".pdf");
      },
      {
        message: "CV must be a valid PDF file",
      },
    ),

  status: z.enum(["PENDING", "ACCEPTED", "REJECTED"]).optional(),

  feedback: z
    .string()
    .max(1000, "Feedback must not exceed 1000 characters")
    .nullable()
    .optional(),
});

export type IApplyJobApplicationFormValues = z.infer<
  typeof applyJobApplicationZodSchema
>;

export const updateJobApplicationZodSchema = z.object({
  status: z.enum(["PENDING", "ACCEPTED", "REJECTED"]).optional(),

  feedback: z
    .string()
    .max(1000, "Feedback must not exceed 1000 characters")
    .nullable()
    .optional(),
});

export type IUpdateJobApplicationFormValues = z.infer<
  typeof updateJobApplicationZodSchema
>;

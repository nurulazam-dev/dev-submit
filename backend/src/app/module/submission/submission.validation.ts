import { z } from "zod";

const titleSchema = z
  .string("Title is required!")
  .min(10, "Title must be at least 10 characters")
  .max(100, "Title must not exceed 100 characters");

const descriptionSchema = z
  .string("Title is required!")
  .min(10, "Title must be at least 10 characters")
  .max(100, "Title must not exceed 100 characters");

const githubUrlSchema = z
  .string("Github-Url is required!")
  .url("Invalid github url");

const liveUrlSchema = z.string("Live-Url is required!").url("Invalid live url");

const createSubmissionZodSchema = z.object({
  title: titleSchema,
  description: descriptionSchema,
  githubUrl: githubUrlSchema,
  liveUrl: liveUrlSchema,
});

export const SubmissionValidation = {
  createSubmissionZodSchema,
};

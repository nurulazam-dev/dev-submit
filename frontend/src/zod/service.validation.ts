import { IUpdateServicePayload } from "@/types/service.type";
import { z } from "zod";

export const createServiceZodSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must not exceed 100 characters"),

  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description must not exceed 500 characters"),

  imageUrl: z
    .string()
    .url("Image URL must be a valid URL")
    .nullable()
    .optional(),

  isActive: z.boolean().optional(),
});

export type ICreateServiceFormValues = z.infer<typeof createServiceZodSchema>;

export const updateServiceZodSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must not exceed 100 characters")
    .optional(),

  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description must not exceed 500 characters")
    .optional(),

  imageUrl: z
    .string()
    .url("Image URL must be a valid URL")
    .nullable()
    .optional(),

  isActive: z.boolean().optional(),
}) satisfies z.ZodType<IUpdateServicePayload>;

export type IUpdateServiceFormValues = z.infer<typeof updateServiceZodSchema>;

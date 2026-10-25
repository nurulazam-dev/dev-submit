import { IAdminUpdateUserPayload } from "@/types/users.type";
import { z } from "zod";

export const adminUpdateUserZodSchema = z.object({
  email: z.string().email().optional(),
  phone: z
    .string()
    .trim()
    .min(11, "Phone number must be at least 11 characters")
    .max(14, "Phone number must be at most 14 characters")
    .optional(),
  role: z
    .enum(["ADMIN", "STUDENT"], "Role must be ADMIN or STUDENT")
    .optional(),
  status: z
    .enum(["ACTIVE", "BLOCKED"], "Status must be ACTIVE or BLOCKED")
    .optional(),
  name: z.string().min(2).optional(),
  address: z.string().optional().nullable(),
}) satisfies z.ZodType<IAdminUpdateUserPayload>;

export type IEditUserFormValues = z.infer<typeof adminUpdateUserZodSchema>;

export const updateUserProfileZodSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  address: z.string().max(255).optional().nullable(),
});

export type IUpdateUserProfileFormValues = z.infer<
  typeof updateUserProfileZodSchema
>;

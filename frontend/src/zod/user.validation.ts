import { IAdminUpdateUserPayload } from "@/types/users.type";
import { z } from "zod";

export const adminUpdateUserZodSchema = z.object({
  email: z.string().email().optional(),

  phone: z
    .string()
    .trim()
    .min(11, "Contact number must be at least 11 characters")
    .max(14, "Contact number must be at most 14 characters")
    .optional(),

  role: z
    .enum(["ADMIN", "STUDENT"], {
      error: "Role must be one of ADMIN,MANAGER, STUDENT",
    })
    .optional(),
  status: z
    .enum(["ACTIVE", "BLOCKED"], {
      error: "Status must be one of ACTIVE, BLOCKED",
    })
    .optional(),
}) satisfies z.ZodType<IAdminUpdateUserPayload>;

export type IEditUserFormValues = z.infer<typeof adminUpdateUserZodSchema>;

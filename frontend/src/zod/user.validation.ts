import { IAdminUpdateUserPayload } from "@/types/users.type";
import { z } from "zod";
export type UserRole = "ADMIN" | "MANAGER";

export const registerStaffZodSchema = z.object({
  name: z
    .string("Name is required")
    .min(5, "Name must be at least 3 characters")
    .max(30, "Name must be at most 30 characters"),

  email: z.email("Invalid email"),

  phone: z
    .string("Contact number is required")
    .min(11, "Contact number must be at least 11 characters")
    .max(14, "Contact number must be at most 14 characters"),

  role: z.enum(["ADMIN", "MANAGER"], {
    error: "Role is required (ADMIN or MANAGER)",
  }),

  // address: z
  //   .string("Address is required")
  //   .min(10, "Address must be at least 10 characters")
  //   .max(100, "Address must be at most 100 characters")
  //   .optional(),

  // experience: z
  //   .int("Experience is required")
  //   .nonnegative("Experience can't be negative"),

  // qualification: z
  //   .string("Qualification is required")
  //   .min(2, "Qualification must be at least 2 characters")
  //   .max(50, "Qualification must be at most 50 characters"),

  // designation: z
  //   .string("Designation is required")
  //   .min(2, "Designation must be at least 2 characters")
  //   .max(50, "Designation must be at most 50 characters"),
});

export const adminUpdateUserZodSchema = z.object({
  name: z
    .string()
    .trim()
    .min(5, "Name must be at least 5 characters")
    .max(30, "Name must be at most 30 characters")
    .optional(),
  phone: z
    .string()
    .trim()
    .min(11, "Contact number must be at least 11 characters")
    .max(14, "Contact number must be at most 14 characters")
    .optional(),
  address: z
    .string()
    .trim()
    .max(100, "Address must be at most 100 characters")
    .refine(
      (value) => value.length === 0 || value.length >= 10,
      "Address must be at least 10 characters",
    )
    .optional(),
  role: z
    .enum(
      ["ADMIN", "MANAGER", "SERVICE_PROVIDER", "JOB_CANDIDATE", "CUSTOMER"],
      {
        error:
          "Role must be one of ADMIN, MANAGER, SERVICE_PROVIDER, JOB_CANDIDATE, CUSTOMER",
      },
    )
    .optional(),
  status: z
    .enum(["ACTIVE", "BLOCKED", "DELETED"], {
      error: "Status must be one of ACTIVE, BLOCKED, DELETED",
    })
    .optional(),
  emailVerified: z
    .boolean({
      error: "Email verification status must be either true or false",
    })
    .optional(),
}) satisfies z.ZodType<IAdminUpdateUserPayload>;

export type IRegisterStaffFormValues = z.infer<typeof registerStaffZodSchema>;

export type IEditUserFormValues = z.infer<typeof adminUpdateUserZodSchema>;

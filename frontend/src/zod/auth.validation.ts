import { z } from "zod";

const nameSchema = z
  .string("Name is required!")
  .min(2, "Name must be at least 2 characters")
  .max(100, "Name must not exceed 100 characters");

const emailSchema = z
  .string("Email is required!")
  .email("Invalid email address");

const passwordSchema = z
  .string("Password is required!")
  .min(8, "Password must be at least 8 characters")
  .max(12, "Password must not exceed 12 characters");
// .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
// .regex(/[a-z]/, "Password must contain at least one lowercase letter")
// .regex(/[0-9]/, "Password must contain at least one number")
// .regex(/[@$!%*?&]/, "Password must contain at least one special character (@, $, !, %, *, ?, &)")
const phoneSchema = z
  .string("Phone number is required!")
  .regex(/^\d{11,13}$/, "Phone must be 11-13 digits");

export const loginZodSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export type ILoginPayload = z.infer<typeof loginZodSchema>;

export const registerCustomerZodSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
  phone: phoneSchema,
});
export type IRegisterCustomerPayload = z.infer<
  typeof registerCustomerZodSchema
>;

export const registerJobCandidateZodSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
  phone: phoneSchema,

  cvUrl: z
    .string("CV url is required!")
    .url("CV must be a valid URL")
    .refine(
      (url) => {
        const cleanUrl = url.split("?")[0].toLowerCase();
        return cleanUrl.endsWith(".pdf");
      },
      {
        message: "CV must be a valid PDF file",
      },
    ),
});

export type IRegisterCandidatePayload = z.infer<
  typeof registerJobCandidateZodSchema
>;

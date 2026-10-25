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
  .max(64, "Password must not exceed 64 characters");
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

export const registerStudentZodSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
  phone: phoneSchema,
});

export type IRegisterStudentPayload = z.infer<typeof registerStudentZodSchema>;

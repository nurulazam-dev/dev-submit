import { z } from "zod";

export const createPaymentZodSchema = z.object({
  requestId: z.string().uuid("Request ID is required to initiate payment"),
});

export type ICreatePaymentPayload = z.infer<typeof createPaymentZodSchema>;

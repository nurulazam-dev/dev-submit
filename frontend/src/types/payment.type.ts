/* eslint-disable @typescript-eslint/no-explicit-any */
import { ICostBreakdownPayload } from "./costBreakdown.type";
import { IServiceRequestPayload } from "./serviceRequest.type";

export type PaymentStatus = "PAID" | "PAID" | "UNPAID" | "FAILED";

export interface IPaymentPayload {
  id: string;
  amount: number | string;
  transactionId: string;
  stripeEventId?: string | null;
  stripeCustomerId?: string | null;
  invoiceUrl?: string | null;
  paymentGatewayData?: any;
  status: PaymentStatus;
  createdAt: Date | string;
  updatedAt: Date | string;
  requestId: string;
  serviceRequest?: IServiceRequestPayload;
  costBreakdown?: ICostBreakdownPayload;
}

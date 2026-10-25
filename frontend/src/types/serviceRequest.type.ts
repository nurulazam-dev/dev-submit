import { ICostBreakdownPayload } from "./costBreakdown.type";
import { IPaymentPayload, PaymentStatus } from "./payment.type";
import { IReviewPayload } from "./review.type";
import { IServiceSchedulePayload } from "./schedule.type";
import { IServicePayload } from "./service.type";
import { IServiceProviderPayload } from "./serviceProvider.type";
import { IUserPayload } from "./users.type";

export type ServiceRequestStatus =
  | "PENDING"
  | "ACCEPTED"
  | "REJECTED"
  | "COMPLETED"
  | "CANCELLED";

export interface IServiceRequestPayload {
  id: string;
  customerId: string;
  customer?: IUserPayload;
  providerId?: string | null;
  provider?: IServiceProviderPayload | null;
  serviceId: string;
  service?: IServicePayload;
  scheduleId?: string | null;
  schedule?: IServiceSchedulePayload | null;
  serviceDescription: string;
  serviceAddress: string;
  activePhone: string;
  status: ServiceRequestStatus;
  isDeleted: boolean;
  rejectionReason?: string | null;
  createdAt: Date | string;
  updatedAt: Date | string;
  paymentStatus: PaymentStatus;
  costBreakdown?: ICostBreakdownPayload;
  payment?: IPaymentPayload;
  review?: IReviewPayload | null;
}

export interface IApplyServiceRequestPayload {
  serviceDescription: string;
  serviceAddress: string;
  activePhone: string;
  serviceId?: string | undefined;
}

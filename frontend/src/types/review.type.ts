import { IServiceProviderPayload } from "./serviceProvider.type";
import { IServiceRequestPayload } from "./serviceRequest.type";
import { IUserPayload } from "./users.type";

export interface IReviewPayload {
  id: string;
  requestId: string;
  serviceRequest?: IServiceRequestPayload;
  serviceId: string;
  service?: any; // Service মডেলের টাইপ
  providerId: string;
  serviceProvider?: IServiceProviderPayload;
  customerId: string;
  customer?: IUserPayload;
  rating: number;
  comment: string;
  createdAt: Date | string;
}

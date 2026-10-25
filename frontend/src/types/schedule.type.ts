import { IServiceProviderPayload } from "./serviceProvider.type";
import { IServiceRequestPayload } from "./serviceRequest.type";

export interface IServiceSchedulePayload {
  id: string;
  scheduleDate: Date | string;
  startTime: string;
  endTime: string;
  slotNumber: number;
  isBooked: boolean;
  providerId: string;
  provider?: IServiceProviderPayload;
  serviceRequest?: IServiceRequestPayload | null;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface ICreateServiceSchedulePayload {
  scheduleDate: string;
  startTime: string;
}

import { IServiceRequestPayload } from "./serviceRequest.type";

export interface ICostBreakdownPayload {
  id: string;
  requestId: string;
  serviceRequest?: IServiceRequestPayload;
  // serviceCharge: number | string;
  // productCost: number | string;
  // additionalCost: number | string;
  // totalAmount: number | string;
  serviceCharge: number;
  productCost: number;
  additionalCost: number;
  totalAmount: number;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import { IUserPayload } from "./users.type";

export interface IServiceProviderPayload {
  id: string;
  userId: string;
  user?: IUserPayload;
  serviceType: string;
  bio?: string | null;
  isActive: boolean;
  experience: number;
  designation?: string | null;
  averageRating: number;
  totalReviews: number;

  // Relations
  schedules?: any[];
  reviews?: any[];
}

export interface IUpdateServiceProviderPayload {
  serviceType?: string;
  bio?: string;
  isActive?: boolean;
  experience?: number;
  designation?: string;
}

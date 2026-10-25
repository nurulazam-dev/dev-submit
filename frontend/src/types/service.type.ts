import { IReviewPayload } from "./review.type";
import { IServiceRequestPayload } from "./serviceRequest.type";

export interface IServicePayload {
  id: string;
  name: string;
  description: string;
  imageUrl?: string | null;
  averageRating: number;
  totalReviews: number;
  isActive: boolean;
  _count?: {
    reviews: number;
    serviceRequests: number;
  };
  serviceRequests?: IServiceRequestPayload[];
  reviews?: IReviewPayload[];
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface IUpdateServicePayload {
  id?: string | number;
  name?: string;
  description?: string;
  imageUrl?: string | null;
  isActive?: boolean;
  isDeleted?: boolean;
}

export interface ICreateServicePayload {
  name: string;
  description: string;
  imageUrl?: string | null;
  isActive?: boolean;
}

import { IReviewPayload } from "./review.type";
import { ISubmissionPayload } from "./submission.type";

export type UserRole = "ADMIN" | "STUDENT";
export type UserStatus = "ACTIVE" | "BLOCKED";

export interface IUserPayload {
  id: string;
  name: string;
  email: string;
  address?: string | null;
  phone: string;
  role: UserRole;
  status: UserStatus;
  passwordChangedAt?: Date | string | null;
  createdAt: Date | string;
  submissions?: ISubmissionPayload[];
  reviews?: IReviewPayload[];
  image?: string;
}

export type IUpdateUserPayload = Partial<
  Pick<IUserPayload, "name" | "address">
>;

export interface IAdminUpdateUserPayload {
  id?: string;
  email?: string;
  phone?: string;
  role?: UserRole;
  status?: UserStatus;
  name?: string;
  address?: string | null;
}

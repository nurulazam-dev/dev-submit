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
  createdAt: Date | string;
  submission?: ISubmissionPayload[];
  reviews?: IReviewPayload[];
}

export type IUpdateUserPayload = Partial<
  Pick<IUserPayload, "name" | "phone" | "address">
>;

export interface IAdminUpdateUserPayload {
  id?: string | number;
  name?: string;
  phone?: string;
  address?: string | null;
  role?: UserRole;
  status?: UserStatus;
}

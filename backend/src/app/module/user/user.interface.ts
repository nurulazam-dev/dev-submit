export type UserRole = "ADMIN" | "STUDENT";

export type UserStatus = "ACTIVE" | "BLOCKED";

export interface IUserPayload {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  phone: string;
  address?: string | null;
  passwordChangedAt: Date | string;
  resetOtpHash: string | null;
  resetOtpExpiresAt: Date | string;
  submissions?: any[];
  reviews?: any[];
  createdAt: Date | string;
}

export type IUpdateUserPayload = Partial<
  Pick<IUserPayload, "name" | "address">
>;

export interface IAdminUpdateUserPayload {
  email?: string;
  phone?: string;
  role?: UserRole;
  status?: UserStatus;
}

export type UserRole = "ADMIN" | "STUDENT";

export type UserStatus = "ACTIVE" | "BLOCKED";

export interface IAuthUser {
  id?: string;
  userId: string;
  email: string;
  name: string;
  phone: string;
  address?: string | null;
  role: UserRole;
  status: UserStatus;
  createdAt?: Date | string;
}

export interface ILoginPayload {
  email: string;
  password: string;
}

export interface ILoginResponse {
  success: boolean;
  message: string;
  data?: {
    accessToken: string;
    refreshToken: string;
    user: IAuthUser;
  };
}

export interface IRegisterStudentPayload {
  name: string;
  email: string;
  password: string;
  phone: string;
}

export interface IRefreshTokenResponse {
  success: boolean;
  message: string;
  data?: {
    accessToken: string;
    refreshToken?: string;
  };
}

export interface ICurrentUserResponse {
  success: boolean;
  message: string;
  data: IAuthUser;
}

export interface IChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
}

export interface IForgotPasswordPayload {
  email: string;
}

export interface IResetPasswordPayload {
  email: string;
  otp: string;
  newPassword: string;
}

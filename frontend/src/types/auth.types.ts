export type UserRole = "ADMIN" | "STUDENT";

export type UserStatus = "ACTIVE" | "BLOCKED";

export interface IAuthUser {
  userId: string;
  email: string;
  name: string;
  phone: string;
  role: UserRole;
  status: UserStatus;
}

export interface ILoginPayload {
  email: string;
  password: string;
}

export interface ILoginResponse {
  success: boolean;
  message: string;
  data: {
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
  data: {
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

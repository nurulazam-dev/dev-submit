export interface IRegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface ILoginUserPayload {
  email: string;
  password: string;
}

export interface IChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
}

export type TSensitive = {
  password?: unknown;
  resetOtpHash?: unknown;
  resetOtpExpiresAt?: unknown;
};

export type TTokenUser = {
  id: string;
  role: "ADMIN" | "STUDENT";
  name: string;
  email: string;
  status: "ACTIVE" | "BLOCKED";
};

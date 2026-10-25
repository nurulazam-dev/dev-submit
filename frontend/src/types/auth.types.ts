export interface ILoginResponse {
  token: string;
  accessToken: string;
  refreshToken: string;
  success: boolean;
  message: string;
  user: {
    needPasswordChange: boolean;
    email: string;
    name: string;
    role: string;
    image: string;
    status: string;
    isDeleted: boolean;
    emailVerified: boolean;
  };
}

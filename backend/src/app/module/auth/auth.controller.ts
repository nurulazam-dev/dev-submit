import { Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";
import { AuthService } from "./auth.service";
import status from "http-status";
import { tokenUtils } from "../../utils/token";
import AppError from "../../errorHelpers/AppError";
import { CookieUtils } from "../../utils/cookie";
import { TAuthPayload } from "@/app/interfaces/requestUser.interface";

const registerStudent = catchAsync(async (req: Request, res: Response) => {
  const { user, accessToken, refreshToken } = await AuthService.registerStudent(
    req.body,
  );

  tokenUtils.setAccessTokenCookie(res, accessToken);
  tokenUtils.setRefreshTokenCookie(res, refreshToken);

  sendResponse(res, {
    httpStatusCode: status.CREATED,
    success: true,
    message: "Student registered successfully",
    data: user,
  });
});

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { user, accessToken, refreshToken } = await AuthService.loginUser(
    req.body,
  );

  tokenUtils.setAccessTokenCookie(res, accessToken);
  tokenUtils.setRefreshTokenCookie(res, refreshToken);

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "User logged in successfully",
    data: user,
  });
});

const logoutUser = catchAsync(async (_req: Request, res: Response) => {
  tokenUtils.clearAuthCookies(res);

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "User logged out successfully",
  });
});

const getMe = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.getMe(req.user as TAuthPayload);

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "User profile fetched successfully",
    data: result,
  });
});

const getNewToken = catchAsync(async (req: Request, res: Response) => {
  const token = CookieUtils.getCookie(req, "refreshToken");

  if (!token) {
    throw new AppError(status.UNAUTHORIZED, "Refresh token is missing!");
  }

  const { accessToken, refreshToken } = await AuthService.getNewToken(token);

  tokenUtils.setAccessTokenCookie(res, accessToken);
  tokenUtils.setRefreshTokenCookie(res, refreshToken);

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "New token generated successfully",
  });
});

const forgetPassword = catchAsync(async (req: Request, res: Response) => {
  await AuthService.forgetPassword(req.body.email);

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "If the email exists, a reset OTP has been sent",
  });
});

const resetPassword = catchAsync(async (req: Request, res: Response) => {
  const { email, otp, newPassword } = req.body;

  await AuthService.resetPassword(email, otp, newPassword);

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Password reset successfully",
  });
});

const changePassword = catchAsync(async (req: Request, res: Response) => {
  const { accessToken, refreshToken } = await AuthService.changePassword(
    req.body,
    req.user as TAuthPayload,
  );

  tokenUtils.setAccessTokenCookie(res, accessToken);
  tokenUtils.setRefreshTokenCookie(res, refreshToken);

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Password changed successfully",
  });
});

export const AuthController = {
  registerStudent,
  loginUser,
  logoutUser,
  getMe,
  getNewToken,
  forgetPassword,
  resetPassword,
  changePassword,
};

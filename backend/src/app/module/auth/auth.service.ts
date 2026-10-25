/* eslint-disable @typescript-eslint/no-explicit-any */
import status from "http-status";
import { envVars } from "../../config/env";
import AppError from "../../errorHelpers/AppError";
import { jwtUtils } from "../../utils/jwt";
import { db } from "../../../../prisma/db";
import { TAuthPayload } from "../../interfaces/requestUser.interface";
import { passwordUtils } from "../../utils/password";
import { tokenUtils } from "../../utils/token";
import { Temporal } from "temporal-polyfill";
import {
  IChangePasswordPayload,
  ILoginUserPayload,
  IRegisterPayload,
  TSensitive,
  TTokenUser,
} from "./auth.interface";

const OTP_EXPIRES_IN_MS = 10 * 60 * 1000;

const sanitizeUser = <T extends TSensitive>(user: T) => {
  const { password, resetOtpHash, resetOtpExpiresAt, ...safe } = user;
  return safe;
};

const issueTokens = (user: TTokenUser) => {
  const payload: TAuthPayload = {
    userId: user.id,
    role: user.role ?? "STUDENT",
    name: user.name,
    email: user.email,
    phone: user.phone,
    status: user.status ?? "ACTIVE",
  };

  return {
    accessToken: tokenUtils.createAccessToken(payload),
    refreshToken: tokenUtils.createRefreshToken(payload),
  };
};

const assertUserCanAccess = (user: { status: "ACTIVE" | "BLOCKED" }) => {
  if (user.status === "BLOCKED") {
    throw new AppError(status.FORBIDDEN, "Your account is blocked!");
  }
};

const normalizeEmail = (email: string) => email.trim().toLowerCase();

const registerStudent = async (payload: IRegisterPayload) => {
  const email = normalizeEmail(payload.email);

  const existing = await db.orm.public.User.first({ email });

  if (existing) {
    throw new AppError(status.CONFLICT, "This email is already registered!");
  }

  const user = await db.orm.public.User.create({
    name: payload.name,
    email,
    password: await passwordUtils.hashPassword(payload.password),
    phone: payload.phone,
    role: "STUDENT",
    status: "ACTIVE",
  });

  return { user: sanitizeUser(user), ...issueTokens(user) };
};

const loginUser = async (payload: ILoginUserPayload) => {
  const email = normalizeEmail(payload.email);

  const user = await db.orm.public.User.first({ email });

  if (!user || user.status === "BLOCKED") {
    throw new AppError(status.UNAUTHORIZED, "Invalid email or password!");
  }

  const isMatch = await passwordUtils.comparePassword(
    payload.password,
    user.password,
  );

  if (!isMatch) {
    throw new AppError(status.UNAUTHORIZED, "Invalid email or password!");
  }

  assertUserCanAccess(user);

  return { user: sanitizeUser(user), ...issueTokens(user) };
};

const getMe = async (authUser: TAuthPayload) => {
  const user = await db.orm.public.User.first({ id: authUser.userId });

  if (!user) {
    throw new AppError(status.NOT_FOUND, "User not found!");
  }

  return sanitizeUser(user);
};

const getNewToken = async (refreshToken: string) => {
  const verified = jwtUtils.verifyToken(
    refreshToken,
    envVars.REFRESH_TOKEN_SECRET,
  );

  if (!verified.success || !verified.data) {
    throw new AppError(status.UNAUTHORIZED, "Invalid refresh token!");
  }

  const user = await db.orm.public.User.first({
    id: verified.data.userId as string,
  });

  if (!user || user.status === "BLOCKED") {
    throw new AppError(status.UNAUTHORIZED, "User not found!");
  }

  assertUserCanAccess(user);

  if (passwordUtils.isTokenStale(verified.data.iat, user.passwordChangedAt)) {
    throw new AppError(
      status.UNAUTHORIZED,
      "Password was changed. Please login again!",
    );
  }

  return issueTokens(user);
};

const forgetPassword = async (rawEmail: string) => {
  const email = normalizeEmail(rawEmail);
  const user = await db.orm.public.User.first({ email });

  if (!user || user.status === "BLOCKED") return;

  const otp = passwordUtils.generateOtp();

  await db.orm.public.User.where({ id: user.id }).update({
    resetOtpHash: passwordUtils.hashOtp(otp),
    resetOtpExpiresAt: Temporal.Instant.fromEpochMilliseconds(
      Date.now() + OTP_EXPIRES_IN_MS,
    ),
  });

  // TODO: email service দিয়ে OTP পাঠাতে হবে
  if (envVars.NODE_ENV !== "production") {
    console.log(`[DEV] Password reset OTP for ${email}: ${otp}`);
  }
};

const resetPassword = async (
  rawEmail: string,
  otp: string,
  newPassword: string,
) => {
  const email = normalizeEmail(rawEmail);
  const user = await db.orm.public.User.first({ email });

  const invalid = new AppError(status.BAD_REQUEST, "Invalid or expired OTP!");

  if (
    !user ||
    user.status === "BLOCKED" ||
    !user.resetOtpHash ||
    !user.resetOtpExpiresAt
  ) {
    throw invalid;
  }

  if (user.resetOtpExpiresAt.epochMilliseconds < Date.now()) {
    throw invalid;
  }

  if (!passwordUtils.verifyOtp(otp, user.resetOtpHash)) {
    throw invalid;
  }

  await db.orm.public.User.where({ id: user.id }).update({
    password: await passwordUtils.hashPassword(newPassword),
    passwordChangedAt: Temporal.Now.instant(),
    resetOtpHash: null,
    resetOtpExpiresAt: null,
  });
};

const changePassword = async (
  payload: IChangePasswordPayload,
  authUser: TAuthPayload,
) => {
  const { currentPassword, newPassword } = payload;

  const user = await db.orm.public.User.first({ id: authUser.userId });

  if (!user) {
    throw new AppError(status.NOT_FOUND, "User not found!");
  }

  const isMatch = await passwordUtils.comparePassword(
    currentPassword,
    user.password,
  );

  if (!isMatch) {
    throw new AppError(status.BAD_REQUEST, "Current password is incorrect!");
  }

  if (currentPassword === newPassword) {
    throw new AppError(
      status.BAD_REQUEST,
      "New password must be different from the current password!",
    );
  }

  const updated = await db.orm.public.User.where({ id: user.id }).update({
    password: await passwordUtils.hashPassword(newPassword),
    passwordChangedAt: Temporal.Now.instant(),
  });

  // return issueTokens(updated);
  return issueTokens(updated!);
};

export const AuthService = {
  registerStudent,
  loginUser,
  getMe,
  getNewToken,
  forgetPassword,
  resetPassword,
  changePassword,
};

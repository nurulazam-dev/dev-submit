import { CookieOptions, Response } from "express";
import { SignOptions } from "jsonwebtoken";
import { envVars } from "../config/env";
import { CookieUtils } from "./cookie";
import { jwtUtils } from "./jwt";
import { TAuthPayload } from "../interfaces/requestUser.interface";

const isProd = envVars.NODE_ENV === "production";

const baseCookieOptions: CookieOptions = {
  httpOnly: true,
  secure: isProd,
  sameSite: isProd ? "none" : "lax",
  path: "/",
};

const createAccessToken = (payload: TAuthPayload) =>
  jwtUtils.createToken(payload, envVars.ACCESS_TOKEN_SECRET, {
    expiresIn: envVars.ACCESS_TOKEN_EXPIRES_IN,
  } as SignOptions);

const createRefreshToken = (payload: TAuthPayload) =>
  jwtUtils.createToken(payload, envVars.REFRESH_TOKEN_SECRET, {
    expiresIn: envVars.REFRESH_TOKEN_EXPIRES_IN,
  } as SignOptions);

const setAccessTokenCookie = (res: Response, token: string) => {
  CookieUtils.setCookie(res, "accessToken", token, {
    ...baseCookieOptions,
    maxAge: 15 * 60 * 1000,
  });
};

const setRefreshTokenCookie = (res: Response, token: string) => {
  CookieUtils.setCookie(res, "refreshToken", token, {
    ...baseCookieOptions,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

const clearAuthCookies = (res: Response) => {
  CookieUtils.clearCookie(res, "accessToken", baseCookieOptions);
  CookieUtils.clearCookie(res, "refreshToken", baseCookieOptions);
};

export const tokenUtils = {
  createAccessToken,
  createRefreshToken,
  setAccessTokenCookie,
  setRefreshTokenCookie,
  clearAuthCookies,
};

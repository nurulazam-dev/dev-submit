"use server";

import jwt from "jsonwebtoken";
import { setCookie } from "./cookieUtils";

const getTokenSecondsRemaining = (token: string): number => {
  if (!token) {
    return 0;
  }

  try {
    const decoded = jwt.decode(token);

    if (
      !decoded ||
      typeof decoded === "string" ||
      typeof decoded.exp !== "number"
    ) {
      return 0;
    }

    const remainingSeconds = decoded.exp - Math.floor(Date.now() / 1000);

    return Math.max(0, remainingSeconds);
  } catch (error: unknown) {
    console.error("Error decoding token:", error);
    return 0;
  }
};

export const setTokenInCookies = async (
  name: string,
  token: string,
  fallbackMaxAgeInSeconds = 60 * 60 * 24,
): Promise<void> => {
  const remainingSeconds = getTokenSecondsRemaining(token);

  await setCookie(
    name,
    token,
    remainingSeconds > 0 ? remainingSeconds : fallbackMaxAgeInSeconds,
  );
};

export async function isTokenExpiringSoon(
  token: string,
  thresholdInSeconds = 300,
): Promise<boolean> {
  const remainingSeconds = getTokenSecondsRemaining(token);

  return remainingSeconds > 0 && remainingSeconds <= thresholdInSeconds;
}

export async function isTokenExpired(token: string): Promise<boolean> {
  return getTokenSecondsRemaining(token) === 0;
}

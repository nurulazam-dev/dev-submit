import { NextFunction, Request, Response } from "express";
import status from "http-status";
import { envVars } from "../config/env";
import AppError from "../errorHelpers/AppError";
import { CookieUtils } from "../utils/cookie";
import { jwtUtils } from "../utils/jwt";
import { db } from "prisma/db";
import { passwordUtils } from "../utils/password";

export const checkAuth =
  (...authRoles: string[]) =>
  async (req: Request, _res: Response, next: NextFunction) => {
    try {
      const accessToken =
        CookieUtils.getCookie(req, "accessToken") ||
        req.headers.authorization?.replace("Bearer ", "");

      if (!accessToken) {
        throw new AppError(status.UNAUTHORIZED, "Unauthorized access!");
      }

      const verified = jwtUtils.verifyToken(
        accessToken,
        envVars.ACCESS_TOKEN_SECRET,
      );

      if (!verified.success || !verified.data) {
        throw new AppError(
          status.UNAUTHORIZED,
          "Unauthorized access! Invalid or expired access token.",
        );
      }

      /*  const user = await db.orm.public.User.where({
        id: verified.data.userId as string,
      })
        .select("id", "email", "name", "role", "status")
        .first(); */

      const user = await db.orm.public.User.first({
        id: verified.data.userId as string,
      });

      if (!user) {
        throw new AppError(
          status.UNAUTHORIZED,
          "Unauthorized access! User not found.",
        );
      }

      if (user.status === "BLOCKED") {
        throw new AppError(
          status.UNAUTHORIZED,
          "Unauthorized access! User is blocked.",
        );
      }

      if (
        passwordUtils.isTokenStale(verified.data.iat, user.passwordChangedAt)
      ) {
        throw new AppError(
          status.UNAUTHORIZED,
          "Password was changed. Please login again!",
        );
      }

      if (authRoles.length > 0 && !authRoles.includes(user.role)) {
        throw new AppError(
          status.FORBIDDEN,
          "Forbidden access! You do not have permission to access this resource.",
        );
      }

      req.user = {
        userId: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
      };

      next();
    } catch (error) {
      next(error);
    }
  };

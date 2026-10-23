/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import status from "http-status";
import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { z } from "zod";
import { envVars } from "../config/env";
import AppError from "../errorHelpers/AppError";
import { handleDatabaseError } from "../errorHelpers/handleDatabaseError";
import { handleZodError } from "../errorHelpers/handleZodError";
import { TErrorResponse, TErrorSources } from "../interfaces/error.interface";

const isDev = envVars.NODE_ENV === "development";

// Circular reference এ JSON crash এড়াতে শুধু দরকারি ফিল্ড পাঠানো হয় (শুধু development এ)
const serializeError = (err: any) => {
  if (!err || typeof err !== "object") return err;

  return {
    name: err.name,
    message: err.message,
    code: err.code,
    sqlState: err.sqlState,
    constraint: err.constraint,
    table: err.table,
    column: err.column,
    meta: err.meta,
    details: err.details,
    cause: err.cause?.message,
  };
};

export const globalErrorHandler = (
  err: any,
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  // response আগেই শুরু হয়ে গেলে Express এর default handler এর হাতে ছেড়ে দিন
  if (res.headersSent) {
    return next(err);
  }

  if (isDev) {
    console.log("Err from GlobalErrorHandler :", err);
  }

  let statusCode: number = status.INTERNAL_SERVER_ERROR;
  let message = "Internal server error";
  let errorSources: TErrorSources[] = [];
  const stack: string | undefined = err?.stack;

  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
    errorSources = [{ path: "", message: err.message }];
  } else if (err instanceof z.ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError.statusCode as number;
    message = simplifiedError.message;
    errorSources = [...simplifiedError.errorSources];
  } else if (err instanceof TokenExpiredError) {
    statusCode = status.UNAUTHORIZED;
    message = "Token has expired";
  } else if (err instanceof JsonWebTokenError) {
    statusCode = status.UNAUTHORIZED;
    message = "Invalid token";
  } else if (err?.type === "entity.parse.failed") {
    statusCode = status.BAD_REQUEST;
    message = "Invalid JSON in request body";
  } else if (err?.type === "entity.too.large") {
    statusCode = status.REQUEST_ENTITY_TOO_LARGE;
    message = "Request body is too large";
  } else {
    const dbError = handleDatabaseError(err);

    if (dbError) {
      statusCode = dbError.statusCode;
      message = dbError.message;
      errorSources = [...dbError.errorSources];
    } else if (err instanceof Error) {
      // অজানা error এর আসল message production এ লুকানো থাকবে
      message = isDev ? err.message : "Internal server error";
    }
  }

  if (errorSources.length === 0) {
    errorSources = [{ path: "", message }];
  }

  if (!isDev && statusCode >= 500) {
    console.error("Server error:", err);
  }

  const errorResponse: TErrorResponse = {
    success: false,
    message,
    errorSources,
    error: isDev ? serializeError(err) : undefined,
    stack: isDev ? stack : undefined,
  };

  res.status(statusCode).json(errorResponse);
};

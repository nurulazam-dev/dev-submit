/* eslint-disable @typescript-eslint/no-explicit-any */
import { isStructuredError } from "@prisma/orm-postgres/utils/structured-error";
import status from "http-status";
import { TErrorResponse } from "../interfaces/error.interface";

export type TSimplifiedError = Required<
  Pick<TErrorResponse, "statusCode" | "message" | "errorSources">
>;

type TSqlStateRule = { statusCode: number; message: string };

const SQLSTATE_RULES: Record<string, TSqlStateRule> = {
  "23505": {
    statusCode: status.CONFLICT,
    message: "Duplicate value: this record already exists",
  },
  "23503": {
    statusCode: status.CONFLICT,
    message: "Related record constraint failed",
  },
  "23001": {
    statusCode: status.CONFLICT,
    message: "This record is still in use by another record",
  },
  "23502": {
    statusCode: status.BAD_REQUEST,
    message: "A required value is missing",
  },
  "23514": {
    statusCode: status.BAD_REQUEST,
    message: "A value violates a database rule",
  },
  "22P02": { statusCode: status.BAD_REQUEST, message: "Invalid value format" },
  "22001": { statusCode: status.BAD_REQUEST, message: "A value is too long" },
  "22003": {
    statusCode: status.BAD_REQUEST,
    message: "A numeric value is out of range",
  },
  "22007": {
    statusCode: status.BAD_REQUEST,
    message: "Invalid date or time format",
  },
  "40001": {
    statusCode: status.CONFLICT,
    message: "Conflicting update, please retry",
  },
  "40P01": {
    statusCode: status.CONFLICT,
    message: "Conflicting update, please retry",
  },
  "57014": {
    statusCode: status.GATEWAY_TIMEOUT,
    message: "Database query timed out",
  },
  "42P01": {
    statusCode: status.INTERNAL_SERVER_ERROR,
    message: "Database schema is out of date",
  },
  "42703": {
    statusCode: status.INTERNAL_SERVER_ERROR,
    message: "Database schema is out of date",
  },
};

const getErrorChain = (err: unknown): any[] => {
  const chain: any[] = [];
  let current: any = err;

  while (current && typeof current === "object" && chain.length < 5) {
    chain.push(current);
    current = current.cause;
  }

  return chain;
};

const isSqlError = (e: any) =>
  typeof e.sqlState === "string" && e.sqlState.length === 5;

const handleSqlError = (e: any): TSimplifiedError => {
  const sqlState: string = e.sqlState;
  const column = typeof e.column === "string" ? e.column : "";

  const rule = SQLSTATE_RULES[sqlState];

  if (rule) {
    const message =
      sqlState === "23505" && column
        ? `${column} already exists`
        : rule.message;

    return {
      statusCode: rule.statusCode,
      message,
      errorSources: [{ path: column, message }],
    };
  }

  const sqlClass = sqlState.slice(0, 2);

  if (sqlClass === "08" || sqlClass === "53") {
    const message = "Database is temporarily unavailable";
    return {
      statusCode: status.SERVICE_UNAVAILABLE,
      message,
      errorSources: [{ path: "", message }],
    };
  }

  if (sqlClass === "22" || sqlClass === "23") {
    const message = "Invalid data provided";
    return {
      statusCode: status.BAD_REQUEST,
      message,
      errorSources: [{ path: column, message }],
    };
  }

  const message = "Database error";
  return {
    statusCode: status.INTERNAL_SERVER_ERROR,
    message,
    errorSources: [{ path: "", message }],
  };
};

const handleStructuredError = (e: any): TSimplifiedError => {
  const code = typeof e.code === "string" ? e.code : "";

  if (code === "RUNTIME.NO_ROWS") {
    const message = "Record not found";
    return {
      statusCode: status.NOT_FOUND,
      message,
      errorSources: [{ path: "", message }],
    };
  }

  if (code.startsWith("DRIVER.")) {
    const message = "Database connection problem";
    return {
      statusCode: status.SERVICE_UNAVAILABLE,
      message,
      errorSources: [{ path: "", message }],
    };
  }

  const message = "Database error";
  return {
    statusCode: status.INTERNAL_SERVER_ERROR,
    message,
    errorSources: [{ path: "", message }],
  };
};

export const handleDatabaseError = (err: unknown): TSimplifiedError | null => {
  const chain = getErrorChain(err);

  const sqlError = chain.find(isSqlError);
  if (sqlError) return handleSqlError(sqlError);

  const structured = chain.find((e) => isStructuredError(e));
  if (structured) return handleStructuredError(structured);

  return null;
};

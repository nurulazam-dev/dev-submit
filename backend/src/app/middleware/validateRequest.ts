import { NextFunction, Request, Response } from "express";
import { z } from "zod";

export const validateRequest = (zodSchema: z.ZodTypeAny) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (req.body?.data && typeof req.body.data === "string") {
      try {
        req.body = JSON.parse(req.body.data);
      } catch (err) {
        return next(err);
      }
    }

    const parsedResult = zodSchema.safeParse(req.body);

    if (!parsedResult.success) {
      return next(parsedResult.error);
    }

    req.body = parsedResult.data;

    return next();
  };
};

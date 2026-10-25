import jwt, { type JwtPayload } from "jsonwebtoken";

type VerifyTokenResult =
  | {
      success: true;
      data: JwtPayload | string;
    }
  | {
      success: false;
      message: string;
      error: unknown;
    };

const verifyToken = (token: string, secret: string): VerifyTokenResult => {
  try {
    const decoded = jwt.verify(token, secret);

    return {
      success: true,
      data: decoded,
    };
  } catch (error: unknown) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Token verification failed",
      error,
    };
  }
};

const decodedToken = (token: string): JwtPayload | string | null => {
  return jwt.decode(token);
};

export const jwtUtils = {
  verifyToken,
  decodedToken,
};

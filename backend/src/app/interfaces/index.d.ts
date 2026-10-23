import { TAuthPayload } from "./requestUser.interface";

declare global {
  namespace Express {
    interface Request {
      user?: TAuthPayload;
    }
  }
}

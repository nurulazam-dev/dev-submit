import express, { Application, Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { envVars } from "./app/config/env";
import qs from "qs";
import { IndexRoutes } from "./app/routes";
import { notFound } from "./app/middleware/notFound";
import { globalErrorHandler } from "./app/middleware/globalErrorHandler";
import helmet from "helmet";

const app: Application = express();

app.set("query parser", (str: string) => qs.parse(str));

app.use(helmet());

app.use(
  cors({
    origin: [
      envVars.FRONTEND_URL,
      "http://localhost:3000",
      "http://localhost:5000",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization", "stripe-signature"],
  }),
);

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "1mb" }));

app.use("/api/v1", IndexRoutes);

app.get("/", (_req: Request, res: Response) => {
  res.send("Dev Submit API is running...");
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;

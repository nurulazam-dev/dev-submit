import "dotenv/config";
import postgres from "@prisma/orm-postgres/runtime";
import type { Contract } from "./contract";
import contractJson from "./contract.json" with { type: "json" };
import { envVars } from "@/app/config/env";

export const db = postgres<Contract>({
  contractJson,
  // url: process.env['DATABASE_URL']!,
  url: envVars.DATABASE_URL,
});

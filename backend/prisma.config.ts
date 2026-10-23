import "dotenv/config";
import { definePrismaConfig } from "@prisma/cli-engine";
import { defineConfig as ormConfig } from "@prisma/orm-postgres/config";
import { envVars } from "./src/app/config/env";

export default definePrismaConfig({
  orm: ormConfig({
    // contract: "./src/prisma/contract.prisma",
    contract: "./prisma/contract.prisma",
    db: {
      // connection: process.env["DATABASE_URL"]!,
      connection: envVars.DATABASE_URL,
    },
  }),
});

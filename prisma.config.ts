import "dotenv/config";
import { defineConfig } from "prisma/config";

// Prisma 7 moved the Migrate/CLI connection URL out of schema.prisma into this
// config file. The runtime PrismaClient uses a driver adapter (see lib/db/prisma.ts).
// A fallback keeps `prisma generate` working without a live DB (the app runs on
// mock data); real commands (db push/migrate/seed) use the DATABASE_URL from .env.
const url =
  process.env.DATABASE_URL ??
  "postgresql://user:password@localhost:5432/ai_tutor?schema=public";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url,
  },
});

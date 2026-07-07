import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

// Reuse the Prisma client across hot-reloads in development.
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Prisma 7 runs without the Rust query engine, so the client connects through a
// driver adapter. Postgres uses @prisma/adapter-pg with the DATABASE_URL.
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL ?? "",
});

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

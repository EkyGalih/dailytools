import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getPrismaClient = async () => {
  const { PrismaClient } = await import("@prisma/client");
  return new PrismaClient({ adapter });
};

import type { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

if (!globalForPrisma.prisma) {
  getPrismaClient().then(client => {
    globalForPrisma.prisma = client;
  });
}

export const prisma = globalForPrisma.prisma;
export default prisma;
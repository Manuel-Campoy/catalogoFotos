import { PrismaClient } from '@prisma/client';
import { env } from './env';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: env.isDevelopment ? ['query', 'error', 'warn'] : ['error'],
  });

if (env.isDevelopment) globalForPrisma.prisma = prisma;

process.on('SIGTERM', async () => {
  await prisma.$disconnect();
});

export default prisma;
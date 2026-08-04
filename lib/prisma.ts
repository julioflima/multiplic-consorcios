import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as typeof globalThis & {
  prisma?: PrismaClient
}

const datasourceUrl = process.env.PRISMA_DATABASE_URL ?? process.env.POSTGRES_URL

if (!datasourceUrl) {
  throw new Error('PRISMA_DATABASE_URL or POSTGRES_URL must be configured.')
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasourceUrl,
  })

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}

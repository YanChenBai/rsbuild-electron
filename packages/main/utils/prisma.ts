import path from 'node:path'
import process from 'node:process'
import { is } from '@electron-toolkit/utils'
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }
const dbPath = is.dev ? 'dev.db' : path.join(process.resourcesPath, 'database/data.db')

export const prisma
  = globalForPrisma.prisma || new PrismaClient({
    datasources: {
      db: {
        url: `file:${dbPath}`,
      },
    },
  })

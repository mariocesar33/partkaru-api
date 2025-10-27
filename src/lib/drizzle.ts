import { drizzle } from "drizzle-orm/postgres-js"
import { env } from "../env"

export const db = drizzle(
  `postgresql://${env.DATABASE_USER}:${env.DATABASE_PASSWORD}@localhost:5432/${env.DATABASE_NAME}`,
  { logger: true }
)

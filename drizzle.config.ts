import { defineConfig } from "drizzle-kit"
import { env } from "./src/env"

export default defineConfig({
  out: "./drizzle",
  schema: "./src/database/schema/index.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: `postgresql://${env.DATABASE_USER}:${env.DATABASE_PASSWORD}@localhost:5432/${env.DATABASE_NAME}`,
  },
})

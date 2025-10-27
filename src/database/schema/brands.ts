import { pgTable, varchar, text, boolean } from "drizzle-orm/pg-core"
import { createId } from "@paralleldrive/cuid2"
import { relations } from "drizzle-orm"
import { models } from "./models"

export const brands = pgTable("brands", {
  id: text("id")
    .$defaultFn(() => createId())
    .primaryKey(),
  name: varchar("name", { length: 50 }).notNull().unique(),
  popular: boolean("popular").default(false).notNull(),
  countryOrigin: varchar("country_origin", { length: 50 }),
})

export const brandsRelations = relations(brands, ({ many }) => {
  return {
    brandModels: many(models),
  }
})

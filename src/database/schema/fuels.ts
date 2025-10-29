import { pgTable, text, varchar } from "drizzle-orm/pg-core"
import { createId } from "@paralleldrive/cuid2"
import { relations } from "drizzle-orm"
import { engines } from "./engines"

export const fuels = pgTable("fuels", {
  id: text("id")
    .$defaultFn(() => createId())
    .primaryKey(),
  name: varchar("name", { length: 50 }).notNull().unique(),
})

export const fuelsRelations = relations(fuels, ({ many }) => {
  return {
    fuelEngines: many(engines),
  }
})

export type DrizzleInsertFuel = typeof fuels.$inferInsert
export type DrizzleSelectFuel = typeof fuels.$inferSelect

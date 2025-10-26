import { pgTable, varchar, text } from "drizzle-orm/pg-core"
import { createId } from "@paralleldrive/cuid2"
import { relations } from "drizzle-orm"

export const combSystems = pgTable("comb_systems", {
  id: text("id")
    .$defaultFn(() => createId())
    .primaryKey(),
  description: varchar("name", { length: 50 }).notNull().unique(),
})

export const combSystemsRelations = relations(combSystems, ({ one }) => {
  return {}
})

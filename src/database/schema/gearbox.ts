import { pgTable, varchar, text, integer } from "drizzle-orm/pg-core"
import { createId } from "@paralleldrive/cuid2"
import { relations } from "drizzle-orm"

export const gearboxes = pgTable("gearboxes", {
  id: text("id")
    .$defaultFn(() => createId())
    .primaryKey(),
  code: text("code").unique().notNull(),
  transmissionType: text("transmission_type").notNull(),
  speedNumber: integer("speed_number").notNull(),
})

export const gearboxRelations = relations(gearboxes, ({ one }) => {
  return {}
})

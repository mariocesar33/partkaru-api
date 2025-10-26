import { pgTable, text, varchar } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"
import { createId } from "@paralleldrive/cuid2"

export const carBodies = pgTable("car_bodies", {
  id: text("id")
    .$defaultFn(() => createId())
    .primaryKey(),
  name: varchar("name", { length: 50 }).notNull().unique(),
})

export const carBodiesRelations = relations(carBodies, ({ one }) => {
  return {}
})

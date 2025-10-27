import { pgTable, text, varchar } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"
import { createId } from "@paralleldrive/cuid2"
import { modifications } from "./modifications"

export const carBodies = pgTable("car_bodies", {
  id: text("id")
    .$defaultFn(() => createId())
    .primaryKey(),
  name: varchar("name", { length: 50 }).notNull().unique(),
})

export const carBodiesRelations = relations(carBodies, ({ many }) => {
  return {
    modifications: many(modifications, {
      relationName: "car_body_versions", // ← ADICIONE
    }),
  }
})

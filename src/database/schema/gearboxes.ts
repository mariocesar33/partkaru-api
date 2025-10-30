import { pgTable, text, integer } from "drizzle-orm/pg-core"
import { createId } from "@paralleldrive/cuid2"
import { relations } from "drizzle-orm"
import { modificationsBoxes } from "./modification-box"

export const gearboxes = pgTable("gearboxes", {
  id: text("id")
    .$defaultFn(() => createId())
    .primaryKey(),
  code: text("code").unique().notNull(), //GBX-001, GBX-002, etc.
  transmissionType: text("transmission_type").notNull(), //manual, automatic, cvt, semi-automatic
  speedNumber: integer("speed_number").notNull(),
  manufacturer: text("manufacturer"),
})

export const gearboxRelations = relations(gearboxes, ({ many }) => {
  return {
    modificationsBoxes: many(modificationsBoxes, {
      relationName: "modification_boxes_gearbox",
    }),
  }
})

export type DrizzleInsertGearbox = typeof gearboxes.$inferInsert
export type DrizzleSelectGearbox = typeof gearboxes.$inferSelect

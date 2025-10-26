import { pgTable, text, integer, timestamp } from "drizzle-orm/pg-core"
import { createId } from "@paralleldrive/cuid2"
import { relations } from "drizzle-orm"
import { fuels } from "./fuels"
import { combSystems } from "./comb-systems"

export const engines = pgTable("engines", {
  id: text("id")
    .$defaultFn(() => createId())
    .primaryKey(),
  fuelId: text("fuel_id").references(() => fuels.id, {
    onDelete: "set null",
  }),
  combSystemsId: text("comb_systems_id").references(() => combSystems.id, {
    onDelete: "set null",
  }),
  engineCode: text("engine_code").notNull().unique(),
  powerKW: integer("power_kw"),
  powerCV: integer("power_cv"),
  displacementCC: integer("displacement_cc").notNull(),
  numberOfCylinders: integer("number_of_cylinders").notNull(),
  valvesPerCylinder: integer("valves_per _cylinder").notNull(),
  startDate: timestamp("created_at").notNull(),
  endDate: timestamp("created_at"),
})

export const enginesRelations = relations(engines, ({ one }) => {
  return {}
})

import { pgTable, text, integer, timestamp } from "drizzle-orm/pg-core"
import { createId } from "@paralleldrive/cuid2"
import { relations } from "drizzle-orm"
import { fuels } from "./fuels"
import { combSystems } from "./comb-systems"
import { modifications } from "./modifications"

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
  valvesPerCylinder: integer("valves_per_cylinder").notNull(),
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date"),
})

export const enginesRelations = relations(engines, ({ one, many }) => {
  return {
    fuel: one(fuels, {
      fields: [engines.fuelId],
      references: [fuels.id],
      relationName: "engines_fuel",
    }),
    combSystem: one(combSystems, {
      fields: [engines.combSystemsId],
      references: [combSystems.id],
      relationName: "engines_comb_system",
    }),
    modifications: many(modifications, {
      relationName: "engine_car_versions",
    }),
  }
})

export type DrizzleInsertEngine = typeof engines.$inferInsert
export type DrizzleSelectEngine = typeof engines.$inferSelect

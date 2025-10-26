import { pgTable, text } from "drizzle-orm/pg-core"
import { createId } from "@paralleldrive/cuid2"
import { relations } from "drizzle-orm"

export const carInTheGarage = pgTable("car-in-the-garage", {
  id: text("id")
    .$defaultFn(() => createId())
    .primaryKey(),
  vin: text("name"),
  licensePlate: text("license_plate"),
})

export const carInTheGarageRelations = relations(carInTheGarage, ({ one }) => {
  return {}
})

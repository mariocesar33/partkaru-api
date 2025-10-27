import { pgTable, timestamp, text } from "drizzle-orm/pg-core"
import { createId } from "@paralleldrive/cuid2"
import { relations } from "drizzle-orm"
import { models } from "./models"
import { engines } from "./engines"
import { carBodies } from "./car-bodies"
import { propulsions } from "./propulsions"
import { modificationsBoxes } from "./modification-box"

export const modifications = pgTable("modifications", {
  id: text("id")
    .$defaultFn(() => createId())
    .primaryKey(),
  modelId: text("model_id").references(() => models.id, {
    onDelete: "set null",
  }),
  engineId: text("engine_id").references(() => engines.id, {
    onDelete: "set null",
  }),
  carBodyId: text("car_body_id").references(() => carBodies.id, {
    onDelete: "set null",
  }),
  propulsionId: text("propulsion_id").references(() => propulsions.id, {
    onDelete: "set null",
  }),
  versionName: text("version_name").notNull(),
  versionCode: text("version_code"),
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date"),
})

export const modificationsRelations = relations(
  modifications,
  ({ one, many }) => {
    return {
      model: one(models, {
        fields: [modifications.modelId],
        references: [models.id],
        relationName: "model_versions",
      }),
      engine: one(engines, {
        fields: [modifications.engineId],
        references: [engines.id],
        relationName: "engine_car_versions",
      }),
      carBody: one(carBodies, {
        fields: [modifications.carBodyId],
        references: [carBodies.id],
        relationName: "car_body_versions",
      }),
      propulsion: one(propulsions, {
        fields: [modifications.propulsionId],
        references: [propulsions.id],
        relationName: "propulsion_versions",
      }),
      modificationsBoxes: many(modificationsBoxes, {
        relationName: "modification_boxes_modification",
      }),
    }
  }
)

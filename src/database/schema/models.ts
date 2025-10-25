import { pgTable, varchar, text } from "drizzle-orm/pg-core"
import { createId } from "@paralleldrive/cuid2"
import { brands } from "./brands"
import { relations } from "drizzle-orm"

export const models = pgTable("models", {
  id: text("id")
    .$defaultFn(() => createId())
    .primaryKey(),
  brandId: text("brand_id").references(() => brands.id, {
    onDelete: "cascade",
  }),
  name: varchar("name", { length: 50 }).notNull().unique(),
  generation: text("generation"),
})

export const modelsRelations = relations(models, ({ one }) => {
  return {
    brand: one(brands, {
      fields: [models.brandId],
      references: [brands.id],
      relationName: "models_brand",
    }),
  }
})

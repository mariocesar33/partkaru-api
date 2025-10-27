import { pgTable, varchar, text } from "drizzle-orm/pg-core"
import { createId } from "@paralleldrive/cuid2"
import { brands } from "./brands"
import { relations } from "drizzle-orm"
import { modifications } from "./modifications"

export const models = pgTable("models", {
  id: text("id")
    .$defaultFn(() => createId())
    .primaryKey(),
  brandId: text("brand_id").references(() => brands.id, {
    onDelete: "set null",
  }),
  name: varchar("name", { length: 50 }).notNull().unique(),
  generation: text("generation"),
})

export const modelsRelations = relations(models, ({ one, many }) => {
  return {
    brand: one(brands, {
      fields: [models.brandId],
      references: [brands.id],
      relationName: "models_brand",
    }),
    modifications: many(modifications, {
      relationName: "model_versions", // ← ADICIONE ESTA LINHA
    }),
  }
})

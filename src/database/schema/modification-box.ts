import { pgTable, text, primaryKey } from "drizzle-orm/pg-core"
import { modifications } from "./modifications"
import { gearboxes } from "./gearboxes"
import { relations } from "drizzle-orm"

export const modificationsBoxes = pgTable(
  "modification_boxes",
  {
    modificationId: text("modification_id")
      .notNull()
      .references(() => modifications.id),
    gearboxId: text("gearbox_id")
      .notNull()
      .references(() => gearboxes.id),
  },
  (t) => [primaryKey({ columns: [t.modificationId, t.gearboxId] })]
)

export const modificationBoxRelations = relations(
  modificationsBoxes,
  ({ one }) => {
    return {
      modification: one(modifications, {
        fields: [modificationsBoxes.modificationId],
        references: [modifications.id],
        relationName: "modification_boxes_modification",
      }),
      gearbox: one(gearboxes, {
        fields: [modificationsBoxes.gearboxId],
        references: [gearboxes.id],
        relationName: "modification_boxes_gearbox",
      }),
    }
  }
)

import { integer, pgTable, varchar, text, boolean } from "drizzle-orm/pg-core"
import { createId } from "@paralleldrive/cuid2"

export const brand = pgTable("users", {
  id: text("id")
    .$defaultFn(() => createId())
    .primaryKey(),
  name: varchar("name", { length: 50 }).notNull().unique(),
  popular: boolean("popular").default(false).notNull(),
  countryOrigin: varchar("country_origin", { length: 50 }),
})

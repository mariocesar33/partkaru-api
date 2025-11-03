import { db } from "@/lib/drizzle"
import type { ModificationsRepository } from "../modifications-repository"
import {
  modifications,
  type DrizzleInsertModifications,
  type DrizzleSelectModifications,
} from "@/database/schema"
import { eq } from "drizzle-orm"

export class DrizzleModificationsRepository implements ModificationsRepository {
  async create(
    data: DrizzleInsertModifications
  ): Promise<DrizzleSelectModifications> {
    const [newModification] = await db
      .insert(modifications)
      .values(data)
      .returning()

    return newModification
  }

  async save(
    modification: DrizzleSelectModifications
  ): Promise<DrizzleSelectModifications> {
    const [updatedModification] = await db
      .update(modifications)
      .set(modification)
      .where(eq(modifications.id, modification.id))
      .returning()

    return updatedModification
  }

  async delete(id: string): Promise<void> {
    await db.delete(modifications).where(eq(modifications.id, id))
  }

  async findById(id: string): Promise<DrizzleSelectModifications | null> {
    const [engine] = await db
      .select()
      .from(modifications)
      .where(eq(modifications.id, id))
      .limit(1)

    return engine || null
  }
}

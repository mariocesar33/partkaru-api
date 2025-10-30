import {
  combSystems,
  type DrizzleInsertCombSystems,
  type DrizzleSelectCombSystems,
} from "@/database/schema"
import type { CombSystemsRepository } from "../comb-systems-repository"
import { db } from "@/lib/drizzle"
import { eq } from "drizzle-orm"

export class DrizzleCombSystemsRepository implements CombSystemsRepository {
  async create(
    data: DrizzleInsertCombSystems
  ): Promise<DrizzleSelectCombSystems> {
    const [newCombSystems] = await db
      .insert(combSystems)
      .values(data)
      .returning()

    return newCombSystems
  }

  async save(
    combSystem: DrizzleSelectCombSystems
  ): Promise<DrizzleSelectCombSystems> {
    const { id, ...dataToUpdate } = combSystem

    const [updatedCombSystem] = await db
      .update(combSystems)
      .set(dataToUpdate)
      .where(eq(combSystems.id, id))
      .returning()

    if (!updatedCombSystem) {
      throw new Error(`combSystem with ID ${id} not found for update.`)
    }

    return updatedCombSystem
  }

  async delete(id: string): Promise<void> {
    await db.delete(combSystems).where(eq(combSystems.id, id))
  }

  async findById(id: string): Promise<DrizzleSelectCombSystems | null> {
    const [combSystem] = await db
      .select()
      .from(combSystems)
      .where(eq(combSystems.id, id))
      .limit(1)

    return combSystem || null
  }

  async getAllCombSystems(): Promise<DrizzleSelectCombSystems[]> {
    const allCombSystems = await db.select().from(combSystems)

    return allCombSystems
  }
}

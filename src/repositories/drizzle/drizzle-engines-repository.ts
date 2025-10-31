import {
  engines,
  type DrizzleInsertEngine,
  type DrizzleSelectEngine,
} from "@/database/schema"
import type { EnginesRepository } from "../engines-repository"
import { db } from "@/lib/drizzle"
import { eq } from "drizzle-orm"

export class DrizzleEnginesRepository implements EnginesRepository {
  async create(data: DrizzleInsertEngine): Promise<DrizzleSelectEngine> {
    const [newEngine] = await db.insert(engines).values(data).returning()

    return newEngine
  }

  async save(engine: DrizzleSelectEngine): Promise<DrizzleSelectEngine> {
    const { id, ...dataToUpdate } = engine

    const [updatedEngine] = await db
      .update(engines)
      .set(dataToUpdate)
      .where(eq(engines.id, id))
      .returning()

    if (!updatedEngine) {
      throw new Error(`Engine with ID ${id} not found for update.`)
    }

    return updatedEngine
  }

  async delete(id: string): Promise<void> {
    await db.delete(engines).where(eq(engines.id, id))
  }

  async findById(id: string): Promise<DrizzleSelectEngine | null> {
    const [engine] = await db
      .select()
      .from(engines)
      .where(eq(engines.id, id))
      .limit(1)

    return engine || null
  }
}

import {
  gearboxes,
  type DrizzleInsertGearbox,
  type DrizzleSelectGearbox,
} from "@/database/schema"
import type { GearboxesRepository } from "../gearboxes-repository"
import { db } from "@/lib/drizzle"
import { eq } from "drizzle-orm"

export class DrizzleGearboxesRepository implements GearboxesRepository {
  async create(data: DrizzleInsertGearbox): Promise<DrizzleSelectGearbox> {
    const [newGearbox] = await db.insert(gearboxes).values(data).returning()

    return newGearbox
  }

  async save(gearboxe: DrizzleSelectGearbox): Promise<DrizzleSelectGearbox> {
    const { id, ...dataToUpdate } = gearboxe

    const [updatedGearbox] = await db
      .update(gearboxes)
      .set(dataToUpdate)
      .where(eq(gearboxes.id, id))
      .returning()

    if (!updatedGearbox) {
      throw new Error(`Gearbox with ID ${id} not found for update.`)
    }

    return updatedGearbox
  }

  async delete(id: string): Promise<void> {
    await db.delete(gearboxes).where(eq(gearboxes.id, id))
  }

  async findById(id: string): Promise<DrizzleSelectGearbox | null> {
    const [gearbox] = await db
      .select()
      .from(gearboxes)
      .where(eq(gearboxes.id, id))
      .limit(1)

    return gearbox || null
  }

  async getAllGearboxes(): Promise<DrizzleSelectGearbox[]> {
    const allGearboxes = await db.select().from(gearboxes)

    return allGearboxes
  }
}

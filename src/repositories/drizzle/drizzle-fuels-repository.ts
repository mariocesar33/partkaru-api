import {
  fuels,
  type DrizzleInsertFuel,
  type DrizzleSelectFuel,
} from "@/database/schema"
import type { FuelDTO, FuelsRepository } from "../fuels-repository"
import { db } from "@/lib/drizzle"
import { eq } from "drizzle-orm"

export class DrizzleFuelsRepository implements FuelsRepository {
  async create(data: DrizzleInsertFuel): Promise<DrizzleSelectFuel> {
    const [newFuel] = await db.insert(fuels).values(data).returning()

    return newFuel
  }

  async save(fuel: DrizzleSelectFuel): Promise<DrizzleSelectFuel> {
    const [updatedFuel] = await db
      .update(fuels)
      .set(fuel)
      .where(eq(fuels.id, fuel.id))
      .returning()

    return updatedFuel
  }

  async delete(id: string): Promise<void> {
    await db.delete(fuels).where(eq(fuels.id, id))
  }

  async findById(id: string): Promise<FuelDTO | null> {
    const [fuel] = await db
      .select()
      .from(fuels)
      .where(eq(fuels.id, id))
      .limit(1)

    return fuel || null
  }

  async findByName(name: string): Promise<DrizzleSelectFuel | null> {
    const [fuel] = await db
      .select()
      .from(fuels)
      .where(eq(fuels.name, name))
      .limit(1)

    return fuel || null
  }

  async getAllFuels(): Promise<DrizzleSelectFuel[]> {
    const allFuels = await db.select().from(fuels)

    return allFuels
  }
}

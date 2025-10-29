import {
  fuels,
  type DrizzleInsertFuel,
  type DrizzleSelectFuel,
} from "@/database/schema"
import type { FuelsRepository } from "../fuels-repository"
import { db } from "@/lib/drizzle"
import { eq } from "drizzle-orm"

export class DrizzleFuelsRepository implements FuelsRepository {
  async create(data: DrizzleInsertFuel): Promise<DrizzleSelectFuel> {
    const [newFuel] = await db.insert(fuels).values(data).returning()

    return newFuel
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

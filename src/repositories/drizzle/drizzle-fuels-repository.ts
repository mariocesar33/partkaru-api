import {
  fuels,
  type DrizzleInsertFuel,
  type DrizzleSelectFuel,
} from "@/database/schema"
import type { FuelsRepository } from "../fuels-repository"
import { db } from "@/lib/drizzle"
import { eq } from "drizzle-orm"

export class DrizzleBrandsRepository implements FuelsRepository {
  async create(data: DrizzleInsertFuel): Promise<DrizzleSelectFuel> {
    const [newFuel] = await db.insert(fuels).values(data).returning()

    return newFuel
  }

  async findByName(name: string): Promise<DrizzleSelectFuel | null> {
    const [brand] = await db
      .select()
      .from(fuels)
      .where(eq(fuels.name, name))
      .limit(1)

    return brand || null
  }

  async getAllFuels(): Promise<DrizzleSelectFuel[]> {
    const allBrands = await db.select().from(fuels)

    return allBrands
  }
}

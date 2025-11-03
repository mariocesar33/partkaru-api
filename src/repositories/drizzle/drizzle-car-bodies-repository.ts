import {
  carBodies,
  type DrizzleInsertCarBodies,
  type DrizzleSelectCarBodies,
} from "@/database/schema"
import { db } from "@/lib/drizzle"
import type { CarBodiesRepository, CarBodyDTO } from "../car-bodies-repository"
import { eq } from "drizzle-orm"

export class DrizzleCarBodiesRepository implements CarBodiesRepository {
  async create(data: DrizzleInsertCarBodies): Promise<DrizzleSelectCarBodies> {
    const [newCarBody] = await db.insert(carBodies).values(data).returning()

    return newCarBody
  }

  async save(carBody: DrizzleSelectCarBodies): Promise<DrizzleSelectCarBodies> {
    const [updatedCarBody] = await db
      .update(carBodies)
      .set(carBody)
      .where(eq(carBodies.id, carBody.id))
      .returning()

    return updatedCarBody
  }

  async delete(id: string): Promise<void> {
    await db.delete(carBodies).where(eq(carBodies.id, id))
  }

  async findById(id: string): Promise<CarBodyDTO | null> {
    const [carBody] = await db
      .select()
      .from(carBodies)
      .where(eq(carBodies.id, id))
      .limit(1)

    return carBody || null
  }

  async findByName(name: string): Promise<DrizzleSelectCarBodies | null> {
    const [carBody] = await db
      .select()
      .from(carBodies)
      .where(eq(carBodies.name, name))
      .limit(1)

    return carBody || null
  }

  async getAllCarBodiess(): Promise<DrizzleSelectCarBodies[]> {
    const allCarBodies = await db.select().from(carBodies)

    return allCarBodies
  }
}

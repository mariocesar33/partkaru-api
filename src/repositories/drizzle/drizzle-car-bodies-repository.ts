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
    const { id, ...dataToUpdate } = carBody

    const [updatedCarBody] = await db
      .update(carBodies)
      .set(dataToUpdate)
      .where(eq(carBodies.id, id))
      .returning()

    if (!updatedCarBody) {
      throw new Error(`Carbody with ID ${id} not found for update.`)
    }

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

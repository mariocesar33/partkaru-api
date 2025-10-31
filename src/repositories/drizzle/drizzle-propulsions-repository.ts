import {
  propulsions,
  type DrizzleInsertPropulsions,
  type DrizzleSelectPropulsions,
} from "@/database/schema"
import type {
  PropulsionDTO,
  PropulsionsRepository,
} from "../propulsions-repository"
import { db } from "@/lib/drizzle"
import { eq } from "drizzle-orm"

export class DrizzlePropulsionsRepository implements PropulsionsRepository {
  async create(
    data: DrizzleInsertPropulsions
  ): Promise<DrizzleSelectPropulsions> {
    const [newPropulsions] = await db
      .insert(propulsions)
      .values(data)
      .returning()

    return newPropulsions
  }

  async save(
    propulsion: DrizzleSelectPropulsions
  ): Promise<DrizzleSelectPropulsions> {
    const { id, ...dataToUpdate } = propulsion

    const [updatedPropulsion] = await db
      .update(propulsions)
      .set(dataToUpdate)
      .where(eq(propulsions.id, id))
      .returning()

    if (!updatedPropulsion) {
      throw new Error(`Propulsion with ID ${id} not found for update.`)
    }

    return updatedPropulsion
  }

  async delete(id: string): Promise<void> {
    await db.delete(propulsions).where(eq(propulsions.id, id))
  }

  async findById(id: string): Promise<DrizzleSelectPropulsions | null> {
    const [propulsion] = await db
      .select()
      .from(propulsions)
      .where(eq(propulsions.id, id))
      .limit(1)

    return propulsion || null
  }

  async findByDescription(description: string): Promise<PropulsionDTO | null> {
    const [propulsion] = await db
      .select()
      .from(propulsions)
      .where(eq(propulsions.description, description))
      .limit(1)

    return propulsion || null
  }

  async getAllPropulsions(): Promise<DrizzleSelectPropulsions[]> {
    const allPropulsions = await db.select().from(propulsions)

    return allPropulsions
  }
}

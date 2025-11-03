import {
  models,
  type DrizzleInsertModel,
  type DrizzleSelectModel,
} from "@/database/schema"
import type { ModelsRepository } from "../models-repository"
import { db } from "@/lib/drizzle"
import { eq } from "drizzle-orm"

export class DrizzleModelsRepository implements ModelsRepository {
  async create(data: DrizzleInsertModel): Promise<DrizzleSelectModel> {
    const [newModel] = await db.insert(models).values(data).returning()

    return newModel
  }

  async save(model: DrizzleSelectModel): Promise<DrizzleSelectModel> {
    const [updatedModel] = await db
      .update(models)
      .set(model)
      .where(eq(models.id, model.id))
      .returning()

    return updatedModel
  }

  async delete(id: string): Promise<void> {
    await db.delete(models).where(eq(models.id, id))
  }

  async findById(id: string): Promise<DrizzleSelectModel | null> {
    const [model] = await db
      .select()
      .from(models)
      .where(eq(models.id, id))
      .limit(1)

    return model || null
  }

  async findByName(name: string): Promise<DrizzleSelectModel | null> {
    const [model] = await db
      .select()
      .from(models)
      .where(eq(models.name, name))
      .limit(1)

    return model || null
  }
}

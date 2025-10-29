import { eq } from "drizzle-orm"
import {
  brands,
  type DrizzleInsertBrand,
  type DrizzleSelectBrand,
} from "@/database/schema"
import { db } from "@/lib/drizzle"
import type { BrandDTO, BrandsRepository } from "../brands-repository"

export class DrizzleBrandsRepository implements BrandsRepository {
  async create(data: DrizzleInsertBrand): Promise<DrizzleSelectBrand> {
    const [newBrand] = await db.insert(brands).values(data).returning()

    return newBrand
  }

  async save(brand: DrizzleSelectBrand): Promise<DrizzleSelectBrand> {
    const { id, ...dataToUpdate } = brand

    const [updatedBrand] = await db
      .update(brands)
      .set(dataToUpdate)
      .where(eq(brands.id, id))
      .returning()

    if (!updatedBrand) {
      throw new Error(`Marca com ID ${id} não encontrada para atualização.`)
    }

    return updatedBrand
  }

  async delete(id: string): Promise<void> {
    await db.delete(brands).where(eq(brands.id, id))
  }

  async findByName(name: string): Promise<DrizzleSelectBrand | null> {
    const [brand] = await db
      .select()
      .from(brands)
      .where(eq(brands.name, name))
      .limit(1)

    return brand || null
  }

  async getAllBrands(): Promise<BrandDTO[]> {
    const allBrands = await db.select().from(brands)

    return allBrands
  }
}

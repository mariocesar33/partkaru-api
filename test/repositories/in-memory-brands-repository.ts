import { randomUUID } from "node:crypto"
import type {
  BrandDTO,
  BrandsRepository,
  CreateBrandDTO,
} from "@/repositories/brands-repository"

export class InMemoryBrandsRepository implements BrandsRepository {
  public items: BrandDTO[] = []

  async create(data: CreateBrandDTO): Promise<BrandDTO> {
    const brand: BrandDTO = {
      id: data.id ?? randomUUID(),
      name: data.name,
      popular: data.popular ?? false,
      countryOrigin: data.countryOrigin ?? null,
    }

    this.items.push(brand)

    return brand
  }

  async findByName(name: string): Promise<BrandDTO | null> {
    const brand = this.items.find((item) => item.name === name)

    if (!brand) {
      return null
    }

    return brand
  }

  async getAllBrands(): Promise<BrandDTO[]> {
    return this.items
  }
}

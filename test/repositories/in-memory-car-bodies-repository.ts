import { randomUUID } from "node:crypto"
import type {
  CarBodiesRepository,
  CarBodyDTO,
  CreateCarBodyDTO,
} from "@/repositories/car-bodies-repository"

export class InMemoryCarBodiesRepository implements CarBodiesRepository {
  public items: CarBodyDTO[] = []

  async create(data: CreateCarBodyDTO): Promise<CarBodyDTO> {
    const brand: CarBodyDTO = {
      id: data.id ?? randomUUID(),
      name: data.name,
    }

    this.items.push(brand)

    return brand
  }

  async save(carBody: CarBodyDTO): Promise<CarBodyDTO> {
    const carBodyIndex = this.items.findIndex((item) => item.id === carBody.id)

    if (carBodyIndex < 0) {
      throw new Error(`carbody with ID ${carBody.id} not found.`)
    }

    this.items[carBodyIndex] = carBody

    return carBody
  }

  async delete(id: string): Promise<void> {
    const brandIndex = this.items.findIndex((item) => item.id === id)

    if (brandIndex > -1) {
      this.items.splice(brandIndex, 1)
    }
  }

  async findByName(name: string): Promise<CarBodyDTO | null> {
    const carBody = this.items.find((item) => item.name === name)

    if (!carBody) {
      return null
    }

    return carBody
  }

  async getAllCarBodiess(): Promise<CarBodyDTO[]> {
    return this.items
  }
}

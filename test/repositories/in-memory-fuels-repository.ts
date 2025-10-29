import { randomUUID } from "node:crypto"
import type {
  FuelDTO,
  FuelsRepository,
  CreateFuelDTO,
} from "@/repositories/fuels-repository"

export class InMemoryFuelsRepository implements FuelsRepository {
  public items: FuelDTO[] = []

  async create(data: CreateFuelDTO): Promise<FuelDTO> {
    const fuel: FuelDTO = {
      id: data.id ?? randomUUID(),
      name: data.name,
    }

    this.items.push(fuel)

    return fuel
  }

  async findByName(name: string): Promise<FuelDTO | null> {
    const fuel = this.items.find((item) => item.name === name)

    if (!fuel) {
      return null
    }

    return fuel
  }

  async getAllFuels(): Promise<FuelDTO[]> {
    return this.items
  }
}

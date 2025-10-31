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

  async save(fuel: FuelDTO): Promise<FuelDTO> {
    const fuelIndex = this.items.findIndex((item) => item.id === fuel.id)

    if (fuelIndex < 0) {
      throw new Error(`Fuel with ID ${fuel.id} not found.`)
    }

    this.items[fuelIndex] = fuel

    return fuel
  }

  async delete(id: string): Promise<void> {
    const fuelIndex = this.items.findIndex((item) => item.id === id)

    if (fuelIndex > -1) {
      this.items.splice(fuelIndex, 1)
    }
  }

  async findById(id: string): Promise<FuelDTO | null> {
    const fuel = this.items.find((item) => item.id === id)

    if (!fuel) {
      return null
    }

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

import { randomUUID } from "node:crypto"
import type {
  CreatePropulsionDTO,
  PropulsionDTO,
  PropulsionsRepository,
} from "@/repositories/propulsions-repository"

export class InMemoryPropulsionsRepository implements PropulsionsRepository {
  public items: PropulsionDTO[] = []

  async create(data: CreatePropulsionDTO): Promise<PropulsionDTO> {
    const propulsion: PropulsionDTO = {
      id: data.id ?? randomUUID(),
      description: data.description,
    }

    this.items.push(propulsion)

    return propulsion
  }

  async save(propulsion: PropulsionDTO): Promise<PropulsionDTO> {
    const propulsionIndex = this.items.findIndex(
      (item) => item.id === propulsion.id
    )

    if (propulsionIndex < 0) {
      throw new Error(`Propulsion with ID ${propulsion.id} not found.`)
    }

    this.items[propulsionIndex] = propulsion

    return propulsion
  }

  async delete(id: string): Promise<void> {
    const propulsionIndex = this.items.findIndex((item) => item.id === id)

    if (propulsionIndex > -1) {
      this.items.splice(propulsionIndex, 1)
    }
  }

  async findById(id: string): Promise<PropulsionDTO | null> {
    const propulsion = this.items.find((item) => item.id === id)

    if (!propulsion) {
      return null
    }

    return propulsion
  }

  async findByDescription(description: string): Promise<PropulsionDTO | null> {
    const propulsion = this.items.find(
      (item) => item.description === description
    )

    if (!propulsion) {
      return null
    }

    return propulsion
  }

  async getAllPropulsions(): Promise<PropulsionDTO[]> {
    return this.items
  }
}

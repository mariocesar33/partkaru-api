import { randomUUID } from "node:crypto"

import type {
  CombSystemDTO,
  CombSystemsRepository,
  CreateCombSystemDTO,
} from "@/repositories/comb-systems-repository"

export class InMemoryCombSystemsRepository implements CombSystemsRepository {
  public items: CombSystemDTO[] = []

  async create(data: CreateCombSystemDTO): Promise<CombSystemDTO> {
    const combSystem: CombSystemDTO = {
      id: data.id ?? randomUUID(),
      description: data.description,
    }

    this.items.push(combSystem)

    return combSystem
  }

  async save(combSystem: CombSystemDTO): Promise<CombSystemDTO> {
    const combSystemIndex = this.items.findIndex(
      (item) => item.id === combSystem.id
    )

    if (combSystemIndex < 0) {
      throw new Error(`CombSystem with ID ${combSystem.id} not found.`)
    }

    this.items[combSystemIndex] = combSystem

    return combSystem
  }

  async delete(id: string): Promise<void> {
    const combSystemIndex = this.items.findIndex((item) => item.id === id)

    if (combSystemIndex > -1) {
      this.items.splice(combSystemIndex, 1)
    }
  }

  async findByDescription(description: string): Promise<CombSystemDTO | null> {
    const combSystem = this.items.find(
      (item) => item.description === description
    )

    if (!combSystem) {
      return null
    }

    return combSystem
  }

  async getAllCombSystems(): Promise<CombSystemDTO[]> {
    return this.items
  }
}

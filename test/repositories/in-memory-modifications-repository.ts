import { randomUUID } from "node:crypto"
import type {
  CreateModificationDTO,
  ModificationDTO,
  ModificationsRepository,
} from "@/repositories/modifications-repository"

export class InMemoryModificationsRepository
  implements ModificationsRepository
{
  public items: ModificationDTO[] = []

  async create(data: CreateModificationDTO): Promise<ModificationDTO> {
    const modification: ModificationDTO = {
      id: data.id ?? randomUUID(),
      modelId: data.modelId ?? randomUUID(),
      engineId: data.engineId ?? randomUUID(),
      carBodyId: data.carBodyId ?? randomUUID(),
      propulsionId: data.propulsionId ?? randomUUID(),
      versionName: data.versionName,
      versionCode: data.versionCode ?? null,
      startDate: data.startDate,
      endDate: data.endDate ?? null,
    }

    this.items.push(modification)

    return modification
  }

  async save(modification: ModificationDTO): Promise<ModificationDTO> {
    const modificationIndex = this.items.findIndex(
      (item) => item.id === modification.id
    )

    if (modificationIndex < 0) {
      throw new Error(`Modification with ID ${modification.id} not found.`)
    }

    this.items[modificationIndex] = modification

    return modification
  }

  async delete(id: string): Promise<void> {
    const modificationIndex = this.items.findIndex((item) => item.id === id)

    if (modificationIndex > -1) {
      this.items.splice(modificationIndex, 1)
    }
  }

  async findById(id: string): Promise<ModificationDTO | null> {
    const modification = this.items.find((item) => item.id === id)

    if (!modification) {
      return null
    }

    return modification
  }
}

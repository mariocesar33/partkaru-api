import { randomUUID } from "node:crypto"
import type {
  CreateGearboxeDTO,
  GearboxeDTO,
  GearboxesRepository,
} from "@/repositories/gearboxes-repository"

export class InMemoryGearboxesRepository implements GearboxesRepository {
  public items: GearboxeDTO[] = []

  async create(data: CreateGearboxeDTO): Promise<GearboxeDTO> {
    const gearboxe: GearboxeDTO = {
      id: data.id ?? randomUUID(),
      code: data.code,
      transmissionType: data.transmissionType,
      speedNumber: data.speedNumber,
      manufacturer: data.manufacturer ?? null,
    }

    this.items.push(gearboxe)

    return gearboxe
  }

  async save(gearboxe: GearboxeDTO): Promise<GearboxeDTO> {
    const gearboxeIndex = this.items.findIndex(
      (item) => item.id === gearboxe.id
    )

    if (gearboxeIndex < 0) {
      throw new Error(`Gearboxe with ID ${gearboxe.id} not found.`)
    }

    this.items[gearboxeIndex] = gearboxe

    return gearboxe
  }

  async delete(id: string): Promise<void> {
    const gearboxeIndex = this.items.findIndex((item) => item.id === id)

    if (gearboxeIndex > -1) {
      this.items.splice(gearboxeIndex, 1)
    }
  }

  async findById(id: string): Promise<GearboxeDTO | null> {
    const gearboxe = this.items.find((item) => item.id === id)

    if (!gearboxe) {
      return null
    }

    return gearboxe
  }

  async getAllGearboxes(): Promise<GearboxeDTO[]> {
    return this.items
  }
}

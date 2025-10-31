import { randomUUID } from "node:crypto"
import type {
  CreateEngineDTO,
  EngineDTO,
  EnginesRepository,
} from "@/repositories/engines-repository"

export class InMemoryEnginesRepository implements EnginesRepository {
  public items: EngineDTO[] = []

  async create(data: CreateEngineDTO): Promise<EngineDTO> {
    const engine: EngineDTO = {
      id: data.id ?? randomUUID(),
      fuelId: data.fuelId ?? randomUUID(),
      combSystemsId: data.combSystemsId ?? randomUUID(),
      engineCode: data.engineCode,
      numberOfCylinders: data.numberOfCylinders,
      valvesPerCylinder: data.valvesPerCylinder,
      displacementCC: data.displacementCC,
      powerCV: data.powerCV ?? null,
      powerKW: data.powerKW ?? null,
      startDate: data.startDate,
      endDate: data.endDate ?? null,
    }

    this.items.push(engine)

    return engine
  }

  async save(engine: EngineDTO): Promise<EngineDTO> {
    const engineIndex = this.items.findIndex((item) => item.id === engine.id)

    if (engineIndex < 0) {
      throw new Error(`Engine with ID ${engine.id} not found.`)
    }

    this.items[engineIndex] = engine

    return engine
  }

  async delete(id: string): Promise<void> {
    const engineIndex = this.items.findIndex((item) => item.id === id)

    if (engineIndex > -1) {
      this.items.splice(engineIndex, 1)
    }
  }

  async findById(id: string): Promise<EngineDTO | null> {
    const engine = this.items.find((item) => item.id === id)

    if (!engine) {
      return null
    }

    return engine
  }
}

import { randomUUID } from "node:crypto"
import type {
  CreateModelDTO,
  ModelDTO,
  ModelsRepository,
} from "@/repositories/models-repository"

export class InMemoryModelsRepository implements ModelsRepository {
  public items: ModelDTO[] = []

  async create(data: CreateModelDTO): Promise<ModelDTO> {
    const model: ModelDTO = {
      id: data.id ?? randomUUID(),
      brandId: data.brandId,
      name: data.name,
      description: data.description ?? null,
      generation: data.generation ?? null,
    }

    this.items.push(model)

    return model
  }

  async save(model: ModelDTO): Promise<ModelDTO> {
    const modelIndex = this.items.findIndex((item) => item.id === model.id)

    if (modelIndex < 0) {
      throw new Error(`Model with ID ${model.id} not found.`)
    }

    this.items[modelIndex] = model

    return model
  }

  async delete(id: string): Promise<void> {
    const modelIndex = this.items.findIndex((item) => item.id === id)

    if (modelIndex > -1) {
      this.items.splice(modelIndex, 1)
    }
  }

  async findById(id: string): Promise<ModelDTO | null> {
    const model = this.items.find((item) => item.id === id)

    if (!model) {
      return null
    }

    return model
  }

  async findByName(name: string): Promise<ModelDTO | null> {
    const model = this.items.find((item) => item.name === name)

    if (!model) {
      return null
    }

    return model
  }
}

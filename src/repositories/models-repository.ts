export interface ModelDTO {
  id: string
  name: string
  brandId: string
  description: string | null
  generation: string | null
}

export interface CreateModelDTO {
  id?: string
  brandId: string
  name: string
  generation?: string | null
  description?: string | null
}

export interface ModelsRepository {
  create(data: CreateModelDTO): Promise<ModelDTO>
  save(model: ModelDTO): Promise<ModelDTO>
  delete(id: string): Promise<void>
  findById(id: string): Promise<ModelDTO | null>
  findByName(name: string): Promise<ModelDTO | null>
}

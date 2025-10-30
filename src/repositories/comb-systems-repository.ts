export interface CombSystemDTO {
  id: string
  description: string
}

export interface CreateCombSystemDTO {
  id?: string | undefined
  description: string
}

export interface CombSystemsRepository {
  create(data: CreateCombSystemDTO): Promise<CombSystemDTO>
  save(combSystem: CombSystemDTO): Promise<CombSystemDTO>
  delete(id: string): Promise<void>
  findByDescription(description: string): Promise<CombSystemDTO | null>
  getAllCombSystems(): Promise<CombSystemDTO[]>
}

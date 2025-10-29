export interface CombSystemDTO {
  id: string
  name: string
}

export interface CreateCombSystemDTO {
  id?: string | undefined
  name: string
}

export interface CombSystemsRepository {
  create(data: CreateCombSystemDTO): Promise<CombSystemDTO>
  findByName(name: string): Promise<CombSystemDTO | null>
  getAllCombSystems(): Promise<CombSystemDTO[]>
}

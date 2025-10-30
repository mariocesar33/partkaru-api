export interface PropulsionDTO {
  id: string
  description: string
}

export interface CreatePropulsionDTO {
  id?: string | undefined
  description: string
}

export interface PropulsionsRepository {
  create(data: CreatePropulsionDTO): Promise<PropulsionDTO>
  save(propulsion: PropulsionDTO): Promise<PropulsionDTO>
  delete(id: string): Promise<void>
  findById(id: string): Promise<PropulsionDTO | null>
  findByDescription(description: string): Promise<PropulsionDTO | null>
  getAllPropulsions(): Promise<PropulsionDTO[]>
}

export interface PropulsionDTO {
  id: string
  name: string
}

export interface CreatePropulsionDTO {
  id?: string | undefined
  name: string
}

export interface PropulsionsRepository {
  create(data: CreatePropulsionDTO): Promise<PropulsionDTO>
  save(propulsion: PropulsionDTO): Promise<PropulsionDTO>
  delete(id: string): Promise<void>
  findByName(name: string): Promise<PropulsionDTO | null>
  getAllPropulsions(): Promise<PropulsionDTO[]>
}

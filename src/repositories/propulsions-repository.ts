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
  findByName(name: string): Promise<PropulsionDTO | null>
  getAllPropulsions(): Promise<PropulsionDTO[]>
}

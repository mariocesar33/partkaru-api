export interface CarBodyDTO {
  id: string
  name: string
}

export interface CreateCarBodyDTO {
  id?: string | undefined
  name: string
}

export interface CarBodiesRepository {
  create(data: CreateCarBodyDTO): Promise<CarBodyDTO>
  findByName(name: string): Promise<CarBodyDTO | null>
  getAllCarBodiess(): Promise<CarBodyDTO[]>
}

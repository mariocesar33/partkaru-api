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
  save(carBody: CarBodyDTO): Promise<CarBodyDTO>
  delete(id: string): Promise<void>
  findById(id: string): Promise<CarBodyDTO | null>
  findByName(name: string): Promise<CarBodyDTO | null>
  getAllCarBodiess(): Promise<CarBodyDTO[]>
}

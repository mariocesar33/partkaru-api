export interface FuelDTO {
  id: string
  name: string
}

export interface CreateFuelDTO {
  id?: string | undefined
  name: string
}

export interface FuelsRepository {
  create(data: CreateFuelDTO): Promise<FuelDTO>
  save(fuel: FuelDTO): Promise<FuelDTO>
  delete(id: string): Promise<void>
  findByName(name: string): Promise<FuelDTO | null>
  getAllFuels(): Promise<FuelDTO[]>
}

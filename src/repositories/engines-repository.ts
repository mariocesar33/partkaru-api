export interface EngineDTO {
  id: string
  fuelId: string | null
  combSystemsId: string | null
  engineCode: string
  numberOfCylinders: number
  valvesPerCylinder: number
  displacementCC: number
  powerCV: number | null
  powerKW: number | null
  startDate: Date
  endDate: Date | null
}

export interface CreateEngineDTO {
  id?: string
  fuelId?: string | null
  combSystemsId?: string | null
  engineCode: string
  numberOfCylinders: number
  valvesPerCylinder: number
  displacementCC: number
  powerCV?: number | null
  powerKW?: number | null
  startDate: Date
  endDate?: Date | null
}

export interface EnginesRepository {
  create(data: CreateEngineDTO): Promise<EngineDTO>
  save(engine: EngineDTO): Promise<EngineDTO>
  delete(id: string): Promise<void>
  findById(id: string): Promise<EngineDTO | null>
}

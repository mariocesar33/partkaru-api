export interface GearboxeDTO {
  id: string
  code: string
  transmissionType: string
  speedNumber: number
  manufacturer: string | null
}

export interface CreateGearboxeDTO {
  id?: string
  code: string
  transmissionType: string
  speedNumber: number
  manufacturer?: string | null
}

export interface GearboxesRepository {
  create(data: CreateGearboxeDTO): Promise<GearboxeDTO>
  save(gearboxe: GearboxeDTO): Promise<GearboxeDTO>
  delete(id: string): Promise<void>
  findById(id: string): Promise<GearboxeDTO | null>
  getAllGearboxes(): Promise<GearboxeDTO[]>
}

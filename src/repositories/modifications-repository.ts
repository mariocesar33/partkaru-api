export interface ModificationDTO {
  id: string
  modelId: string | null
  engineId: string | null
  carBodyId: string | null
  propulsionId: string | null
  versionName: string
  versionCode: string | null
  startDate: Date
  endDate: Date | null
}

export interface CreateModificationDTO {
  id?: string
  modelId?: string | null
  engineId?: string | null
  carBodyId?: string | null
  propulsionId?: string | null
  versionName: string
  versionCode?: string | null
  startDate: Date
  endDate?: Date | null
}

export interface ModificationsRepository {
  create(data: CreateModificationDTO): Promise<ModificationDTO>
  save(modification: ModificationDTO): Promise<ModificationDTO>
  delete(id: string): Promise<void>
  findById(id: string): Promise<ModificationDTO | null>
}

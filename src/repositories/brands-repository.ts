export interface BrandDTO {
  id: string
  name: string
  popular: boolean
  countryOrigin: string | null
}

export interface CreateBrandDTO {
  id?: string | undefined
  name: string
  popular?: boolean
  countryOrigin?: string | null
}

export interface BrandsRepository {
  create(data: CreateBrandDTO): Promise<BrandDTO>
  findByName(name: string): Promise<BrandDTO | null>
  getAllBrands(): Promise<BrandDTO[]>
}

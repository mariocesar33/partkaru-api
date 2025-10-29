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
  save(brand: BrandDTO): Promise<BrandDTO>
  delete(id: string): Promise<void>
  findByName(name: string): Promise<BrandDTO | null>
  getAllBrands(): Promise<BrandDTO[]>
}

import type {
  BrandDTO,
  BrandsRepository,
} from "../repositories/brands-repository"

interface CreateBrandUseCaseRequest {
  name: string
  popular?: boolean
  countryOrigin?: string | null
}

type CreateBrandUseCaseResponse = {
  brand: BrandDTO
}

export class CreateBrandUseCase {
  constructor(private brandsRepository: BrandsRepository) {}

  async execute({
    name,
    popular,
    countryOrigin,
  }: CreateBrandUseCaseRequest): Promise<CreateBrandUseCaseResponse> {
    const existingBrand = await this.brandsRepository.findByName(name)

    if (existingBrand) {
      throw new Error("Esta marca já existe.")
    }

    const brand = await this.brandsRepository.create({
      name,
      popular,
      countryOrigin,
    })

    return {
      brand,
    }
  }
}

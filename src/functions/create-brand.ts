import type {
  BrandDTO,
  BrandsRepository,
} from "../repositories/brands-repository"
import { AlreadyExistsError } from "./_errors/already-exists-error"
import { left, right, type Either } from "./_errors/either"

interface CreateBrandUseCaseRequest {
  name: string
  popular?: boolean
  countryOrigin?: string | null
}

type CreateBrandUseCaseResponse = Either<
  AlreadyExistsError,
  {
    brand: BrandDTO
  }
>

export class CreateBrandUseCase {
  constructor(private brandsRepository: BrandsRepository) {}

  async execute({
    name,
    popular,
    countryOrigin,
  }: CreateBrandUseCaseRequest): Promise<CreateBrandUseCaseResponse> {
    const formattedName = name.toLowerCase()

    const existingBrand = await this.brandsRepository.findByName(formattedName)

    if (existingBrand) {
      return left(new AlreadyExistsError(name))
    }

    const formattedCountryOrigin = countryOrigin
      ? countryOrigin.toLowerCase()
      : countryOrigin

    const brand = await this.brandsRepository.create({
      name: formattedName,
      popular,
      countryOrigin: formattedCountryOrigin,
    })

    return right({
      brand,
    })
  }
}

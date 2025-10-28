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
    const existingBrand = await this.brandsRepository.findByName(name)

    if (existingBrand) {
      return left(new AlreadyExistsError(name))
    }

    const brand = await this.brandsRepository.create({
      name,
      popular,
      countryOrigin,
    })

    return right({
      brand,
    })
  }
}

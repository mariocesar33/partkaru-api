import type {
  BrandDTO,
  BrandsRepository,
} from "../repositories/brands-repository"
import { right, type Either } from "./_errors/either"

type GetAllBrandsUseCaseResponse = Either<
  null,
  {
    brands: BrandDTO[]
  }
>

export class GetAllBrandsUseCase {
  constructor(private brandsRepository: BrandsRepository) {}

  async execute(): Promise<GetAllBrandsUseCaseResponse> {
    const brands = await this.brandsRepository.getAllBrands()

    return right({
      brands,
    })
  }
}

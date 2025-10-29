import { DrizzleBrandsRepository } from "@/repositories/drizzle/drizzle-brands-repository"
import { CreateBrandUseCase } from "../create-brand"
import { GetAllBrandsUseCase } from "../get-all-brands"

export function makeBrandUseCase() {
  const brandsRepository = new DrizzleBrandsRepository()

  const createBrandUseCase = new CreateBrandUseCase(brandsRepository)
  const getAllBrandsUseCase = new GetAllBrandsUseCase(brandsRepository)

  return {
    createBrandUseCase,
    getAllBrandsUseCase,
  }
}

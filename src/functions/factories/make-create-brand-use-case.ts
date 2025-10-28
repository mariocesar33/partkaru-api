import { DrizzleBrandsRepository } from "../../repositories/drizzle/drizzle-brands-repository"
import { CreateBrandUseCase } from "../create-brand"

export function makeCreateBrandUseCase() {
  const brandsRepository = new DrizzleBrandsRepository()

  const createBrandUseCase = new CreateBrandUseCase(brandsRepository)

  return createBrandUseCase
}

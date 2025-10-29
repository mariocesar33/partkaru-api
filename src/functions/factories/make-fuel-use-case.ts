import { DrizzleFuelsRepository } from "@/repositories/drizzle/drizzle-fuels-repository"
import { CreateFuelUseCase } from "../create-fuel"
import { GetAllFuelsUseCase } from "../get-all-fuels"

export function makeFuelUseCase() {
  const fuelsRepository = new DrizzleFuelsRepository()

  const createFuelUseCase = new CreateFuelUseCase(fuelsRepository)
  const getAllFuelsUseCase = new GetAllFuelsUseCase(fuelsRepository)

  return {
    createFuelUseCase,
    getAllFuelsUseCase,
  }
}

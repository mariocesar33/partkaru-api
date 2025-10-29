import type { FuelDTO, FuelsRepository } from "../repositories/fuels-repository"
import { right, type Either } from "./_errors/either"

type GetAllFuelsUseCaseResponse = Either<
  null,
  {
    fuels: FuelDTO[]
  }
>

export class GetAllFuelsUseCase {
  constructor(private fuelsRepository: FuelsRepository) {}

  async execute(): Promise<GetAllFuelsUseCaseResponse> {
    const fuels = await this.fuelsRepository.getAllFuels()

    return right({
      fuels,
    })
  }
}

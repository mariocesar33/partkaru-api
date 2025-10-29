import type { FuelDTO, FuelsRepository } from "../repositories/fuels-repository"
import { AlreadyExistsError } from "./_errors/already-exists-error"
import { left, right, type Either } from "./_errors/either"

interface CreateFuelUseCaseRequest {
  name: string
}

type CreateFuelUseCaseResponse = Either<
  AlreadyExistsError,
  {
    fuel: FuelDTO
  }
>

export class CreateFuelUseCase {
  constructor(private fuelsRepository: FuelsRepository) {}

  async execute({
    name,
  }: CreateFuelUseCaseRequest): Promise<CreateFuelUseCaseResponse> {
    const formattedName = name.toLowerCase()

    const existingFuel = await this.fuelsRepository.findByName(formattedName)

    if (existingFuel) {
      return left(new AlreadyExistsError(name))
    }

    const fuel = await this.fuelsRepository.create({
      name: formattedName,
    })

    return right({
      fuel,
    })
  }
}

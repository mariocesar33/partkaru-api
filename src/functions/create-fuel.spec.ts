import { AlreadyExistsError } from "@/functions/_errors/already-exists-error"
import { CreateFuelUseCase } from "./create-fuel"
import { InMemoryFuelsRepository } from "@/repositories/in-memory-fuels-repository"

let inMemoryFuelsRepository: InMemoryFuelsRepository
let sut: CreateFuelUseCase

describe("Create Fuel", () => {
  beforeEach(async () => {
    inMemoryFuelsRepository = new InMemoryFuelsRepository()
    sut = new CreateFuelUseCase(inMemoryFuelsRepository)
  })

  it("should be able to create fuel", async () => {
    const result = await sut.execute({ name: "gasóleo" })

    expect(result.isRight()).toBe(true)
  })

  it("should not be able to create fuel with same name twice", async () => {
    const name = "elétrico"

    await sut.execute({
      name,
    })

    const result = await sut.execute({
      name,
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(AlreadyExistsError)
  })

  it("should store the fuel name in lowercase", async () => {
    const result = await sut.execute({
      name: "Gasolina", // Note o "G" maiúsculo
    })

    expect(result.isRight()).toBe(true)

    if (result.isRight()) {
      expect(result.value.fuel.name).toBe("gasolina")
    }

    expect(inMemoryFuelsRepository.items[0].name).toBe("gasolina")
  })

  it("should not be able to create fuel with case-different same name", async () => {
    const name = "Gasóleo"
    await sut.execute({
      name,
    })

    const result = await sut.execute({
      name: name.toLowerCase(),
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(AlreadyExistsError)
  })
})

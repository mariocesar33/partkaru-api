import { AlreadyExistsError } from "@/functions/_errors/already-exists-error"
import { CreateBrandUseCase } from "@/functions/create-brand"
import { InMemoryBrandsRepository } from "@/repositories/in-memory-brands-repository"

let inMemoryBrandsRepository: InMemoryBrandsRepository
let sut: CreateBrandUseCase

describe("Create Brand", () => {
  beforeEach(async () => {
    inMemoryBrandsRepository = new InMemoryBrandsRepository()
    sut = new CreateBrandUseCase(inMemoryBrandsRepository)
  })

  it("should be able to create brand", async () => {
    const result = await sut.execute({ name: "peugeot" })

    expect(result.isRight()).toBe(true)
  })

  it("should not be able to create brand with same name twice", async () => {
    const name = "toyota"

    await sut.execute({
      name,
    })

    const result = await sut.execute({
      name,
      popular: true,
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(AlreadyExistsError)
  })

  it("should store the brand name in lowercase", async () => {
    const result = await sut.execute({
      name: "Volkswagen", // Note o "V" maiúsculo
    })

    expect(result.isRight()).toBe(true)

    if (result.isRight()) {
      expect(result.value.brand.name).toBe("volkswagen")
    }

    expect(inMemoryBrandsRepository.items[0].name).toBe("volkswagen")
  })

  it("should store the countryOrigin in lowercase", async () => {
    const result = await sut.execute({
      name: "Ferrari",
      countryOrigin: "ITALY", // Em maiúsculas
    })

    expect(result.isRight()).toBe(true)

    if (result.isRight()) {
      expect(result.value.brand.countryOrigin).toBe("italy")
    }
  })

  it("should handle null countryOrigin without errors", async () => {
    const result = await sut.execute({
      name: "Tesla",
      countryOrigin: null,
    })

    expect(result.isRight()).toBe(true)

    if (result.isRight()) {
      expect(result.value.brand.countryOrigin).toBe(null)
    }
  })

  it("should not be able to create brand with case-different same name", async () => {
    const name = "Ford"
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

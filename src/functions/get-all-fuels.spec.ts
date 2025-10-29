import { InMemoryFuelsRepository } from "@/repositories/in-memory-fuels-repository"

import { GetAllFuelsUseCase } from "./get-all-fuels"

let inMemoryFuelsRepository: InMemoryFuelsRepository
let sut: GetAllFuelsUseCase

describe("Get All Fuels", () => {
  beforeEach(async () => {
    inMemoryFuelsRepository = new InMemoryFuelsRepository()
    sut = new GetAllFuelsUseCase(inMemoryFuelsRepository)
  })

  it("should be able to get all fuels", async () => {
    await inMemoryFuelsRepository.create({
      name: "gasóleo",
    })

    await inMemoryFuelsRepository.create({
      name: "gasolina",
    })

    const result = await sut.execute()

    expect(result.isRight()).toBe(true)
    expect(result.value?.fuels).toHaveLength(2)
    expect(result.value?.fuels).toEqual([
      expect.objectContaining({ name: "gasóleo" }),
      expect.objectContaining({ name: "gasolina" }),
    ])
  })

  it("should return an empty array when no fuels are created", async () => {
    const result = await sut.execute()

    expect(result.isRight()).toBe(true)
    expect(result.value?.fuels).toHaveLength(0)
    expect(result.value?.fuels).toEqual([])
  })
})

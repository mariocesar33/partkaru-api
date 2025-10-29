import { InMemoryBrandsRepository } from "@/repositories/in-memory-brands-repository"

import { GetAllBrandsUseCase } from "./get-all-brands"

let inMemoryBrandsRepository: InMemoryBrandsRepository
let sut: GetAllBrandsUseCase

describe("Get All Brands", () => {
  beforeEach(async () => {
    inMemoryBrandsRepository = new InMemoryBrandsRepository()
    sut = new GetAllBrandsUseCase(inMemoryBrandsRepository)
  })

  it("should be able to get all brands", async () => {
    await inMemoryBrandsRepository.create({
      name: "toyota",
      popular: true,
    })

    await inMemoryBrandsRepository.create({
      name: "audi",
      popular: false,
    })

    const result = await sut.execute()

    expect(result.isRight()).toBe(true)
    expect(result.value?.brands).toHaveLength(2)
    expect(result.value?.brands).toEqual([
      expect.objectContaining({ name: "toyota", popular: true }),
      expect.objectContaining({ name: "audi", popular: false }),
    ])
  })

  it("should return an empty array when no brands are created", async () => {
    const result = await sut.execute()

    expect(result.isRight()).toBe(true)
    expect(result.value?.brands).toHaveLength(0)
    expect(result.value?.brands).toEqual([])
  })
})

import type { FastifyInstance } from "fastify"
import type { ZodTypeProvider } from "fastify-type-provider-zod"
import { z } from "zod"
import { makeCreateBrandUseCase } from "../../../functions/factories/make-create-brand-use-case"
import { AlreadyExistsError } from "../../../functions/_errors/already-exists-error"

export async function createBrand(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/brands",
    {
      schema: {
        body: z.object({
          name: z
            .string()
            .min(2, "Name must be at least 2 characters long")
            .max(50, "Name must be at most 50 characters long"),
          popular: z.boolean().optional(),
          countryOrigin: z.string().optional(),
        }),
        response: {
          201: z.object({
            brandId: z.string(),
          }),
          409: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { name, popular, countryOrigin } = request.body

      const createBrandUseCase = makeCreateBrandUseCase()

      const result = await createBrandUseCase.execute({
        name,
        popular,
        countryOrigin,
      })

      if (result.isLeft()) {
        const error = result.value

        if (error instanceof AlreadyExistsError) {
          return reply.status(409).send({ message: error.message })
        }

        throw error
      }

      return reply.status(201).send({ brandId: result.value.brand.id })
    }
  )
}

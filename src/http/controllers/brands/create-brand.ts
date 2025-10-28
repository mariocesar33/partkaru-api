import type { FastifyInstance } from "fastify"
import type { ZodTypeProvider } from "fastify-type-provider-zod"
import { z } from "zod"
import { makeCreateBrandUseCase } from "../../../functions/factories/make-create-brand-use-case"

export async function createBrand(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/brands",
    {
      schema: {
        body: z.object({
          name: z.string(),
          popular: z.boolean().optional(),
          countryOrigin: z.string().optional(),
        }),
        response: {
          201: z.object({
            brandId: z.string(),
          }),
          400: z.object({
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

      if (!result) {
        const message = "falha ao criar a marca."

        return reply.status(400).send({ message })
      }

      return reply.status(201).send({ brandId: result.brand.id })
    }
  )
}

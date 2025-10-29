import type { FastifyInstance } from "fastify"
import type { ZodTypeProvider } from "fastify-type-provider-zod"
import { z } from "zod"
import { makeBrandUseCase } from "@/functions/factories/make-brand-use-case"
import { BadRequestError } from "@/functions/_errors/bad-request-error"

export async function getAllBrands(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/brands",
    {
      schema: {
        tags: ["Brands"],
        summary: "Get all brands",
        response: {
          200: z.object({
            brands: z.array(
              z.object({
                id: z.string(),
                name: z.string(),
                popular: z.boolean(),
                countryOrigin: z.string().nullable(),
              })
            ),
          }),
        },
      },
    },
    async (_, reply) => {
      const { getAllBrandsUseCase } = makeBrandUseCase()

      const result = await getAllBrandsUseCase.execute()

      if (result.isLeft()) {
        throw new BadRequestError()
      }

      const { brands } = result.value

      return reply.status(200).send({ brands })
    }
  )
}

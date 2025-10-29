import type { FastifyInstance } from "fastify"
import type { ZodTypeProvider } from "fastify-type-provider-zod"
import { z } from "zod"
import { makeFuelUseCase } from "@/functions/factories/make-fuel-use-case"
import { BadRequestError } from "@/functions/_errors/bad-request-error"

export async function getAllFuels(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/fuels",
    {
      schema: {
        tags: ["Fuels"],
        summary: "Get all fuels",
        response: {
          200: z.object({
            fuels: z.array(
              z.object({
                id: z.string(),
                name: z.string(),
              })
            ),
          }),
        },
      },
    },
    async (_, reply) => {
      const { getAllFuelsUseCase } = makeFuelUseCase()

      const result = await getAllFuelsUseCase.execute()

      if (result.isLeft()) {
        throw new BadRequestError()
      }

      const { fuels } = result.value

      return reply.status(200).send({ fuels })
    }
  )
}

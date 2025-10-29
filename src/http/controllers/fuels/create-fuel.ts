import type { FastifyInstance } from "fastify"
import type { ZodTypeProvider } from "fastify-type-provider-zod"
import { z } from "zod"
import { AlreadyExistsError } from "@/functions/_errors/already-exists-error"
import { makeFuelUseCase } from "@/functions/factories/make-fuel-use-case"

export async function createFuel(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/fuels",
    {
      schema: {
        tags: ["Fuels"],
        summary: "Create fuel",
        body: z.object({
          name: z
            .string()
            .min(2, "Name must be at least 2 characters long")
            .max(30, "Name must be at most 50 characters long"),
        }),
        response: {
          201: z.object({
            fuelId: z.string(),
          }),
          409: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { name } = request.body

      const { createFuelUseCase } = makeFuelUseCase()

      const result = await createFuelUseCase.execute({ name })

      if (result.isLeft()) {
        const error = result.value

        if (error instanceof AlreadyExistsError) {
          return reply.status(409).send({ message: error.message })
        }

        throw error
      }

      return reply.status(201).send({ fuelId: result.value.fuel.id })
    }
  )
}

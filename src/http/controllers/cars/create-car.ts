import type { FastifyInstance } from "fastify"
import type { ZodTypeProvider } from "fastify-type-provider-zod"
import { z } from "zod"

export async function createCar(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/cars",
    {
      schema: {
        body: z.object({
          marca: z.string(),
          modelo: z.string(),
          description: z.string().optional(),
        }),
      },
    },
    async (request, reply) => {
      return "Car created successfully"
    }
  )
}

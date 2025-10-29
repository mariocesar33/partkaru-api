import type { FastifyInstance } from "fastify"

type FastifyErrorHandler = FastifyInstance["errorHandler"]

export const errorHandler: FastifyErrorHandler = (error, _, reply) => {
  // Captura erros de validação
  if (error.code === "FST_ERR_VALIDATION" && error.validation) {
    const formattedErrors = error.validation.map((validationError: any) => ({
      field: validationError.instancePath.replace("/", ""),
      message: validationError.message,
    }))

    return reply.status(400).send({
      message: "Validation error",
      errors: formattedErrors,
    })
  }

  // Erros inesperados (que fizeram throw)
  console.error("Internal server error:", error)
  return reply.status(500).send({ message: "Internal server error" })
}

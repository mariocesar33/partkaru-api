import fastifyCors from "@fastify/cors"
import fastify from "fastify"
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from "fastify-type-provider-zod"
import { errorHandler } from "./error-handler"
import { createCar } from "./http/controllers/cars/create-car"
import fastifySwagger from "@fastify/swagger"
import fastifySwaggerUI from "@fastify/swagger-ui"

export const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyCors)

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: "PartKaru",
      description:
        "Part Karu é uma plataforma inovadora que conecta vendedores de peças automóveis, com os clientes em um único espaço digital, facilitando o processo de procura, compra e venda.",
      version: "1.0.0",
    },
    servers: [],
  },
  transform: jsonSchemaTransform,
})

app.setErrorHandler(errorHandler)

app.register(fastifySwaggerUI, {
  routePrefix: "/docs",
})

app.register(createCar)

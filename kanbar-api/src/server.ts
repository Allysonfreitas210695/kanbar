import { fastify } from "fastify";
import { fastifyCors } from "@fastify/cors";
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from "fastify-type-provider-zod";
import fastifyJwt from "@fastify/jwt";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUI from "@fastify/swagger-ui";

import { setupAuth } from "../middlewares/auth.ts";
import { registerRoutes } from "./http/routes/index.ts";

import { errorHandler } from "./error-handler.ts";
import { env } from "./env.ts";

const app = fastify({
  logger: true,
}).withTypeProvider<ZodTypeProvider>();

app.register(fastifyCors, {
  origin: env.FRONTEND_URL,
});

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  sign: {
    expiresIn: env.JWT_EXPIRES_IN,
  },
  decode: { complete: true },
});

app.register(fastifySwagger, {
  swagger: {
    consumes: ["application/json"],
    produces: ["application/json"],
    info: {
      title: "pass.in",
      description:
        "Especificações da API para o back-end da aplicação pass.in construída durante o NLW Unite da Rocketseat.",
      version: "1.0.0",
    },
  },
  transform: jsonSchemaTransform,
});

app.register(fastifySwaggerUI, {
  routePrefix: "/docs",
});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

//Middlewares
setupAuth(app);

//Rotas
registerRoutes(app);

app.setErrorHandler(errorHandler);

app.listen({
  port: env.PORT,
  host: env.HOST,
});

import { fastifyCors } from "@fastify/cors";
import fastifyJwt from "@fastify/jwt";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUI from "@fastify/swagger-ui";
import { fastify } from "fastify";
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from "fastify-type-provider-zod";
import { env } from "./env/index.ts";
import { errorHandler } from "./error-handler.ts";
import { drinksRoutes } from "./http/controller/drinks/routes.ts";
import { gamesRoutes } from "./http/controller/games/routes.ts";
import { usersRoutes } from "./http/controller/users/routes.ts";

export const app = fastify({
  logger: true,
});

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
  openapi: {
    info: {
      title: "API de Exemplo",
      description: "Documentação da API de exemplo utilizando Fastify",
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

usersRoutes(app);
drinksRoutes(app);
gamesRoutes(app);

app.setErrorHandler(errorHandler);

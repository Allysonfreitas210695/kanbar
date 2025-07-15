import { fastifyCors } from "@fastify/cors";
import fastifyJwt from "@fastify/jwt";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUI from "@fastify/swagger-ui";
import { fastify } from "fastify";
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";
import { env } from "./env/index.ts";
import { errorHandler } from "./error-handler.ts";
import { drinksRoutes } from "./http/controller/drinks/routes.ts";
import { gamesRoutes } from "./http/controller/games/routes.ts";
import { usersRoutes } from "./http/controller/users/routes.ts";
import { locationsRoutes } from "./http/controller/locations/routes.ts";

export const app = fastify({
  logger: true,
});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(fastifyCors, {
  origin: "*",
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

app.get("/teste", () => {
  return "OK";
});

app.register(usersRoutes);
app.register(drinksRoutes);
app.register(gamesRoutes);
app.register(locationsRoutes);

app.setErrorHandler(errorHandler);

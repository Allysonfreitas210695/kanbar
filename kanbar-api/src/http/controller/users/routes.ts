import type { FastifyInstance } from "fastify";
import z from "zod/v4";

import { authenticate } from "./authenticate.ts";
import { profile } from "./profile.ts";
import { userRegister } from "./register.ts";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { verifyJwt } from "../../../middlewares/verify-jwt.ts";

export function usersRoutes(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/session",
    {
      schema: {
        tags: ["Auth"],
        summary: "Autenticação de usuário",
        body: z.object({
          email: z.string().email(),
          password: z.string().min(6),
        }),
        response: {
          200: z.object({
            token: z.string(),
          }),
          401: z.object({
            error: z.string(),
          }),
        },
      },
    },
    authenticate
  );

  app.withTypeProvider<ZodTypeProvider>().post(
    "/users",
    {
      schema: {
        tags: ["Users"],
        summary: "Registra um novo usuário",
        body: z.object({
          name: z.string().min(3),
          email: z.email(),
          password: z.string().min(6),
        }),
        response: {
          201: z.object({
            id: z.uuid(),
            name: z.string(),
            email: z.email(),
          }),
          409: z.object({
            error: z.string(),
          }),
        },
      },
    },
    userRegister
  );

  app.withTypeProvider<ZodTypeProvider>().get(
    "/users/me",
    {
      onRequest: [verifyJwt],
      schema: {
        tags: ["Users"],
        summary: "Retorna os dados do usuário autenticado",
        response: {
          200: z.object({
            id: z.string(),
            email: z.email(),
          }),
          401: z.object({
            error: z.string(),
          }),
        },
      },
    },
    profile
  );
}

import type { FastifyInstance } from "fastify";
import z from "zod/v4";

import { authenticate } from "./authenticate.ts";
import { profile } from "./profile.ts";
import { register } from "./register.ts";
import { verifyJwt } from "../../../middlewares/verify-jwt.ts";
import type { fastifyZodInstance } from "../../../@types/fastifyZodInstance.ts";
import { getAllFavorites } from "./get-all-favorites.ts";

export function usersRoutes(app: fastifyZodInstance) {
  app.post(
    "/session",
    {
      schema: {
        tags: ["Auth"],
        summary: "Autenticação de usuário",
        body: z.object({
          email: z.email(),
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

  app.post(
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
        },
      },
    },
    register
  );

  app.get(
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

  app.get(
    "/user/favorites",
    {
      onRequest: [verifyJwt],
      schema: {
        tags: ["Users"],
        summary: "Retorna favoritos do usuário agrupados por categoria",
        response: {
          200: z.object({
            drinks: z.array(
              z.object({
                id: z.uuid(),
                name: z.string(),
                description: z.string().nullable(),
                image: z.string().nullable(),
                ingredients: z.string().nullable(),
                difficulty: z.string().nullable(),
                estimatedValue: z.number().nullable(),
                restrictions: z.string().nullable(),
                createdAt: z.coerce.date(),
              })
            ),
            games: z.array(
              z.object({
                id: z.uuid(),
                name: z.string(),
                description: z.string().nullable(),
                image: z.string(),
                isActive: z.boolean(),
                createdAt: z.coerce.date(),
                updatedAt: z.coerce.date(),
              })
            ),
            locations: z.array(
              z.object({
                id: z.uuid(),
                name: z.string(),
                address: z.string().nullable(),
                image: z.string().nullable(),
                createdAt: z.coerce.date(),
              })
            ),
          }),
        },
      },
    },
    getAllFavorites
  );
}

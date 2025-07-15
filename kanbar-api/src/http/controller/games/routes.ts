import z from "zod/v4";

import { gamesByActive } from "./games-by-active.ts";
import { gamesFavorite } from "./games-favorite.ts";

import { verifyJwt } from "../../../middlewares/verify-jwt.ts";
import type { fastifyZodInstance } from "../../../@types/fastifyZodInstance.ts";
import { createGame, gameCreateBodySchema } from "./register.ts";
import {
  gameParamsSchema,
  gameUpdateBodySchema,
  updateGame,
} from "./update.ts";
import { removeGame } from "./remove.ts";

export function gamesRoutes(app: fastifyZodInstance) {
  app.get(
    "/games",
    {
      onRequest: [verifyJwt],
      schema: {
        tags: ["Games"],
        summary: "Lista todos os jogos ativos",
        response: {
          200: z.object({
            games: z.array(
              z.object({
                id: z.uuid(),
                name: z.string(),
                description: z.string().nullable(),
                image: z.string(),
                isActive: z.boolean(),
              })
            ),
          }),
        },
      },
    },
    gamesByActive
  );

  app.post(
    "/games/favorite",
    {
      onRequest: [verifyJwt],
      schema: {
        tags: ["Games"],
        summary: "Adiciona ou remove um jogo dos favoritos",
        body: z.object({
          gameId: z.uuid(),
          isFavorite: z.boolean(),
        }),
        response: {
          204: z.null(),
        },
      },
    },
    gamesFavorite
  );

  app.post(
    "/games",
    {
      schema: {
        body: gameCreateBodySchema,
        response: {
          201: z.object({
            id: z.uuid(),
            name: z.string(),
            description: z.string().nullable(),
            image: z.string(),
            isActive: z.boolean(),
            createdAt: z.coerce.date(),
            updatedAt: z.coerce.date(),
          }),
        },
        tags: ["Games"],
        summary: "Cria um novo game",
      },
    },
    createGame
  );

  app.put(
    "/games/:id",
    {
      schema: {
        params: gameParamsSchema,
        body: gameUpdateBodySchema,
        response: {
          200: z.object({
            id: z.uuid(),
            name: z.string(),
            description: z.string().nullable(),
            image: z.string(),
            isActive: z.boolean(),
            createdAt: z.coerce.date(),
            updatedAt: z.coerce.date(),
          }),
        },
        tags: ["Games"],
        summary: "Atualiza um game existente",
      },
    },
    updateGame
  );

  app.delete(
    "/games/:id",
    {
      schema: {
        params: gameParamsSchema,
        response: {
          204: z.null(),
        },
        tags: ["Games"],
        summary: "Remove um game por ID",
      },
    },
    removeGame
  );
}

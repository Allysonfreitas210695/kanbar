import type { FastifyInstance } from "fastify";
import z from "zod/v4";

import { gamesByActive } from "./games-by-active.ts";
import { gamesFavorite } from "./games-favorite.ts";
import { ZodTypeProvider } from "fastify-type-provider-zod";

import { verifyJwt } from "../../../middlewares/verify-jwt.ts";

export function gamesRoutes(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
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

  app.withTypeProvider<ZodTypeProvider>().post(
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
          404: z.object({ error: z.string() }),
          500: z.object({ error: z.string() }),
        },
      },
    },
    gamesFavorite
  );
}

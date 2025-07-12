import type { FastifyInstance, FastifyRequest } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import type { JwtPayload } from "../../types/jwt-payload.ts";
import { z } from "zod";
import { eq, and } from "drizzle-orm";

import { games } from "../../db/schema/games.ts";
import { db } from "../../db/connection.ts";
import { favoriteGames } from "../../db/schema/favorites.ts";

const favoriteGameBodySchema = z.object({
  gameId: z.string().uuid(),
  isFavorite: z.boolean(),
});

type FavoriteGameBody = z.infer<typeof favoriteGameBodySchema>;

export async function gamesFavoriteRoutes(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/games/favorite",
    {
      preValidation: [app.authenticate],
      schema: {
        body: favoriteGameBodySchema,
        response: {
          204: z.null(),
          404: z.object({
            error: z.string(),
          }),
          500: z.object({
            error: z.string(),
          }),
        },
      },
    },
    async (
      request: FastifyRequest<{ Body: FavoriteGameBody; user: JwtPayload }>,
      reply
    ) => {
      const { gameId, isFavorite } = request.body;
      const { sub: userId } = request.user as JwtPayload;

      const gameExists = await db.query.games.findFirst({
        where: eq(games.id, gameId),
      });

      if (!gameExists) {
        return reply.status(404).send({ error: "Game not found" });
      }

      try {
        if (isFavorite) {
          await db
            .insert(favoriteGames)
            .values({ userId, gameId })
            .onConflictDoNothing();
        } else {
          await db
            .delete(favoriteGames)
            .where(
              and(
                eq(favoriteGames.userId, userId),
                eq(favoriteGames.gameId, gameId)
              )
            );
        }

        return reply.status(204).send();
      } catch (error) {
        console.error("Error in /games/favorite:", error);
        return reply.status(500).send({ error: "Internal server error" });
      }
    }
  );
}

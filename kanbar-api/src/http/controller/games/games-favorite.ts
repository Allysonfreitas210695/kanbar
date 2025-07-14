import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod/v4";
import { DrizzleFavoritesRepository } from "../../../repositories/drizzle/drizzle-favorites-repository.ts";
import { DrizzleGamesRepository } from "../../../repositories/drizzle/drizzle-games-repository.ts";
import { ToggleFavoriteGameUseCase } from "../../../use-cases/toggle-favorite-game-use-case.ts";

export const favoriteGameBodySchema = z.object({
  gameId: z.uuid(),
  isFavorite: z.boolean(),
});

export async function gamesFavorite(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { gameId, isFavorite } = favoriteGameBodySchema.parse(request.body);

  const { sub: userId } = request.user;

  const useCase = new ToggleFavoriteGameUseCase(
    new DrizzleGamesRepository(),
    new DrizzleFavoritesRepository()
  );

  try {
    await useCase.execute({ userId, gameId, isFavorite });
    return reply.status(204).send();
  } catch (error) {
    if (error instanceof Error && error.message === "Game not found") {
      return reply.status(404).send({ error: "Game not found" });
    }

    return reply.status(500).send({ error: "Internal server error" });
  }
}

import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod/v4";
import { DrizzleGamesRepository } from "../../../repositories/drizzle/drizzle-games-repository.ts";
import { ToggleFavoriteGameUseCase } from "../../../use-cases/games/toggle-favorite-game-use-case.ts";

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

  const useCase = new ToggleFavoriteGameUseCase(new DrizzleGamesRepository());

  await useCase.execute({ userId, gameId, isFavorite });
  return reply.status(204).send();
}

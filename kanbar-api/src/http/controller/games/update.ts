import { FastifyRequest, FastifyReply } from "fastify";
import z from "zod/v4";
import { DrizzleGamesRepository } from "../../../repositories/drizzle/drizzle-games-repository.ts";
import { UpdateGameUseCase } from "../../../use-cases/games/update-game-use-case.ts";

export const gameUpdateBodySchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  image: z.string().optional(),
  isActive: z.boolean().optional(),
});

export const gameParamsSchema = z.object({
  id: z.uuid(),
});

export async function updateGame(request: FastifyRequest, reply: FastifyReply) {
  const { id } = gameParamsSchema.parse(request.params);
  const data = gameUpdateBodySchema.parse(request.body);

  const repository = new DrizzleGamesRepository();
  const useCase = new UpdateGameUseCase(repository);

  const { game } = await useCase.execute({ id, data });

  return reply.status(200).send(game);
}

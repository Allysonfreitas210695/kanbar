import { FastifyRequest, FastifyReply } from "fastify";
import z from "zod/v4";
import { DrizzleGamesRepository } from "../../../repositories/drizzle/drizzle-games-repository.ts";
import { CreateGameUseCase } from "../../../use-cases/games/register-game-use-case.ts";

export const gameCreateBodySchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  image: z.url(),
  isActive: z.boolean().optional(),
});

export async function createGame(request: FastifyRequest, reply: FastifyReply) {
  const body = gameCreateBodySchema.parse(request.body);

  const repository = new DrizzleGamesRepository();
  const useCase = new CreateGameUseCase(repository);

  const { game } = await useCase.execute({ data: body });

  return reply.status(201).send(game);
}

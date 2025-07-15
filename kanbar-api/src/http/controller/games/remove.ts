import { FastifyRequest, FastifyReply } from "fastify";
import { gameParamsSchema } from "./update.ts";
import { DrizzleGamesRepository } from "../../../repositories/drizzle/drizzle-games-repository.ts";
import { RemoveGameUseCase } from "../../../use-cases/games/remove-game-use-case.ts";

export async function removeGame(request: FastifyRequest, reply: FastifyReply) {
  const { id } = gameParamsSchema.parse(request.params);

  const repository = new DrizzleGamesRepository();
  const useCase = new RemoveGameUseCase(repository);

  await useCase.execute({ id });

  return reply.status(204).send();
}

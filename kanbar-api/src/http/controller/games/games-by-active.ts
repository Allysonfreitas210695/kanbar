import type { FastifyReply, FastifyRequest } from "fastify";

import { DrizzleGamesRepository } from "../../../repositories/drizzle/drizzle-games-repository.ts";
import { ListActiveGamesUseCase } from "../../../use-cases/list-active-games-use-case.ts";

export async function gamesByActive(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const repository = new DrizzleGamesRepository();
  const useCase = new ListActiveGamesUseCase(repository);

  const games = await useCase.execute();
  return reply.status(200).send({ games });
}

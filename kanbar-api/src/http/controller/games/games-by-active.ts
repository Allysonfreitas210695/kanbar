import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { verifyJwt } from "../../../middlewares/verify-jwt.ts";
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

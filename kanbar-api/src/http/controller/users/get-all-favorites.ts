import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { GetUserFavoritesUseCase } from "../../../use-cases/users/get-user-favorites-use-case.ts";
import { DrizzleUsersRepositories } from "../../../repositories/drizzle/drizzle-users-repositories.ts";

export async function getAllFavorites(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const userId = request.user.sub;

  const repository = new DrizzleUsersRepositories();
  const useCase = new GetUserFavoritesUseCase(repository);

  const favorites = await useCase.execute(userId);

  return reply.status(200).send(favorites);
}

import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { DrizzleDrinksRepository } from "../../../repositories/drizzle/drizzle-drinks-repository.ts";
import { DrinkNotFoundError } from "../../../use-cases/errors/drink-not-found-error.ts";
import { ToggleFavoriteDrinkUseCase } from "../../../use-cases/drinks/toggle-favorite-drink-use-case.ts";

export const bodySchema = z.object({
  drinkId: z.uuid(),
  favorite: z.boolean(),
});

export async function favoriteDrink(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { drinkId, favorite } = bodySchema.parse(request.body);
  const { sub: userId } = request.user;

  const drinksRepository = new DrizzleDrinksRepository();

  const useCase = new ToggleFavoriteDrinkUseCase(drinksRepository);

  await useCase.execute({ userId, drinkId, favorite });
  return reply.status(204).send();
}

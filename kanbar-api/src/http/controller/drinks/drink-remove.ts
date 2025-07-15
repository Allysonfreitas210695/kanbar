import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { DrizzleDrinksRepository } from "../../../repositories/drizzle/drizzle-drinks-repository.ts";
import { RemoveDrinkUseCase } from "../../../use-cases/drinks/remove-drink-use-case.ts";

const paramsRemoveDrinkSchema = z.object({
  id: z.uuid(),
});

export async function removeDrink(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { id } = paramsRemoveDrinkSchema.parse(request.params);

  const repository = new DrizzleDrinksRepository();
  const useCase = new RemoveDrinkUseCase(repository);

  await useCase.execute({ id });

  return reply.status(204).send();
}

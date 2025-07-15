import type { FastifyReply, FastifyRequest } from "fastify";

import { DrizzleDrinksRepository } from "../../../repositories/drizzle/drizzle-drinks-repository.ts";
import { GetDrinkByIdUseCase } from "../../../use-cases/drinks/get-drink-by-id-use-case.ts";

export async function getDrinkById(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { id } = request.params as { id: string };

  const repository = new DrizzleDrinksRepository();
  const getDrinkByIdUseCase = new GetDrinkByIdUseCase(repository);

  const drink = await getDrinkByIdUseCase.execute(id);

  if (!drink) {
    return reply.status(404).send({ message: "Drink not found" });
  }

  return reply.send({
    drink: {
      id: drink.id,
      name: drink.name,
      description: drink.description,
      imageUrl: drink.image,
    },
  });
}

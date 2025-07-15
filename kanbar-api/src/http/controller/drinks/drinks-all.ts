import type { FastifyReply, FastifyRequest } from "fastify";

import { DrizzleDrinksRepository } from "../../../repositories/drizzle/drizzle-drinks-repository.ts";
import { GetAllDrinksUseCase } from "../../../use-cases/drinks/get-all-drinks-use-case.ts";

export async function getAllDrinks(app: FastifyRequest, reply: FastifyReply) {
  const repository = new DrizzleDrinksRepository();
  const getAllDrinksUseCase = new GetAllDrinksUseCase(repository);

  const drinks = await getAllDrinksUseCase.execute();

  return reply.status(200).send({
    drinks: drinks.map((drink) => ({
      id: drink.id,
      name: drink.name,
      description: drink.description,
      imageUrl: drink.image,
    })),
  });
}

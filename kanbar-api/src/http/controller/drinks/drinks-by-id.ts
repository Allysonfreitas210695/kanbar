import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

import { DrizzleDrinksRepository } from "../../../repositories/drizzle/drizzle-drinks-repository.ts";
import { GetDrinkByIdUseCase } from "../../../use-cases/get-drink-by-id-use-case.ts";

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

  return reply.send({ drink: { id: drink.id, name: drink.name } });
}

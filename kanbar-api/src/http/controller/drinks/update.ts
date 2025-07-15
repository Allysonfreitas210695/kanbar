import { FastifyRequest, FastifyReply } from "fastify";
import { DrizzleDrinksRepository } from "../../../repositories/drizzle/drizzle-drinks-repository.ts";
import { UpdateDrinkUseCase } from "../../../use-cases/drinks/update-drink-use-case.ts";
import z from "zod/v4";

export const updateDrinkParamsSchema = z.object({
  id: z.uuid(),
});

export const updateDrinkBodySchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  image: z.string().optional(),
  ingredients: z.string().optional(),
  difficulty: z.string().optional(),
  estimatedValue: z.number().optional(),
  restrictions: z.string().optional(),
});

export async function updateDrink(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { id } = updateDrinkParamsSchema.parse(request.params);
  const data = updateDrinkBodySchema.parse(request.body);

  const repository = new DrizzleDrinksRepository();
  const useCase = new UpdateDrinkUseCase(repository);

  const { drink } = await useCase.execute({ id, data });

  return reply.status(200).send(drink);
}

import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { DrizzleDrinksRepository } from "../../../repositories/drizzle/drizzle-drinks-repository.ts";
import { RegisterDrinkUseCase } from "../../../use-cases/drinks/register-use-case.ts";

export const bodyRegisterSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  image: z.url().optional(),
  ingredients: z.string().optional(),
  difficulty: z.string().optional(),
  estimatedValue: z.number().optional(),
  restrictions: z.string().optional(),
});

export async function registerDrink(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const body = bodyRegisterSchema.parse(request.body);

  const drinksRepository = new DrizzleDrinksRepository();
  const useCase = new RegisterDrinkUseCase(drinksRepository);

  const result = await useCase.execute({ data: body });

  return reply.status(201).send(result);
}

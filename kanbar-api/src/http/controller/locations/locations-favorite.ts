import { FastifyReply, FastifyRequest } from "fastify";
import { DrizzleLocationRepository } from "../../../repositories/drizzle/drizzle-locations-repository.ts";
import { ToggleFavoriteLocationUseCase } from "../../../use-cases/locations/toggle-favorite-location-use-case.ts";
import z from "zod/v4";

export const locationFavoriteSchema = z.object({
  locationId: z.uuid(),
  isFavorite: z.boolean(),
});

export async function locationFavorite(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { locationId, isFavorite } = locationFavoriteSchema.parse(request.body);
  const userId = request.user.sub;

  const repository = new DrizzleLocationRepository();
  const useCase = new ToggleFavoriteLocationUseCase(repository);

  await useCase.execute({ userId, locationId, isFavorite });

  return reply.status(204).send();
}

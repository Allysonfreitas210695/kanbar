import { DrizzleLocationRepository } from "../../../repositories/drizzle/drizzle-locations-repository.ts";
import { GetAllLocationsUseCase } from "../../../use-cases/locations/locations-all-use-case.ts";
import { FastifyReply, FastifyRequest } from "fastify";

export async function locationsAll(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const locationRepository = new DrizzleLocationRepository();
  const getAllLocationsUseCase = new GetAllLocationsUseCase(locationRepository);

  const locations = await getAllLocationsUseCase.execute();

  return reply.status(200).send(locations);
}

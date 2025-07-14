import { verifyJwt } from "../../../middlewares/verify-jwt.ts";
import z from "zod/v4";
import { DrizzleLocationRepository } from "../../../repositories/drizzle/drizzle-locations-repository.ts";
import { GetAllLocationsUseCase } from "../../../use-cases/locations/locations-all-use-case.ts";
import { FastifyZodInstance } from "../../../types/fastifyZodInstance.ts";

export function getAllLocationsRoute(app: FastifyZodInstance) {
  app.get(
    "/locations",
    {
      // onRequest: [verifyJwt],
      schema: {
        tags: ["locations"],
        summary: "Retorna os dados dos locais",
        response: {
          200: z.array(
            z.object({
              id: z.string(),
              name: z.string(),
              address: z.string().nullable(),
              image: z.string().nullable(),
              createdAt: z.date(),
              drinks: z.array(
                z.object({
                  id: z.string(),
                  name: z.string(),
                })
              ),
            })
          ),
          401: z.object({
            error: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const locationRepository = new DrizzleLocationRepository();
      const getAllLocationsUseCase = new GetAllLocationsUseCase(
        locationRepository
      );

      const locations = await getAllLocationsUseCase.execute();

      return reply.status(200).send(locations);
    }
  );
}

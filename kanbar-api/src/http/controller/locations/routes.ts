import { FastifyInstance } from "fastify";
import z from "zod/v4";

import { locationsAll } from "../locations/locations-all.ts";

export function locationsRoutes(app: FastifyInstance) {
  app.get(
    "/locations",
    {
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
    locationsAll
  );
}

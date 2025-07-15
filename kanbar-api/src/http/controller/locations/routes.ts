import z from "zod/v4";

import { locationsAll } from "../locations/locations-all.ts";
import type { fastifyZodInstance } from "../../../@types/fastifyZodInstance.ts";
import {
  locationFavorite,
  locationFavoriteSchema,
} from "./locations-favorite.ts";
import { verifyJwt } from "../../../middlewares/verify-jwt.ts";

export function locationsRoutes(app: fastifyZodInstance) {
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

  app.post(
    "/locations/favorite",
    {
      onRequest: [verifyJwt],
      schema: {
        tags: ["Locations"],
        summary: "Adiciona ou remove um local dos favoritos",
        body: locationFavoriteSchema,
        response: {
          204: z.null(),
          401: z.object({
            error: z.string(),
          }),
        },
      },
    },
    locationFavorite
  );
}

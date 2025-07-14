import type { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod/v4";

import { getAllDrinks } from "./drinks-all.ts";
import { getDrinkById } from "./drinks-by-id.ts";
import { bodySchema, favoriteDrink } from "./drinks-favorite.ts";

import { verifyJwt } from "../../../middlewares/verify-jwt.ts";

export function drinksRoutes(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/drinks",
    {
      schema: {
        tags: ["Drinks"],
        summary: "Lista todos os drinks",
        response: {
          200: z.object({
            drinks: z.array(
              z.object({
                id: z.string(),
                name: z.string(),
                description: z.string().nullable(),
                imageUrl: z.string().nullable(),
              })
            ),
          }),
        },
      },
    },
    getAllDrinks
  );

  app.withTypeProvider<ZodTypeProvider>().get(
    "/drinks/:id",
    {
      schema: {
        tags: ["Drinks"],
        summary: "Busca um drink pelo ID",
        params: z.object({
          id: z.string(),
        }),
        response: {
          200: z.object({
            drink: z.object({
              id: z.string(),
              name: z.string(),
            }),
          }),
          404: z.object({
            message: z.string(),
          }),
        },
      },
    },
    getDrinkById
  );

  app.post(
    "/drinks/favorite",
    {
      preValidation: [verifyJwt],
      schema: {
        body: bodySchema,
        response: {
          204: z.null(),
          404: z.object({ error: z.string() }),
          400: z.object({ error: z.string() }),
        },
      },
    },
    favoriteDrink
  );
}

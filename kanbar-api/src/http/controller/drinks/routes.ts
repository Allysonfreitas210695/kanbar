import z from "zod/v4";

import { getAllDrinks } from "./drinks-all.ts";
import { getDrinkById } from "./drinks-by-id.ts";
import { bodyFavoriteSchema, favoriteDrink } from "./drinks-favorite.ts";

import { verifyJwt } from "../../../middlewares/verify-jwt.ts";
import type { fastifyZodInstance } from "../../../@types/fastifyZodInstance.ts";
import { bodyRegisterSchema, registerDrink } from "./register.ts";

export function drinksRoutes(app: fastifyZodInstance) {
  app.get(
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

  app.get(
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
              description: z.string(),
              imageUrl: z.string(),
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
    "/drinks",
    {
      preValidation: [verifyJwt],
      schema: {
        tags: ["Drinks"],
        summary: "Cria um novo drink",
        body: bodyRegisterSchema,
        response: {
          201: z.object({
            id: z.uuid(),
            name: z.string(),
            description: z.string().nullable(),
            image: z.string().nullable(),
            ingredients: z.string().nullable(),
            difficulty: z.string().nullable(),
            estimatedValue: z.number().nullable(),
            restrictions: z.string().nullable(),
            createdAt: z.coerce.date(),
          }),
        },
      },
    },
    registerDrink
  );

  app.post(
    "/drinks/favorite",
    {
      preValidation: [verifyJwt],
      schema: {
        tags: ["Drinks"],
        summary: "Adicionar ou remover favorite drink",
        body: bodyFavoriteSchema,
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

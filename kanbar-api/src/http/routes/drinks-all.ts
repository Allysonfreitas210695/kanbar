import { z } from "zod";
import { db } from "../../db/connection.ts";
import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { drinks } from "../../db/schema/drinks.ts";

export async function getAllDrinksRoute(app: FastifyInstance) {
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
    async (_request, reply) => {
      const allDrinks = await db
        .select({
          id: drinks.id,
          name: drinks.name,
          description: drinks.description,
          imageUrl: drinks.image,
        })
        .from(drinks);

      return reply.status(200).send({ drinks: allDrinks });
    }
  );
}

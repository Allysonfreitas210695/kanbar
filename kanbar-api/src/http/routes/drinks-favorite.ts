import type { FastifyInstance, FastifyRequest } from "fastify";
import { z } from "zod";
import { eq, and } from "drizzle-orm";
import { db } from "../../db/connection.ts";
import { schema } from "../../db/schema/index.ts";

const bodySchema = z.object({
  userId: z.string().uuid(),
  drinkId: z.string().uuid(),
  favorite: z.boolean(),
});

type RequestBody = z.infer<typeof bodySchema>;
export async function favoriteDrinkRoute(app: FastifyInstance) {
  app.post(
    "/drinks/favorite",
    {
      schema: {
        body: z.object({
          userId: z.string().uuid(),
          drinkId: z.string().uuid(),
          favorite: z.boolean(),
        }),
        response: {
          204: z.null(),
          400: z.object({
            error: z.string(),
          }),
        },
      },
    },
    async (request: FastifyRequest<{ Body: RequestBody }>, reply) => {
      const { userId, drinkId, favorite } = request.body;
      try {
        if (favorite) {
          await db
            .insert(schema.favoriteDrinks)
            .values({ userId, drinkId })
            .onConflictDoNothing();
        } else {
          await db
            .delete(schema.favoriteDrinks)
            .where(
              and(
                eq(schema.favoriteDrinks.userId, userId),
                eq(schema.favoriteDrinks.drinkId, drinkId)
              )
            );
        }

        return reply.status(204).send();
      } catch (error) {
        return reply.status(400).send({ error: "Failed to update favorites" });
      }
    }
  );
}

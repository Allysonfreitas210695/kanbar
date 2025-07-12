import { z } from "zod";
import { schema } from "../../db/schema/index.ts";
import { eq } from "drizzle-orm";
import { db } from "../../db/connection.ts";
import type { FastifyInstance, FastifyRequest } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";

export async function getDrinkByIdRoute(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/drinks/:id",
    {
      schema: {
        tags: ["Drinks"],
        summary: "Busca um drink pelo ID",
        params: z.object({
          id: z.string().uuid(),
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
    async (request: FastifyRequest<{ Params: { id: string } }>, reply) => {
      const { id } = request.params;

      const drink = await db
        .select({
          id: schema.drinks.id,
          name: schema.drinks.name,
        })
        .from(schema.drinks)
        .where(eq(schema.drinks.id, id))
        .limit(1);

      if (drink.length === 0) {
        return reply.status(404).send({ message: "Drink not found" });
      }

      return reply.send({ drink: drink[0] });
    }
  );
}

import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { games } from "../../db/schema/games.ts";
import { db } from "../../db/connection.ts";
import type { FastifyInstance } from "fastify";
import { eq } from "drizzle-orm";

export async function gamesRoutes(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/games",
    {
      schema: {
        tags: ["Games"],
        summary: "Lista todos os jogos ativos",
        response: {
          200: z.object({
            games: z.array(
              z.object({
                id: z.string().uuid(),
                name: z.string(),
                description: z.string().nullable(),
                image: z.string(),
                isActive: z.boolean(),
              })
            ),
          }),
        },
      },
    },
    async (_request, reply) => {
      const allGames = await db
        .select({
          id: games.id,
          name: games.name,
          description: games.description,
          image: games.image,
          isActive: games.isActive,
        })
        .from(games)
        .where(eq(games.isActive, true));

      console.log(allGames);
      return reply.status(200).send({ games: allGames });
    }
  );
}

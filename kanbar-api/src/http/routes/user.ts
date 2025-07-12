import type { FastifyInstance } from "fastify";
import type { JwtPayload } from "../../types/jwt-payload.ts";
import { z } from "zod";
import type { ZodTypeProvider } from "fastify-type-provider-zod";

export async function userRoutes(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/me",
    {
      schema: {
        tags: ["Users"],
        summary: "Retorna os dados do usuário autenticado",
        response: {
          200: z.object({
            id: z.string(),
            email: z.string().email(),
          }),
          401: z.object({
            error: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      if (!request.user) {
        return reply.status(401).send({ error: "Unauthorized" });
      }

      const user = request.user as JwtPayload;

      return { id: user.sub, email: user.email };
    }
  );
}

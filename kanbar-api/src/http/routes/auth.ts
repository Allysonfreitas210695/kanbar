import type { FastifyInstance } from "fastify";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { db } from "../../db/connection.ts";
import { users } from "../../db/schema/users.ts";
import bcrypt from "bcryptjs";
import type { ZodTypeProvider } from "fastify-type-provider-zod";

export async function authRoutes(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/login",
    {
      schema: {
        tags: ["Auth"],
        summary: "Autenticação de usuário",
        body: z.object({
          email: z.string().email(),
          password: z.string().min(6),
        }),
        response: {
          200: z.object({
            token: z.string(),
          }),
          401: z.object({
            error: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { email, password } = request.body;

      const user = await db.query.users.findFirst({
        where: eq(users.email, email),
      });

      if (!user) {
        return reply.status(401).send({ error: "Invalid credentials" });
      }

      const passwordMatch = await bcrypt.compare(password, user.passwordHash);
      if (!passwordMatch) {
        return reply.status(401).send({ error: "Invalid credentials" });
      }

      const token = app.jwt.sign({
        sub: user.id,
        email: user.email,
      });

      return reply.send({ token });
    }
  );

  app.withTypeProvider<ZodTypeProvider>().post(
    "/logout",
    {
      preValidation: [app.authenticate],
      schema: {
        tags: ["Auth"],
        summary: "Logout do usuário",
        response: {
          200: z.object({
            success: z.boolean(),
          }),
        },
      },
    },
    async (request, reply) => {
      return reply.send({ success: true });
    }
  );
}

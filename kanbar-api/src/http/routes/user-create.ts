import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { db } from "../../db/connection.ts";
import { users } from "../../db/schema/users.ts";
import bcrypt from "bcryptjs";
import type { FastifyInstance, FastifyRequest } from "fastify";

export const registerSchemaBody = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
});

const bodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
});

type RequestBody = z.infer<typeof bodySchema>;

export async function userCreateRoutes(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/register",
    {
      schema: {
        tags: ["Users"],
        summary: "Registra um novo usuário",
        body: registerSchemaBody,
        response: {
          201: z.object({
            id: z.string().uuid(),
            name: z.string(),
            email: z.string().email(),
          }),
          409: z.object({
            error: z.string(),
          }),
        },
      },
    },
    async (request: FastifyRequest<{ Body: RequestBody }>, reply) => {
      const { name, email, password } = request.body;

      const userExists = await db.query.users.findFirst({
        where: eq(users.email, email),
      });

      if (userExists) {
        return reply.status(409).send({ error: "User already exists" });
      }

      const passwordHash = await bcrypt.hash(password, 10);

      const [user] = await db
        .insert(users)
        .values({
          name,
          email,
          passwordHash,
        })
        .returning({ id: users.id, name: users.name, email: users.email });

      return reply.status(201).send(user);
    }
  );
}

import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod/v4";
import { DrizzleRepositories } from "../../../repositories/drizzle/drizzle-repositories.ts";
import { AuthenticateUserUseCase } from "../../../use-cases/authenticate-user-use-case.ts";
import { InvalidCredentialsError } from "../../../use-cases/errors/invalid-credentials-error.ts";

export const schemaSessionBody = z.object({
  email: z.email(),
  password: z.string().min(6),
});
export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { email, password } = schemaSessionBody.parse(request.body);

  const repository = new DrizzleRepositories();
  const useCase = new AuthenticateUserUseCase(repository);

  try {
    const { user } = await useCase.execute({ email, password });

    const token = reply.jwtSign({
      sub: user.id,
      email: user.email,
    });

    return reply.send({ token });
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(401).send({ error: "Invalid credentials" });
    }
    return reply.status(500).send({ error: "Internal server error" });
  }
}

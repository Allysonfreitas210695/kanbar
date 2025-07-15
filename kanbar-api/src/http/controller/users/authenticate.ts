import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod/v4";

import { AuthenticateUserUseCase } from "../../../use-cases/users/authenticate-user-use-case.ts";
import { InvalidCredentialsError } from "../../../use-cases/errors/invalid-credentials-error.ts";
import { DrizzleUsersRepositories } from "../../../repositories/drizzle/drizzle-users-repositories.ts";

export const schemaSessionBody = z.object({
  email: z.email(),
  password: z.string().min(6),
});
export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { email, password } = schemaSessionBody.parse(request.body);
  console.log("kdnjdnd");

  const repository = new DrizzleUsersRepositories();
  const useCase = new AuthenticateUserUseCase(repository);

  try {
    const { user } = await useCase.execute({ email, password });

    const token = await reply.jwtSign({
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

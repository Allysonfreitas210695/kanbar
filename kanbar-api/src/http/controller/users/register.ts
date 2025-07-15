import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod/v4";

import { DrizzleUsersRepositories } from "../../../repositories/drizzle/drizzle-users-repositories.ts";
import { UserAlreadyExistsError } from "../../../use-cases/errors/user-already-exists-error.ts";
import { UsersRegisterUseCase } from "../../../use-cases/users/users-register-use-case.ts";

export const registerSchemaBody = z.object({
  name: z.string().min(3),
  email: z.email(),
  password: z.string().min(6),
});

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const { name, email, password } = registerSchemaBody.parse(request.body);
  const repository = new DrizzleUsersRepositories();
  const useCase = new UsersRegisterUseCase(repository);

  const { user } = await useCase.execute({ name, email, password });
  return reply.status(201).send({
    id: user.id,
    name: user.name,
    email: user.email,
  });
}

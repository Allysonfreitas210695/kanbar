import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { DrizzleRepositories } from '../../../repositories/drizzle/drizzle-repositories.ts'
import { UserAlreadyExistsError } from '../../../use-cases/errors/user-already-exists-error.ts'
import { UsersRegisterUseCase } from '../../../use-cases/users-register-use-case.ts'

export const registerSchemaBody = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
})

export function userRegisterRoutes(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/users',
    {
      schema: {
        tags: ['Users'],
        summary: 'Registra um novo usuário',
        body: z.object({
          name: z.string().min(3),
          email: z.string().email(),
          password: z.string().min(6),
        }),
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
    async (request, reply) => {
      const { name, email, password } = registerSchemaBody.parse(request.body)
      const repository = new DrizzleRepositories()
      const useCase = new UsersRegisterUseCase(repository)

      try {
        const { user } = await useCase.execute({ name, email, password })
        return reply.status(201).send({
          id: user.id,
          name: user.name,
          email: user.email,
        })
      } catch (error) {
        if (error instanceof UserAlreadyExistsError) {
          return reply.status(409).send({ error: 'User already exists' })
        }
        return reply.status(500).send({ error: 'Internal server error' })
      }
    }
  )
}

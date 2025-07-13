import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { DrizzleRepositories } from '../../../repositories/drizzle/drizzle-repositories.ts'
import { AuthenticateUserUseCase } from '../../../use-cases/authenticate-user-use-case.ts'
import { InvalidCredentialsError } from '../../../use-cases/errors/invalid-credentials-error.ts'

const schemaSessionBody = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})
export function authenticateRoutes(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/session',
    {
      schema: {
        tags: ['Auth'],
        summary: 'Autenticação de usuário',
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
      const { email, password } = schemaSessionBody.parse(request.body)

      const repository = new DrizzleRepositories()
      const useCase = new AuthenticateUserUseCase(repository)

      try {
        const { user } = await useCase.execute({ email, password })

        const token = app.jwt.sign({
          sub: user.id,
          email: user.email,
        })

        return reply.send({ token })
      } catch (error) {
        if (error instanceof InvalidCredentialsError) {
          return reply.status(401).send({ error: 'Invalid credentials' })
        }
        return reply.status(500).send({ error: 'Internal server error' })
      }
    }
  )
}

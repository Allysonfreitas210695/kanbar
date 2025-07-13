import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { verifyJwt } from '../../../middlewares/verify-jwt.ts'

export function profileRoutes(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/users/me',
    {
      onRequest: [verifyJwt],
      schema: {
        tags: ['Users'],
        summary: 'Retorna os dados do usuário autenticado',
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
    (request, reply) => {
      if (!request.user) {
        return reply.status(401).send({ error: 'Unauthorized' })
      }

      return reply.send({
        id: request.user.sub,
        email: request.user.email,
      })
    }
  )
}

import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { verifyJwt } from '../../../middlewares/verify-jwt.ts'
import { DrizzleGamesRepository } from '../../../repositories/drizzle/drizzle-games-repository.ts'
import { ListActiveGamesUseCase } from '../../../use-cases/list-active-games-use-case.ts'

export function gamesByActiveRoutes(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/games',
    {
      onRequest: [verifyJwt],
      schema: {
        tags: ['Games'],
        summary: 'Lista todos os jogos ativos',
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
      const repository = new DrizzleGamesRepository()
      const useCase = new ListActiveGamesUseCase(repository)

      const games = await useCase.execute()
      return reply.status(200).send({ games })
    }
  )
}

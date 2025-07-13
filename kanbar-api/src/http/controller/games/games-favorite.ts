import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { verifyJwt } from '../../../middlewares/verify-jwt.ts'
import { DrizzleFavoritesRepository } from '../../../repositories/drizzle/drizzle-favorites-repository.ts'
import { DrizzleGamesRepository } from '../../../repositories/drizzle/drizzle-games-repository.ts'
import { ToggleFavoriteGameUseCase } from '../../../use-cases/toggle-favorite-game-use-case.ts'

export const favoriteGameBodySchema = z.object({
  gameId: z.string().uuid(),
  isFavorite: z.boolean(),
})

export function gamesFavoriteRoutes(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/games/favorite',
    {
      onRequest: [verifyJwt],
      schema: {
        tags: ['Games'],
        summary: 'Adiciona ou remove um jogo dos favoritos',
        body: z.object({
          gameId: z.string().uuid(),
          isFavorite: z.boolean(),
        }),
        response: {
          204: z.null(),
          404: z.object({ error: z.string() }),
          500: z.object({ error: z.string() }),
        },
      },
    },
    async (request, reply) => {
      const { gameId, isFavorite } = favoriteGameBodySchema.parse(request.body)

      const { sub: userId } = request.user

      const useCase = new ToggleFavoriteGameUseCase(
        new DrizzleGamesRepository(),
        new DrizzleFavoritesRepository()
      )

      try {
        await useCase.execute({ userId, gameId, isFavorite })
        return reply.status(204).send()
      } catch (error) {
        if (error instanceof Error && error.message === 'Game not found') {
          return reply.status(404).send({ error: 'Game not found' })
        }

        return reply.status(500).send({ error: 'Internal server error' })
      }
    }
  )
}

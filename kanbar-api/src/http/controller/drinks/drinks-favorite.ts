import type { FastifyInstance, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { verifyJwt } from '../../../middlewares/verify-jwt.ts'
import { DrizzleDrinksRepository } from '../../../repositories/drizzle/drizzle-drinks-repository.ts'
import { DrizzleFavoriteDrinksRepository } from '../../../repositories/drizzle/drizzle-favorite-drinks-repository.ts'
import { DrinkNotFoundError } from '../../../use-cases/errors/drink-not-found-error.ts'
import { ToggleFavoriteDrinkUseCase } from '../../../use-cases/toggle-favorite-drink-use-case.ts'

const bodySchema = z.object({
  drinkId: z.string().uuid(),
  favorite: z.boolean(),
})

export function favoriteDrinkRoute(app: FastifyInstance) {
  app.post(
    '/drinks/favorite',
    {
      preValidation: [verifyJwt],
      schema: {
        body: bodySchema,
        response: {
          204: z.null(),
          404: z.object({ error: z.string() }),
          400: z.object({ error: z.string() }),
        },
      },
    },
    async (request: FastifyRequest, reply) => {
      const { drinkId, favorite } = bodySchema.parse(request.body)
      const { sub: userId } = request.user

      const drinksRepository = new DrizzleDrinksRepository()
      const favoriteDrinksRepository = new DrizzleFavoriteDrinksRepository()

      const useCase = new ToggleFavoriteDrinkUseCase(
        drinksRepository,
        favoriteDrinksRepository
      )

      try {
        await useCase.execute({ userId, drinkId, favorite })
        return reply.status(204).send()
      } catch (error) {
        if (error instanceof DrinkNotFoundError) {
          return reply.status(404).send({ error: error.message })
        }
        return reply.status(400).send({ error: 'Failed to update favorites' })
      }
    }
  )
}

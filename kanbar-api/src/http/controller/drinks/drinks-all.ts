import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { DrizzleDrinksRepository } from '../../../repositories/drizzle/drizzle-drinks-repository.ts'
import { GetAllDrinksUseCase } from '../../../use-cases/get-all-drinks-use-case.ts'

export function getAllDrinksRoute(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/drinks',
    {
      schema: {
        tags: ['Drinks'],
        summary: 'Lista todos os drinks',
        response: {
          200: z.object({
            drinks: z.array(
              z.object({
                id: z.string(),
                name: z.string(),
                description: z.string().nullable(),
                imageUrl: z.string().nullable(),
              })
            ),
          }),
        },
      },
    },
    async (_request, reply) => {
      const repository = new DrizzleDrinksRepository()
      const getAllDrinksUseCase = new GetAllDrinksUseCase(repository)

      const drinks = await getAllDrinksUseCase.execute()

      return reply.status(200).send({
        drinks: drinks.map((drink) => ({
          id: drink.id,
          name: drink.name,
          description: drink.description,
          imageUrl: drink.image,
        })),
      })
    }
  )
}

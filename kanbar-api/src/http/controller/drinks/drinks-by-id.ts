import type { FastifyInstance, FastifyRequest } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { DrizzleDrinksRepository } from '../../../repositories/drizzle/drizzle-drinks-repository.ts'
import { GetDrinkByIdUseCase } from '../../../use-cases/get-drink-by-id-use-case.ts'

export function getDrinkByIdRoute(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/drinks/:id',
    {
      schema: {
        tags: ['Drinks'],
        summary: 'Busca um drink pelo ID',
        params: z.object({
          id: z.string(),
        }),
        response: {
          200: z.object({
            drink: z.object({
              id: z.string(),
              name: z.string(),
            }),
          }),
          404: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request: FastifyRequest<{ Params: { id: string } }>, reply) => {
      const { id } = request.params

      const repository = new DrizzleDrinksRepository()
      const getDrinkByIdUseCase = new GetDrinkByIdUseCase(repository)

      const drink = await getDrinkByIdUseCase.execute(id)

      if (!drink) {
        return reply.status(404).send({ message: 'Drink not found' })
      }

      return reply.send({ drink: { id: drink.id, name: drink.name } })
    }
  )
}

import type { FastifyInstance } from 'fastify'
import { getAllDrinksRoute } from './drinks-all.ts'
import { getDrinkByIdRoute } from './drinks-by-id.ts'
import { favoriteDrinkRoute } from './drinks-favorite.ts'

export function drinksRoutes(app: FastifyInstance) {
  app.register(
    (subApp) => {
      getAllDrinksRoute(subApp)
      getDrinkByIdRoute(subApp)
      favoriteDrinkRoute(subApp)
    },
    { prefix: '/api' }
  )
}

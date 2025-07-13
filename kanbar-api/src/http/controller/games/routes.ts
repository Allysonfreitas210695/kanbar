import type { FastifyInstance } from 'fastify'
import { gamesByActiveRoutes } from './games-by-active.ts'
import { gamesFavoriteRoutes } from './games-favorite.ts'

export function gamesRoutes(app: FastifyInstance) {
  app.register(
    (subApp) => {
      gamesByActiveRoutes(subApp)
      gamesFavoriteRoutes(subApp)
    },
    { prefix: '/api' }
  )
}

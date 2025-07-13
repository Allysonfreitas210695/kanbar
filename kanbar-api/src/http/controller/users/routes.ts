import type { FastifyInstance } from 'fastify'

import { authenticateRoutes } from './authenticate.ts'
import { profileRoutes } from './profile.ts'
import { userRegisterRoutes } from './register.ts'

export function usersRoutes(app: FastifyInstance) {
  app.register(
    (subApp) => {
      userRegisterRoutes(subApp)
      authenticateRoutes(subApp)
      profileRoutes(subApp)
    },
    { prefix: '/api' }
  )
}

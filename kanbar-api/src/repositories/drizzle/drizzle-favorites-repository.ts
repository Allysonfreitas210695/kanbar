import { and, eq } from 'drizzle-orm'
import { db } from '../../db/connection.ts'
import { favoriteGames } from '../../db/schema/favorites.ts'
import type { FavoritesRepository } from '../favorites-repositories.ts'

export class DrizzleFavoritesRepository implements FavoritesRepository {
  async add(userId: string, gameId: string): Promise<void> {
    await db
      .insert(favoriteGames)
      .values({ userId, gameId })
      .onConflictDoNothing()
  }

  async remove(userId: string, gameId: string): Promise<void> {
    await db
      .delete(favoriteGames)
      .where(
        and(eq(favoriteGames.userId, userId), eq(favoriteGames.gameId, gameId))
      )
  }
}

import { and, eq } from 'drizzle-orm'
import { db } from '../../db/connection.ts'
import { favoriteDrinks } from '../../db/schema/favorites.ts'
import type { FavoriteDrinksRepository } from '../favorite-drinks-repository.ts'

export class DrizzleFavoriteDrinksRepository
  implements FavoriteDrinksRepository
{
  async favorite({ userId, drinkId }: { userId: string; drinkId: string }) {
    await db
      .insert(favoriteDrinks)
      .values({ userId, drinkId })
      .onConflictDoNothing()
  }

  async unfavorite({ userId, drinkId }: { userId: string; drinkId: string }) {
    await db
      .delete(favoriteDrinks)
      .where(
        and(
          eq(favoriteDrinks.userId, userId),
          eq(favoriteDrinks.drinkId, drinkId)
        )
      )
  }
}

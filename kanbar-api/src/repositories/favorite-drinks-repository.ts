export interface FavoriteDrinksRepository {
  favorite(data: { userId: string; drinkId: string }): Promise<void>
  unfavorite(data: { userId: string; drinkId: string }): Promise<void>
}

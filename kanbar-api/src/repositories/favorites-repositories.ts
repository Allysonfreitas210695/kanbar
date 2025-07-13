export interface FavoritesRepository {
  add(userId: string, gameId: string): Promise<void>
  remove(userId: string, gameId: string): Promise<void>
}

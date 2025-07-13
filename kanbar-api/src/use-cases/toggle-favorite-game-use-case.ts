import type { FavoritesRepository } from '../repositories/favorites-repositories.ts'
import type { GamesRepository } from '../repositories/games-repositories.ts'
import { GameNotFoundError } from './errors/game-not-found-error.ts'

interface ToggleFavoriteGameInput {
  userId: string
  gameId: string
  isFavorite: boolean
}

export class ToggleFavoriteGameUseCase {
  constructor(
    private gamesRepository: GamesRepository,
    private favoritesRepository: FavoritesRepository
  ) {}

  async execute({
    userId,
    gameId,
    isFavorite,
  }: ToggleFavoriteGameInput): Promise<void> {
    const game = await this.gamesRepository.findById(gameId)

    if (!game) {
      throw new GameNotFoundError()
    }

    if (isFavorite) {
      await this.favoritesRepository.add(userId, gameId)
    } else {
      await this.favoritesRepository.remove(userId, gameId)
    }
  }
}

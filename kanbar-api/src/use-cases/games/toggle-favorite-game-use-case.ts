import { GamesRepository } from "../../repositories/games-repositories.ts";

interface ToggleFavoriteGameRequest {
  userId: string;
  gameId: string;
  isFavorite: boolean;
}

export class ToggleFavoriteGameUseCase {
  constructor(private repository: GamesRepository) {}

  async execute({
    userId,
    gameId,
    isFavorite,
  }: ToggleFavoriteGameRequest): Promise<void> {
    const alreadyFavorited = await this.repository.isGameFavorited(
      userId,
      gameId
    );

    if (isFavorite && !alreadyFavorited) {
      await this.repository.addFavoriteGame(userId, gameId);
    } else if (!isFavorite && alreadyFavorited) {
      await this.repository.removeFavoriteGame(userId, gameId);
    }
  }
}

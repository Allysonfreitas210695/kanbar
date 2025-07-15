import type { Game } from "../../db/schema/games.ts";
import type { GamesRepository } from "../../repositories/games-repositories.ts";

export class ListActiveGamesUseCase {
  constructor(private gamesRepository: GamesRepository) {}

  async execute(): Promise<Game[]> {
    return await this.gamesRepository.findActive();
  }
}

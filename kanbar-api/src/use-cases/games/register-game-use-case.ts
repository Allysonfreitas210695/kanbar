import { Game, NewGame } from "../../db/schema/games.ts";
import { GamesRepository } from "../../repositories/games-repositories.ts";

interface CreateGameUseCaseRequest {
  data: NewGame;
}

interface CreateGameUseCaseResponse {
  game: Game;
}

export class CreateGameUseCase {
  constructor(private gameRepository: GamesRepository) {}

  async execute({
    data,
  }: CreateGameUseCaseRequest): Promise<CreateGameUseCaseResponse> {
    const game = await this.gameRepository.create(data);
    return { game };
  }
}

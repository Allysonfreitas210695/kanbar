import { Game, NewGame } from "../../db/schema/games.ts";
import { GamesRepository } from "../../repositories/games-repositories.ts";

interface UpdateGameUseCaseRequest {
  id: string;
  data: Partial<NewGame>;
}

interface UpdateGameUseCaseResponse {
  game: Game;
}

export class UpdateGameUseCase {
  constructor(private gameRepository: GamesRepository) {}

  async execute({
    id,
    data,
  }: UpdateGameUseCaseRequest): Promise<UpdateGameUseCaseResponse> {
    const game = await this.gameRepository.update(id, data);
    return { game };
  }
}

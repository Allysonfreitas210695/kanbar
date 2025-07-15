import { GamesRepository } from "../../repositories/games-repositories.ts";

interface RemoveGameUseCaseRequest {
  id: string;
}

export class RemoveGameUseCase {
  constructor(private gameRepository: GamesRepository) {}

  async execute({ id }: RemoveGameUseCaseRequest): Promise<void> {
    await this.gameRepository.delete(id);
  }
}

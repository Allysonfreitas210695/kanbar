import { DrinksRepository } from "../../repositories/drinks-repository.ts";

interface RemoveDrinkUseCaseRequest {
  id: string;
}

export class RemoveDrinkUseCase {
  constructor(private drinkRepository: DrinksRepository) {}

  async execute({ id }: RemoveDrinkUseCaseRequest): Promise<void> {
    await this.drinkRepository.delete(id);
  }
}

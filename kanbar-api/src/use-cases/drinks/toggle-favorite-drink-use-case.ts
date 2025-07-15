import type { DrinksRepository } from "../../repositories/drinks-repository.ts";
import { DrinkNotFoundError } from "../errors/drink-not-found-error.ts";

interface ToggleFavoriteDrinkInput {
  userId: string;
  drinkId: string;
  favorite: boolean;
}

export class ToggleFavoriteDrinkUseCase {
  constructor(private drinksRepository: DrinksRepository) {}

  async execute({
    userId,
    drinkId,
    favorite,
  }: ToggleFavoriteDrinkInput): Promise<void> {
    const drink = await this.drinksRepository.findById(drinkId);
    if (!drink) {
      throw new DrinkNotFoundError();
    }

    if (favorite) {
      await this.drinksRepository.favoriteDrink({ userId, drinkId });
    } else {
      await this.drinksRepository.unfavoriteDrink({ userId, drinkId });
    }
  }
}

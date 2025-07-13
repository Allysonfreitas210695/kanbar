import type { DrinksRepository } from '../repositories/drinks-repository.ts'
import type { FavoriteDrinksRepository } from '../repositories/favorite-drinks-repository.ts'
import { DrinkNotFoundError } from './errors/drink-not-found-error.ts'

interface ToggleFavoriteDrinkInput {
  userId: string
  drinkId: string
  favorite: boolean
}

export class ToggleFavoriteDrinkUseCase {
  constructor(
    private drinksRepository: DrinksRepository,
    private favoriteDrinksRepository: FavoriteDrinksRepository
  ) {}

  async execute({
    userId,
    drinkId,
    favorite,
  }: ToggleFavoriteDrinkInput): Promise<void> {
    const drink = await this.drinksRepository.findById(drinkId)
    if (!drink) {
      throw new DrinkNotFoundError()
    }

    if (favorite) {
      await this.favoriteDrinksRepository.favorite({ userId, drinkId })
    } else {
      await this.favoriteDrinksRepository.unfavorite({ userId, drinkId })
    }
  }
}

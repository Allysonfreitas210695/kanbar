import type { Drink } from '../db/schema/drinks.ts'
import type { DrinksRepository } from '../repositories/drinks-repository.ts'

export class GetDrinkByIdUseCase {
  constructor(private drinksRepository: DrinksRepository) {}

  async execute(id: string): Promise<Drink | null> {
    return await this.drinksRepository.findById(id)
  }
}

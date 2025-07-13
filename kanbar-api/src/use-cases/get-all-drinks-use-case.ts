import type { Drink } from '../db/schema/drinks.ts'
import type { DrinksRepository } from '../repositories/drinks-repository.ts'

export class GetAllDrinksUseCase {
  constructor(private drinksRepository: DrinksRepository) {}

  async execute(): Promise<Drink[]> {
    return await this.drinksRepository.findAll()
  }
}

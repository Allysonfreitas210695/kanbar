import type { ILocationsRepository } from '../repositories/locations-repository.ts'
import type { LocationWithDrinks } from '../types/location-with-drinks.ts'

export class ListLocationsUseCase {
  constructor(private locationsRepository: ILocationsRepository) {}

  async execute(): Promise<LocationWithDrinks[]> {
    return await this.locationsRepository.findAllWithDrinks()
  }
}

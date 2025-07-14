import { LocationRepository } from "../../repositories/locations-repository.ts";

export class GetAllLocationsUseCase {
  constructor(private locationRepository: LocationRepository) {}

  async execute() {
    const locations = await this.locationRepository.findAllWithDrinks();
    return locations;
  }
}

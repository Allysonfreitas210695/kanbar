import { LocationRepository } from "../../repositories/locations-repository.ts";

interface ToggleFavoriteLocationUseCaseRequest {
  userId: string;
  locationId: string;
  isFavorite: boolean;
}

export class ToggleFavoriteLocationUseCase {
  constructor(private locationRepository: LocationRepository) {}

  async execute({
    userId,
    locationId,
    isFavorite,
  }: ToggleFavoriteLocationUseCaseRequest): Promise<void> {
    const alreadyFavorited = await this.locationRepository.isFavoritedLocation(
      userId,
      locationId
    );

    if (isFavorite && !alreadyFavorited) {
      await this.locationRepository.addFavoriteLocation(userId, locationId);
    } else if (!isFavorite && alreadyFavorited) {
      await this.locationRepository.removeLocation(userId, locationId);
    }
  }
}

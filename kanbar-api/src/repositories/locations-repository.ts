import { Location } from "../db/schema/locations.ts";

export interface LocationWithDrinks extends Location {
  drinks: {
    id: string;
    name: string;
  }[];
}

export interface LocationRepository {
  findAllWithDrinks(): Promise<LocationWithDrinks[]>;
  findById(id: string): Promise<LocationWithDrinks | null>;
  addFavoriteLocation(userId: string, locationId: string): Promise<void>;
  removeLocation(userId: string, locationId: string): Promise<void>;
  isFavoritedLocation(userId: string, locationId: string): Promise<boolean>;
}

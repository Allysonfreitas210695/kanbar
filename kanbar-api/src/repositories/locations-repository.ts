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
}

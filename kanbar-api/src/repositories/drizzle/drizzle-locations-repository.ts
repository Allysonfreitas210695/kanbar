import { eq } from "drizzle-orm";
import {
  LocationRepository,
  LocationWithDrinks,
} from "../locations-repository.ts";
import { locations } from "../../db/schema/locations.ts";
import { db } from "../../db/connection.ts";
import { drinks } from "../../db/schema/drinks.ts";
import { locationDrinks } from "../../db/schema/locationDrinks.ts";

export class DrizzleLocationRepository implements LocationRepository {
  async findAllWithDrinks(): Promise<LocationWithDrinks[]> {
    const allLocations = await db.select().from(locations);

    const result: LocationWithDrinks[] = await Promise.all(
      allLocations.map(async (loc) => {
        const drinkLinks = await db
          .select({
            id: drinks.id,
            name: drinks.name,
          })
          .from(locationDrinks)
          .innerJoin(drinks, eq(locationDrinks.drinkId, drinks.id))
          .where(eq(locationDrinks.locationId, loc.id));

        return {
          ...loc,
          drinks: drinkLinks.map((d) => d),
        };
      })
    );

    return result;
  }

  async findById(id: string): Promise<LocationWithDrinks | null> {
    const location = await db.query.locations.findFirst({
      where: (loc, { eq }) => eq(loc.id, id),
    });

    if (!location) {
      return null;
    }

    const drinkLinks = await db
      .select({
        id: drinks.id,
        name: drinks.name,
      })
      .from(locationDrinks)
      .innerJoin(drinks, eq(locationDrinks.drinkId, drinks.id))
      .where(eq(locationDrinks.locationId, location.id));

    return {
      ...location,
      drinks: drinkLinks.map((d) => d),
    };
  }
}

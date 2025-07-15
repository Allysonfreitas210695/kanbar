import { and, eq } from "drizzle-orm";
import {
  LocationRepository,
  LocationWithDrinks,
} from "../locations-repository.ts";
import { locations } from "../../db/schema/locations.ts";
import { db } from "../../db/connection.ts";
import { drinks } from "../../db/schema/drinks.ts";
import { locationDrinks } from "../../db/schema/locationDrinks.ts";
import { favoriteLocations } from "../../db/schema/favoriteLocations.ts";

export class DrizzleLocationRepository implements LocationRepository {
  async addFavoriteLocation(userId: string, locationId: string): Promise<void> {
    await db.insert(favoriteLocations).values({ userId, locationId });
  }

  async removeLocation(userId: string, locationId: string): Promise<void> {
    await db
      .delete(favoriteLocations)
      .where(
        and(
          eq(favoriteLocations.userId, userId),
          eq(favoriteLocations.locationId, locationId)
        )
      );
  }

  async isFavoritedLocation(
    userId: string,
    locationId: string
  ): Promise<boolean> {
    const result = await db.query.favoriteLocations.findFirst({
      where: and(
        eq(favoriteLocations.userId, userId),
        eq(favoriteLocations.locationId, locationId)
      ),
    });

    return !!result;
  }

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

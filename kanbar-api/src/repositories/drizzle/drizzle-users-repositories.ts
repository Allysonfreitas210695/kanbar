import { eq } from "drizzle-orm";
import { db } from "../../db/connection.ts";
import type { NewUser, User } from "../../db/schema/users.ts";
import { users } from "../../db/schema/users.ts";
import type { UserFavorites, UsersRepository } from "../users-repositories.ts";
import { drinks } from "../../db/schema/drinks.ts";
import { games } from "../../db/schema/games.ts";
import { locations } from "../../db/schema/locations.ts";
import { favoriteDrinks } from "../../db/schema/favoriteDrinks.ts";
import { favoriteGames } from "../../db/schema/favoriteGames.ts";
import { favoriteLocations } from "../../db/schema/favoriteLocations.ts";

export class DrizzleUsersRepositories implements UsersRepository {
  async findFavoritesByUserId(userId: string): Promise<UserFavorites> {
    const drinksFavorited = await db
      .select()
      .from(favoriteDrinks)
      .innerJoin(drinks, eq(favoriteDrinks.drinkId, drinks.id))
      .where(eq(favoriteDrinks.userId, userId));

    const gamesFavorited = await db
      .select()
      .from(favoriteGames)
      .innerJoin(games, eq(favoriteGames.gameId, games.id))
      .where(eq(favoriteGames.userId, userId));

    const locationsFavorited = await db
      .select()
      .from(favoriteLocations)
      .innerJoin(locations, eq(favoriteLocations.locationId, locations.id))
      .where(eq(favoriteLocations.userId, userId));

    return {
      drinks: drinksFavorited.map(({ drinks }) => drinks),
      games: gamesFavorited.map(({ games }) => games),
      locations: locationsFavorited.map(({ locations }) => locations),
    };
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await db.query.users.findFirst({
      where: eq(users.email, email),
    });
    return user ?? null;
  }

  async findById(id: string): Promise<User | null> {
    const user = await db.query.users.findFirst({
      where: eq(users.id, id),
    });
    return user ?? null;
  }

  async save(user: NewUser): Promise<User> {
    const [createdUser] = await db.insert(users).values(user).returning();
    return createdUser;
  }

  async delete(id: string): Promise<void> {
    await db.delete(users).where(eq(users.id, id));
  }

  async update(user: Partial<NewUser> & { id: string }): Promise<void> {
    const { id, ...data } = user;
    await db.update(users).set(data).where(eq(users.id, id));
  }

  async listAll(): Promise<User[]> {
    const result = await db.select().from(users);
    return result;
  }
}

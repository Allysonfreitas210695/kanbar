import { Drink } from "../db/schema/drinks.ts";
import { Game } from "../db/schema/games.ts";
import { Location } from "../db/schema/locations.ts";
import type { NewUser, User } from "../db/schema/users.ts";

export interface UserFavorites {
  drinks: Drink[];
  games: Game[];
  locations: Location[];
}

export interface UsersRepository {
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  save(user: NewUser): Promise<User>;
  delete(id: string): Promise<void>;
  update(user: Partial<NewUser>): Promise<void>;
  listAll(): Promise<User[]>;
  findFavoritesByUserId(userId: string): Promise<UserFavorites>;
}

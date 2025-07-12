import { users } from "./users.ts";
import { drinks } from "./drinks.ts";
import { games } from "./games.ts";
import {
  favoriteDrinks,
  favoriteGames,
  favoriteLocations,
} from "./favorites.ts";
import { locations } from "./locations.ts";
import { locationDrinks } from "./locationDrinks.ts";
import { categories } from "./categories.ts";
import { gameCategories } from "./gameCategories.ts";

export const schema = {
  users,
  drinks,
  games,
  categories,
  gameCategories,
  locations,
  favoriteDrinks,
  favoriteGames,
  favoriteLocations,
  locationDrinks,
};

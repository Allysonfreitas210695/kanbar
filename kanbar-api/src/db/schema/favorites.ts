import { users } from "./users.ts";
import { drinks } from "./drinks.ts";
import { games } from "./games.ts";
import { locations } from "./locations.ts";
import { pgTable, uuid, timestamp, primaryKey } from "drizzle-orm/pg-core";

export const favoriteDrinks = pgTable(
  "favorite_drinks",
  {
    userId: uuid()
      .references(() => users.id, { onDelete: "cascade" })
      .notNull(),
    drinkId: uuid()
      .references(() => drinks.id, { onDelete: "cascade" })
      .notNull(),
    createdAt: timestamp({ mode: "date" }).defaultNow().notNull(),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.userId, t.drinkId] }),
  })
);

export const favoriteGames = pgTable(
  "favorite_games",
  {
    userId: uuid()
      .references(() => users.id, { onDelete: "cascade" })
      .notNull(),
    gameId: uuid()
      .references(() => games.id, { onDelete: "cascade" })
      .notNull(),
    createdAt: timestamp({ mode: "date" }).defaultNow().notNull(),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.userId, t.gameId] }),
  })
);

export const favoriteLocations = pgTable(
  "favorite_locations",
  {
    userId: uuid()
      .references(() => users.id, { onDelete: "cascade" })
      .notNull(),
    locationId: uuid()
      .references(() => locations.id, { onDelete: "cascade" })
      .notNull(),
    createdAt: timestamp({ mode: "date" }).defaultNow().notNull(),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.userId, t.locationId] }),
  })
);

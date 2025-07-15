import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { favoriteDrinks } from "./favoriteDrinks.ts";
import { favoriteGames } from "./favoriteGames.ts";
import { favoriteLocations } from "./favoriteLocations.ts";
import { relations } from "drizzle-orm";
import { userFavorites } from "./userFavorites.ts";

export const users = pgTable("users", {
  id: uuid().primaryKey().defaultRandom(),
  name: text().notNull(),
  email: text().notNull().unique(),
  passwordHash: text().notNull(),
  createdAt: timestamp({ mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp({ mode: "date" }).defaultNow().notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
  favoriteDrinks: many(favoriteDrinks),
  favoriteGames: many(favoriteGames),
  favoriteLocations: many(favoriteLocations),
  userFavorites: many(userFavorites),
}));

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

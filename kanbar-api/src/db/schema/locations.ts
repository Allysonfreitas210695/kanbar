import { relations } from "drizzle-orm";
import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { favoriteLocations } from "./favoriteLocations.ts";
import { userFavorites } from "./userFavorites.ts";

export const locations = pgTable("locations", {
  id: uuid().primaryKey().defaultRandom(),
  name: text().notNull(),
  address: text(),
  image: text(),
  createdAt: timestamp({ mode: "date" }).defaultNow().notNull(),
});

export const locationsRelations = relations(locations, ({ many }) => ({
  favoriteLocations: many(favoriteLocations),
  userFavorites: many(userFavorites),
}));

export type Location = typeof locations.$inferSelect;
export type NewLocation = typeof locations.$inferInsert;

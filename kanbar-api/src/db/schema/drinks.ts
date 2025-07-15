import { relations } from "drizzle-orm";
import {
  doublePrecision,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { favoriteDrinks } from "./favoriteDrinks.ts";

export const drinks = pgTable("drinks", {
  id: uuid().primaryKey().defaultRandom(),
  name: text().notNull(),
  description: text(),
  image: text(),
  ingredients: text(),
  difficulty: text(),
  estimatedValue: doublePrecision(),
  restrictions: text(),
  createdAt: timestamp({ mode: "date" }).defaultNow().notNull(),
});

export const drinksRelations = relations(drinks, ({ many }) => ({
  favoriteDrinks: many(favoriteDrinks),
}));

export type Drink = typeof drinks.$inferSelect;
export type NewDrink = typeof drinks.$inferInsert;

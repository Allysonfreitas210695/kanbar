import { pgTable, primaryKey, timestamp, uuid } from "drizzle-orm/pg-core";
import { users } from "./users.ts";
import { drinks } from "./drinks.ts";
import { relations } from "drizzle-orm";

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

export const favoriteDrinksRelations = relations(favoriteDrinks, ({ one }) => ({
  user: one(users, {
    fields: [favoriteDrinks.userId],
    references: [users.id],
  }),
  drink: one(drinks, {
    fields: [favoriteDrinks.drinkId],
    references: [drinks.id],
  }),
}));

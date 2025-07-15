import { pgTable, uuid, timestamp, primaryKey } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { locations } from "./locations.ts";
import { users } from "./users.ts";

export const userFavorites = pgTable(
  "user_favorites",
  {
    userId: uuid()
      .references(() => users.id, { onDelete: "cascade" })
      .notNull(),
    locationId: uuid()
      .references(() => locations.id, { onDelete: "cascade" })
      .notNull(),
    createdAt: timestamp({ mode: "date" }).defaultNow().notNull(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.userId, table.locationId] }),
  })
);

export const userFavoritesRelations = relations(userFavorites, ({ one }) => ({
  user: one(users, {
    fields: [userFavorites.userId],
    references: [users.id],
  }),
  location: one(locations, {
    fields: [userFavorites.locationId],
    references: [locations.id],
  }),
}));

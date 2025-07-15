import { pgTable, uuid, timestamp, primaryKey } from "drizzle-orm/pg-core";
import { users } from "./users.ts";
import { locations } from "./locations.ts";
import { relations } from "drizzle-orm";

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

export const favoriteLocationsRelations = relations(
  favoriteLocations,
  ({ one }) => ({
    user: one(users, {
      fields: [favoriteLocations.userId],
      references: [users.id],
    }),
    location: one(locations, {
      fields: [favoriteLocations.locationId],
      references: [locations.id],
    }),
  })
);

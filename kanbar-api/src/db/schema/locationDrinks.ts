import { drinks } from "./drinks.ts";
import { pgTable, uuid, timestamp, primaryKey } from "drizzle-orm/pg-core";
import { locations } from "./locations.ts";

export const locationDrinks = pgTable(
  "location_drinks",
  {
    locationId: uuid()
      .references(() => locations.id, { onDelete: "cascade" })
      .notNull(),
    drinkId: uuid()
      .references(() => drinks.id, { onDelete: "cascade" })
      .notNull(),
    createdAt: timestamp({ mode: "date" }).defaultNow().notNull(),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.locationId, t.drinkId] }),
  })
);

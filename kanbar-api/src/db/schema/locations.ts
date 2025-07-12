import { pgTable, text, uuid, timestamp } from "drizzle-orm/pg-core";

export const locations = pgTable("locations", {
  id: uuid().primaryKey().defaultRandom(),
  name: text().notNull(),
  address: text(),
  image: text(),
  createdAt: timestamp().defaultNow().notNull(),
});

import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const games = pgTable("games", {
  id: uuid().primaryKey().defaultRandom(),
  name: text().notNull(),
  description: text(),
  image: text(),
  createdAt: timestamp().defaultNow().notNull(),
});

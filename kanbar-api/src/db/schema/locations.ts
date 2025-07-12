import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";

export const locations = pgTable("locations", {
  id: uuid().primaryKey().defaultRandom(),
  name: text().notNull(),
  address: text(),
  image: text(),
  createdAt: timestamp({ mode: "date" }).defaultNow().notNull(),
});

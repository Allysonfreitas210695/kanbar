import { pgTable, text, uuid, timestamp } from "drizzle-orm/pg-core";

export const categories = pgTable("categories", {
  id: uuid().primaryKey().defaultRandom(),
  name: text().notNull(),
  createdAt: timestamp({ mode: "date" }).defaultNow().notNull(),
});

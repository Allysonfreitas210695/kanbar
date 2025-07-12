import {
  pgTable,
  uuid,
  text,
  timestamp,
  doublePrecision,
} from "drizzle-orm/pg-core";

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

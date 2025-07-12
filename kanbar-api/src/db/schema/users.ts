import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid().primaryKey().defaultRandom(),
  name: text().notNull(),
  email: text().notNull().unique(),
  passwordHash: text().notNull(),
  createdAt: timestamp({ mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp({ mode: "date" }).defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;

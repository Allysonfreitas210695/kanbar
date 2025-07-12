import { pgTable, uuid, timestamp, primaryKey } from "drizzle-orm/pg-core";
import { games } from "./games.ts";
import { categories } from "./categories.ts";

export const gameCategories = pgTable(
  "game_categories",
  {
    gameId: uuid("game_id")
      .references(() => games.id, { onDelete: "cascade" })
      .notNull(),
    categoryId: uuid("category_id")
      .references(() => categories.id, { onDelete: "cascade" })
      .notNull(),
    createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.gameId, t.categoryId] }),
  })
);

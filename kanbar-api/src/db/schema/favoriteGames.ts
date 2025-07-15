import { pgTable, uuid, timestamp, primaryKey } from "drizzle-orm/pg-core";
import { users } from "./users.ts";
import { games } from "./games.ts";
import { relations } from "drizzle-orm";

export const favoriteGames = pgTable(
  "favorite_games",
  {
    userId: uuid()
      .references(() => users.id, { onDelete: "cascade" })
      .notNull(),
    gameId: uuid()
      .references(() => games.id, { onDelete: "cascade" })
      .notNull(),
    createdAt: timestamp({ mode: "date" }).defaultNow().notNull(),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.userId, t.gameId] }),
  })
);

export const favoriteGamesRelations = relations(favoriteGames, ({ one }) => ({
  user: one(users, {
    fields: [favoriteGames.userId],
    references: [users.id],
  }),
  game: one(games, {
    fields: [favoriteGames.gameId],
    references: [games.id],
  }),
}));

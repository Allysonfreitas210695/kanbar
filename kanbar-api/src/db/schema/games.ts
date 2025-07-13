import { boolean, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

export const games = pgTable('games', {
  id: uuid().primaryKey().defaultRandom(),
  name: text().notNull(),
  description: text(),
  image: text().notNull(),
  isActive: boolean().default(true).notNull(),
  createdAt: timestamp({ mode: 'date' }).defaultNow().notNull(),
  updatedAt: timestamp({ mode: 'date' }).defaultNow().notNull(),
})

export type Game = typeof games.$inferSelect
export type NewGame = typeof games.$inferInsert

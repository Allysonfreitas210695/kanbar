import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

export const locations = pgTable('locations', {
  id: uuid().primaryKey().defaultRandom(),
  name: text().notNull(),
  address: text(),
  image: text(),
  createdAt: timestamp({ mode: 'date' }).defaultNow().notNull(),
})

export type Locations = typeof locations.$inferSelect
export type NewLocations = typeof locations.$inferInsert

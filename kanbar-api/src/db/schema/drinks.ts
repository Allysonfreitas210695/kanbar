import {
  doublePrecision,
  pgTable,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core'

export const drinks = pgTable('drinks', {
  id: uuid().primaryKey().defaultRandom(),
  name: text().notNull(),
  description: text(),
  image: text(),
  ingredients: text(),
  difficulty: text(),
  estimatedValue: doublePrecision(),
  restrictions: text(),
  createdAt: timestamp({ mode: 'date' }).defaultNow().notNull(),
})

export type Drink = typeof drinks.$inferSelect
export type NewDrink = typeof drinks.$inferInsert

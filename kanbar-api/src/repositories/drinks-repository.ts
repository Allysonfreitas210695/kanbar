import type { Drink } from '../db/schema/drinks.ts'

export interface DrinksRepository {
  findAll(): Promise<Drink[]>
  findById(id: string): Promise<Drink | null>
}

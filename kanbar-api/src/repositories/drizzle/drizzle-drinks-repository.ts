import { eq } from 'drizzle-orm'
import { db } from '../../db/connection.ts'
import type { Drink } from '../../db/schema/drinks.ts'
import { drinks } from '../../db/schema/drinks.ts'
import type { DrinksRepository } from '../drinks-repository.ts'

export class DrizzleDrinksRepository implements DrinksRepository {
  async findAll(): Promise<Drink[]> {
    return await db.select().from(drinks)
  }

  async findById(id: string): Promise<Drink | null> {
    const result = await db
      .select()
      .from(drinks)
      .where(eq(drinks.id, id))
      .limit(1)

    return result[0] ?? null
  }
}

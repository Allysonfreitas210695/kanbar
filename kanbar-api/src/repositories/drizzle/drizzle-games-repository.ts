import { eq } from 'drizzle-orm'
import { db } from '../../db/connection.ts'
import type { Game } from '../../db/schema/games.ts'
import { games } from '../../db/schema/games.ts'
import type { GamesRepository } from '../games-repositories.ts'

export class DrizzleGamesRepository implements GamesRepository {
  async findActive(): Promise<Game[]> {
    const activeGames = await db.query.games.findMany({
      where: eq(games.isActive, true),
    })

    return activeGames
  }

  async findById(id: string): Promise<Game | null> {
    const game = await db.query.games.findFirst({
      where: eq(games.id, id),
    })

    return game ?? null
  }
}

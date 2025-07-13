import type { Game } from '../db/schema/games.ts'

export interface GamesRepository {
  findActive(): Promise<Game[]>
  findById(id: string): Promise<Game | null>
}

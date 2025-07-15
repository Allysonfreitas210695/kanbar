import type { Game } from "../db/schema/games.ts";

export interface GamesRepository {
  findActive(): Promise<Game[]>;
  findById(id: string): Promise<Game | null>;
  addFavoriteGame(userId: string, gameId: string): Promise<void>;
  removeFavoriteGame(userId: string, gameId: string): Promise<void>;
  isGameFavorited(userId: string, gameId: string): Promise<boolean>;
}

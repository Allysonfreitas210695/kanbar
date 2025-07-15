import type { Game, NewGame } from "../db/schema/games.ts";

export interface GamesRepository {
  findActive(): Promise<Game[]>;
  findById(id: string): Promise<Game | null>;
  create(data: NewGame): Promise<Game>;
  update(id: string, data: Partial<NewGame>): Promise<Game>;
  delete(id: string): Promise<void>;
  addFavoriteGame(userId: string, gameId: string): Promise<void>;
  removeFavoriteGame(userId: string, gameId: string): Promise<void>;
  isGameFavorited(userId: string, gameId: string): Promise<boolean>;
}

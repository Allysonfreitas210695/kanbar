import { and, eq } from "drizzle-orm";
import { db } from "../../db/connection.ts";
import type { Game, NewGame } from "../../db/schema/games.ts";
import { games } from "../../db/schema/games.ts";
import type { GamesRepository } from "../games-repositories.ts";
import { favoriteGames } from "../../db/schema/favoriteGames.ts";

export class DrizzleGamesRepository implements GamesRepository {
  async create(data: NewGame): Promise<Game> {
    const [game] = await db.insert(games).values(data).returning();
    return game;
  }

  async update(id: string, data: Partial<NewGame>): Promise<Game> {
    const [updated] = await db
      .update(games)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(games.id, id))
      .returning();
    return updated;
  }

  async delete(id: string): Promise<void> {
    await db.delete(games).where(eq(games.id, id));
  }

  async addFavoriteGame(userId: string, gameId: string): Promise<void> {
    await db.insert(favoriteGames).values({ userId, gameId });
  }

  async removeFavoriteGame(userId: string, gameId: string): Promise<void> {
    await db
      .delete(favoriteGames)
      .where(
        and(eq(favoriteGames.userId, userId), eq(favoriteGames.gameId, gameId))
      );
  }

  async isGameFavorited(userId: string, gameId: string): Promise<boolean> {
    const result = await db.query.favoriteGames.findFirst({
      where: and(
        eq(favoriteGames.userId, userId),
        eq(favoriteGames.gameId, gameId)
      ),
    });
    return !!result;
  }

  async findActive(): Promise<Game[]> {
    const activeGames = await db.query.games.findMany({
      where: eq(games.isActive, true),
    });

    return activeGames;
  }

  async findById(id: string): Promise<Game | null> {
    const game = await db.query.games.findFirst({
      where: eq(games.id, id),
    });

    return game ?? null;
  }
}

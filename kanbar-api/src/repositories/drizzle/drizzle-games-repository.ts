import { and, eq } from "drizzle-orm";
import { db } from "../../db/connection.ts";
import type { Game } from "../../db/schema/games.ts";
import { games } from "../../db/schema/games.ts";
import type { GamesRepository } from "../games-repositories.ts";
import { favoriteGames } from "../../db/schema/favoriteGames.ts";

export class DrizzleGamesRepository implements GamesRepository {
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

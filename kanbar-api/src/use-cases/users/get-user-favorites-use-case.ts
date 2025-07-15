import { DrizzleUsersRepositories } from "../../repositories/drizzle/drizzle-users-repositories.ts";
import { UserFavorites } from "../../repositories/users-repositories.ts";

export class GetUserFavoritesUseCase {
  constructor(private userRepository: DrizzleUsersRepositories) {}

  async execute(userId: string): Promise<UserFavorites> {
    const favorites = await this.userRepository.findFavoritesByUserId(userId);
    return favorites;
  }
}

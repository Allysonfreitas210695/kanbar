import type { FastifyInstance } from "fastify";

import { authRoutes } from "./auth.ts";
import { userCreateRoutes } from "./user-create.ts";
import { getAllDrinksRoute } from "./drinks-all.ts";
import { getDrinkByIdRoute } from "./drinks-by-id.ts";
import { gamesRoutes } from "./games-all.ts";
import { userRoutes } from "./user.ts";
import { favoriteDrinkRoute } from "./drinks-favorite.ts";
import { gamesFavoriteRoutes } from "./games-favorite.ts";

export function registerRoutes(app: FastifyInstance) {
  app.register(
    async (apiApp) => {
      apiApp.addHook("preValidation", apiApp.authenticate);

      apiApp.register(userRoutes);
      apiApp.register(getAllDrinksRoute);
      apiApp.register(favoriteDrinkRoute);
      apiApp.register(getDrinkByIdRoute);

      apiApp.register(gamesRoutes);
      apiApp.register(gamesFavoriteRoutes);
    },
    { prefix: "/api" }
  );

  app.register(authRoutes, { prefix: "/api/auth" });
  app.register(userCreateRoutes, { prefix: "/api/users" });
}

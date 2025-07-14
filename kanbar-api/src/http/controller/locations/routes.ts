import { FastifyInstance } from "fastify";
import { getAllLocationsRoute } from "./locations-all.ts";

export function locationsRoutes(app: FastifyInstance) {
  app.register(
    (subApp) => {
      getAllLocationsRoute(subApp);
    },
    { prefix: "/api" }
  );
}

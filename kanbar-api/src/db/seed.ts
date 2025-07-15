import { reset, seed } from "drizzle-seed";
import { db, sql } from "./connection.ts";
import { schema } from "./schema/index.ts";

const seedSchema = {
  users: schema.users,
  categories: schema.categories,
  drinks: schema.drinks,
  games: schema.games,
  locations: schema.locations,
};

await reset(db, seedSchema);

await seed(db, seedSchema).refine((f) => {
  return {
    users: { count: 10 },
    categories: { count: 10 },
    drinks: { count: 10 },
    games: { count: 10 },
    locations: { count: 10 },
  };
});

await sql.end();

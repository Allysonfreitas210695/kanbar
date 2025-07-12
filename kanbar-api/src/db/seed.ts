import { reset, seed } from "drizzle-seed";
import { db, sql } from "./connection.ts";
import { schema } from "./schema/index.ts";

await reset(db, schema);

await seed(db, schema).refine((f) => {
  return {
    users: {
      count: 5,
    },
    drinks: {
      count: 10,
    },
    games: {
      count: 8,
    },
    locations: {
      count: 6,
    },
  };
});

await sql.end();

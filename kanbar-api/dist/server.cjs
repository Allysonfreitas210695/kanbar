"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/app.ts
var import_cors = require("@fastify/cors");
var import_jwt = __toESM(require("@fastify/jwt"), 1);
var import_swagger = __toESM(require("@fastify/swagger"), 1);
var import_swagger_ui = __toESM(require("@fastify/swagger-ui"), 1);
var import_fastify = require("fastify");
var import_fastify_type_provider_zod = require("fastify-type-provider-zod");

// src/env/index.ts
var import_zod = require("zod");
var envSchema = import_zod.z.object({
  PORT: import_zod.z.coerce.number().default(3333),
  NODE_ENV: import_zod.z.enum(["development", "production", "test"]).default("development"),
  HOST: import_zod.z.string().default("0.0.0.0"),
  DATABASE_URL: import_zod.z.string().url().refine(
    (url) => url.startsWith("postgresql://") || url.startsWith("postgres://"),
    {
      message: "DATABASE_URL must start with postgresql:// or postgres://"
    }
  ),
  JWT_SECRET: import_zod.z.string().min(32, {
    message: "JWT_SECRET must be at least 32 characters long"
  }),
  JWT_EXPIRES_IN: import_zod.z.string().default("7d"),
  FRONTEND_URL: import_zod.z.string().default("*"),
  API_BASE_URL: import_zod.z.url().optional()
});
var env = envSchema.parse(process.env);

// src/error-handler.ts
var import_zod2 = require("zod");

// src/use-cases/errors/kanbar-error.ts
var AppError = class extends Error {
  statusCode;
  constructor(message, statusCode = 400) {
    super(message);
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, new.target.prototype);
  }
};

// src/error-handler.ts
var errorHandler = (error, _, reply) => {
  if (error instanceof import_zod2.ZodError) {
    console.log("kdkndj");
    return reply.status(400).send({
      message: "Error during validation",
      errors: error.message
    });
  }
  if (error instanceof AppError) {
    return reply.status(error.statusCode).send({ message: error.message });
  }
  if (env.NODE_ENV !== "production") {
    console.error(error);
  }
  return reply.status(500).send({ message: "Internal server error!" });
};

// src/http/controller/drinks/routes.ts
var import_v42 = __toESM(require("zod/v4"), 1);

// src/repositories/drizzle/drizzle-drinks-repository.ts
var import_drizzle_orm9 = require("drizzle-orm");

// src/db/connection.ts
var import_postgres_js = require("drizzle-orm/postgres-js");
var import_postgres = __toESM(require("postgres"), 1);

// src/db/schema/users.ts
var import_pg_core8 = require("drizzle-orm/pg-core");

// src/db/schema/favoriteDrinks.ts
var import_pg_core2 = require("drizzle-orm/pg-core");

// src/db/schema/drinks.ts
var import_drizzle_orm = require("drizzle-orm");
var import_pg_core = require("drizzle-orm/pg-core");
var drinks = (0, import_pg_core.pgTable)("drinks", {
  id: (0, import_pg_core.uuid)().primaryKey().defaultRandom(),
  name: (0, import_pg_core.text)().notNull(),
  description: (0, import_pg_core.text)(),
  image: (0, import_pg_core.text)(),
  ingredients: (0, import_pg_core.text)(),
  difficulty: (0, import_pg_core.text)(),
  estimatedValue: (0, import_pg_core.doublePrecision)(),
  restrictions: (0, import_pg_core.text)(),
  createdAt: (0, import_pg_core.timestamp)({ mode: "date" }).defaultNow().notNull()
});
var drinksRelations = (0, import_drizzle_orm.relations)(drinks, ({ many }) => ({
  favoriteDrinks: many(favoriteDrinks)
}));

// src/db/schema/favoriteDrinks.ts
var import_drizzle_orm2 = require("drizzle-orm");
var favoriteDrinks = (0, import_pg_core2.pgTable)(
  "favorite_drinks",
  {
    userId: (0, import_pg_core2.uuid)().references(() => users.id, { onDelete: "cascade" }).notNull(),
    drinkId: (0, import_pg_core2.uuid)().references(() => drinks.id, { onDelete: "cascade" }).notNull(),
    createdAt: (0, import_pg_core2.timestamp)({ mode: "date" }).defaultNow().notNull()
  },
  (t) => ({
    pk: (0, import_pg_core2.primaryKey)({ columns: [t.userId, t.drinkId] })
  })
);
var favoriteDrinksRelations = (0, import_drizzle_orm2.relations)(favoriteDrinks, ({ one }) => ({
  user: one(users, {
    fields: [favoriteDrinks.userId],
    references: [users.id]
  }),
  drink: one(drinks, {
    fields: [favoriteDrinks.drinkId],
    references: [drinks.id]
  })
}));

// src/db/schema/favoriteGames.ts
var import_pg_core4 = require("drizzle-orm/pg-core");

// src/db/schema/games.ts
var import_drizzle_orm3 = require("drizzle-orm");
var import_pg_core3 = require("drizzle-orm/pg-core");
var games = (0, import_pg_core3.pgTable)("games", {
  id: (0, import_pg_core3.uuid)().primaryKey().defaultRandom(),
  name: (0, import_pg_core3.text)().notNull(),
  description: (0, import_pg_core3.text)(),
  image: (0, import_pg_core3.text)().notNull(),
  isActive: (0, import_pg_core3.boolean)().default(true).notNull(),
  createdAt: (0, import_pg_core3.timestamp)({ mode: "date" }).defaultNow().notNull(),
  updatedAt: (0, import_pg_core3.timestamp)({ mode: "date" }).defaultNow().notNull()
});
var gamesRelations = (0, import_drizzle_orm3.relations)(games, ({ many }) => ({
  favoriteGames: many(favoriteGames)
}));

// src/db/schema/favoriteGames.ts
var import_drizzle_orm4 = require("drizzle-orm");
var favoriteGames = (0, import_pg_core4.pgTable)(
  "favorite_games",
  {
    userId: (0, import_pg_core4.uuid)().references(() => users.id, { onDelete: "cascade" }).notNull(),
    gameId: (0, import_pg_core4.uuid)().references(() => games.id, { onDelete: "cascade" }).notNull(),
    createdAt: (0, import_pg_core4.timestamp)({ mode: "date" }).defaultNow().notNull()
  },
  (t) => ({
    pk: (0, import_pg_core4.primaryKey)({ columns: [t.userId, t.gameId] })
  })
);
var favoriteGamesRelations = (0, import_drizzle_orm4.relations)(favoriteGames, ({ one }) => ({
  user: one(users, {
    fields: [favoriteGames.userId],
    references: [users.id]
  }),
  game: one(games, {
    fields: [favoriteGames.gameId],
    references: [games.id]
  })
}));

// src/db/schema/favoriteLocations.ts
var import_pg_core7 = require("drizzle-orm/pg-core");

// src/db/schema/locations.ts
var import_drizzle_orm6 = require("drizzle-orm");
var import_pg_core6 = require("drizzle-orm/pg-core");

// src/db/schema/userFavorites.ts
var import_pg_core5 = require("drizzle-orm/pg-core");
var import_drizzle_orm5 = require("drizzle-orm");
var userFavorites = (0, import_pg_core5.pgTable)(
  "user_favorites",
  {
    userId: (0, import_pg_core5.uuid)().references(() => users.id, { onDelete: "cascade" }).notNull(),
    locationId: (0, import_pg_core5.uuid)().references(() => locations.id, { onDelete: "cascade" }).notNull(),
    createdAt: (0, import_pg_core5.timestamp)({ mode: "date" }).defaultNow().notNull()
  },
  (table) => ({
    pk: (0, import_pg_core5.primaryKey)({ columns: [table.userId, table.locationId] })
  })
);
var userFavoritesRelations = (0, import_drizzle_orm5.relations)(userFavorites, ({ one }) => ({
  user: one(users, {
    fields: [userFavorites.userId],
    references: [users.id]
  }),
  location: one(locations, {
    fields: [userFavorites.locationId],
    references: [locations.id]
  })
}));

// src/db/schema/locations.ts
var locations = (0, import_pg_core6.pgTable)("locations", {
  id: (0, import_pg_core6.uuid)().primaryKey().defaultRandom(),
  name: (0, import_pg_core6.text)().notNull(),
  address: (0, import_pg_core6.text)(),
  image: (0, import_pg_core6.text)(),
  createdAt: (0, import_pg_core6.timestamp)({ mode: "date" }).defaultNow().notNull()
});
var locationsRelations = (0, import_drizzle_orm6.relations)(locations, ({ many }) => ({
  favoriteLocations: many(favoriteLocations),
  userFavorites: many(userFavorites)
}));

// src/db/schema/favoriteLocations.ts
var import_drizzle_orm7 = require("drizzle-orm");
var favoriteLocations = (0, import_pg_core7.pgTable)(
  "favorite_locations",
  {
    userId: (0, import_pg_core7.uuid)().references(() => users.id, { onDelete: "cascade" }).notNull(),
    locationId: (0, import_pg_core7.uuid)().references(() => locations.id, { onDelete: "cascade" }).notNull(),
    createdAt: (0, import_pg_core7.timestamp)({ mode: "date" }).defaultNow().notNull()
  },
  (t) => ({
    pk: (0, import_pg_core7.primaryKey)({ columns: [t.userId, t.locationId] })
  })
);
var favoriteLocationsRelations = (0, import_drizzle_orm7.relations)(
  favoriteLocations,
  ({ one }) => ({
    user: one(users, {
      fields: [favoriteLocations.userId],
      references: [users.id]
    }),
    location: one(locations, {
      fields: [favoriteLocations.locationId],
      references: [locations.id]
    })
  })
);

// src/db/schema/users.ts
var import_drizzle_orm8 = require("drizzle-orm");
var users = (0, import_pg_core8.pgTable)("users", {
  id: (0, import_pg_core8.uuid)().primaryKey().defaultRandom(),
  name: (0, import_pg_core8.text)().notNull(),
  email: (0, import_pg_core8.text)().notNull().unique(),
  passwordHash: (0, import_pg_core8.text)().notNull(),
  createdAt: (0, import_pg_core8.timestamp)({ mode: "date" }).defaultNow().notNull(),
  updatedAt: (0, import_pg_core8.timestamp)({ mode: "date" }).defaultNow().notNull()
});
var usersRelations = (0, import_drizzle_orm8.relations)(users, ({ many }) => ({
  favoriteDrinks: many(favoriteDrinks),
  favoriteGames: many(favoriteGames),
  favoriteLocations: many(favoriteLocations),
  userFavorites: many(userFavorites)
}));

// src/db/schema/locationDrinks.ts
var import_pg_core9 = require("drizzle-orm/pg-core");
var locationDrinks = (0, import_pg_core9.pgTable)(
  "location_drinks",
  {
    locationId: (0, import_pg_core9.uuid)().references(() => locations.id, { onDelete: "cascade" }).notNull(),
    drinkId: (0, import_pg_core9.uuid)().references(() => drinks.id, { onDelete: "cascade" }).notNull(),
    createdAt: (0, import_pg_core9.timestamp)({ mode: "date" }).defaultNow().notNull()
  },
  (t) => ({
    pk: (0, import_pg_core9.primaryKey)({ columns: [t.locationId, t.drinkId] })
  })
);

// src/db/schema/categories.ts
var import_pg_core10 = require("drizzle-orm/pg-core");
var categories = (0, import_pg_core10.pgTable)("categories", {
  id: (0, import_pg_core10.uuid)().primaryKey().defaultRandom(),
  name: (0, import_pg_core10.text)().notNull(),
  createdAt: (0, import_pg_core10.timestamp)({ mode: "date" }).defaultNow().notNull()
});

// src/db/schema/gameCategories.ts
var import_pg_core11 = require("drizzle-orm/pg-core");
var gameCategories = (0, import_pg_core11.pgTable)(
  "game_categories",
  {
    gameId: (0, import_pg_core11.uuid)("game_id").references(() => games.id, { onDelete: "cascade" }).notNull(),
    categoryId: (0, import_pg_core11.uuid)("category_id").references(() => categories.id, { onDelete: "cascade" }).notNull(),
    createdAt: (0, import_pg_core11.timestamp)("created_at", { mode: "date" }).defaultNow().notNull()
  },
  (t) => ({
    pk: (0, import_pg_core11.primaryKey)({ columns: [t.gameId, t.categoryId] })
  })
);

// src/db/schema/index.ts
var schema = {
  users,
  drinks,
  games,
  categories,
  gameCategories,
  locations,
  favoriteDrinks,
  favoriteGames,
  favoriteLocations,
  locationDrinks,
  userFavorites
};

// src/db/connection.ts
var sql = (0, import_postgres.default)(env.DATABASE_URL);
var db = (0, import_postgres_js.drizzle)(sql, {
  schema,
  casing: "snake_case"
});

// src/repositories/drizzle/drizzle-drinks-repository.ts
var DrizzleDrinksRepository = class {
  async create(data) {
    const [drink] = await db.insert(drinks).values(data).returning();
    return drink;
  }
  async delete(id) {
    await db.delete(drinks).where((0, import_drizzle_orm9.eq)(drinks.id, id));
  }
  async update(id, data) {
    const [updated] = await db.update(drinks).set(data).where((0, import_drizzle_orm9.eq)(drinks.id, id)).returning();
    return updated;
  }
  async findAll() {
    return await db.select().from(drinks);
  }
  async findById(id) {
    const result = await db.select().from(drinks).where((0, import_drizzle_orm9.eq)(drinks.id, id)).limit(1);
    return result[0] ?? null;
  }
  async favoriteDrink({
    userId,
    drinkId
  }) {
    await db.insert(favoriteDrinks).values({ userId, drinkId }).onConflictDoNothing();
  }
  async unfavoriteDrink({
    userId,
    drinkId
  }) {
    await db.delete(favoriteDrinks).where(
      (0, import_drizzle_orm9.and)(
        (0, import_drizzle_orm9.eq)(favoriteDrinks.userId, userId),
        (0, import_drizzle_orm9.eq)(favoriteDrinks.drinkId, drinkId)
      )
    );
  }
};

// src/use-cases/drinks/get-all-drinks-use-case.ts
var GetAllDrinksUseCase = class {
  constructor(drinksRepository) {
    this.drinksRepository = drinksRepository;
  }
  async execute() {
    return await this.drinksRepository.findAll();
  }
};

// src/http/controller/drinks/drinks-all.ts
async function getAllDrinks(app2, reply) {
  const repository = new DrizzleDrinksRepository();
  const getAllDrinksUseCase = new GetAllDrinksUseCase(repository);
  const drinks2 = await getAllDrinksUseCase.execute();
  return reply.status(200).send({
    drinks: drinks2.map((drink) => ({
      id: drink.id,
      name: drink.name,
      description: drink.description,
      imageUrl: drink.image
    }))
  });
}

// src/use-cases/drinks/get-drink-by-id-use-case.ts
var GetDrinkByIdUseCase = class {
  constructor(drinksRepository) {
    this.drinksRepository = drinksRepository;
  }
  async execute(id) {
    return await this.drinksRepository.findById(id);
  }
};

// src/http/controller/drinks/drinks-by-id.ts
async function getDrinkById(request, reply) {
  const { id } = request.params;
  const repository = new DrizzleDrinksRepository();
  const getDrinkByIdUseCase = new GetDrinkByIdUseCase(repository);
  const drink = await getDrinkByIdUseCase.execute(id);
  if (!drink) {
    return reply.status(404).send({ message: "Drink not found" });
  }
  return reply.send({
    drink: {
      id: drink.id,
      name: drink.name,
      description: drink.description,
      imageUrl: drink.image
    }
  });
}

// src/http/controller/drinks/drinks-favorite.ts
var import_zod3 = require("zod");

// src/use-cases/errors/drink-not-found-error.ts
var DrinkNotFoundError = class extends AppError {
  constructor() {
    super("Drink n\xE3o encontrado!", 404);
  }
};

// src/use-cases/drinks/toggle-favorite-drink-use-case.ts
var ToggleFavoriteDrinkUseCase = class {
  constructor(drinksRepository) {
    this.drinksRepository = drinksRepository;
  }
  async execute({
    userId,
    drinkId,
    favorite
  }) {
    const drink = await this.drinksRepository.findById(drinkId);
    if (!drink) {
      throw new DrinkNotFoundError();
    }
    if (favorite) {
      await this.drinksRepository.favoriteDrink({ userId, drinkId });
    } else {
      await this.drinksRepository.unfavoriteDrink({ userId, drinkId });
    }
  }
};

// src/http/controller/drinks/drinks-favorite.ts
var bodyFavoriteSchema = import_zod3.z.object({
  drinkId: import_zod3.z.uuid(),
  favorite: import_zod3.z.boolean()
});
async function favoriteDrink(request, reply) {
  const { drinkId, favorite } = bodyFavoriteSchema.parse(request.body);
  const { sub: userId } = request.user;
  const drinksRepository = new DrizzleDrinksRepository();
  const useCase = new ToggleFavoriteDrinkUseCase(drinksRepository);
  await useCase.execute({ userId, drinkId, favorite });
  return reply.status(204).send();
}

// src/middlewares/verify-jwt.ts
async function verifyJwt(request, reply) {
  try {
    await request.jwtVerify();
  } catch (_) {
    return reply.status(401).send({ message: "Unauthorized." });
  }
}

// src/http/controller/drinks/register.ts
var import_zod4 = require("zod");

// src/use-cases/drinks/register-use-case.ts
var RegisterDrinkUseCase = class {
  constructor(drinkRepository) {
    this.drinkRepository = drinkRepository;
  }
  async execute({
    data
  }) {
    const drink = await this.drinkRepository.create(data);
    return { drink };
  }
};

// src/http/controller/drinks/register.ts
var bodyRegisterSchema = import_zod4.z.object({
  name: import_zod4.z.string(),
  description: import_zod4.z.string().optional(),
  image: import_zod4.z.url().optional(),
  ingredients: import_zod4.z.string().optional(),
  difficulty: import_zod4.z.string().optional(),
  estimatedValue: import_zod4.z.number().optional(),
  restrictions: import_zod4.z.string().optional()
});
async function registerDrink(request, reply) {
  const body = bodyRegisterSchema.parse(request.body);
  const drinksRepository = new DrizzleDrinksRepository();
  const useCase = new RegisterDrinkUseCase(drinksRepository);
  const result = await useCase.execute({ data: body });
  return reply.status(201).send(result);
}

// src/http/controller/drinks/drink-remove.ts
var import_zod5 = require("zod");

// src/use-cases/drinks/remove-drink-use-case.ts
var RemoveDrinkUseCase = class {
  constructor(drinkRepository) {
    this.drinkRepository = drinkRepository;
  }
  async execute({ id }) {
    await this.drinkRepository.delete(id);
  }
};

// src/http/controller/drinks/drink-remove.ts
var paramsRemoveDrinkSchema = import_zod5.z.object({
  id: import_zod5.z.uuid()
});
async function removeDrink(request, reply) {
  const { id } = paramsRemoveDrinkSchema.parse(request.params);
  const repository = new DrizzleDrinksRepository();
  const useCase = new RemoveDrinkUseCase(repository);
  await useCase.execute({ id });
  return reply.status(204).send();
}

// src/use-cases/drinks/update-drink-use-case.ts
var UpdateDrinkUseCase = class {
  constructor(drinkRepository) {
    this.drinkRepository = drinkRepository;
  }
  async execute({
    id,
    data
  }) {
    const drink = await this.drinkRepository.update(id, data);
    return { drink };
  }
};

// src/http/controller/drinks/update.ts
var import_v4 = __toESM(require("zod/v4"), 1);
var updateDrinkParamsSchema = import_v4.default.object({
  id: import_v4.default.uuid()
});
var updateDrinkBodySchema = import_v4.default.object({
  name: import_v4.default.string().optional(),
  description: import_v4.default.string().optional(),
  image: import_v4.default.string().optional(),
  ingredients: import_v4.default.string().optional(),
  difficulty: import_v4.default.string().optional(),
  estimatedValue: import_v4.default.number().optional(),
  restrictions: import_v4.default.string().optional()
});
async function updateDrink(request, reply) {
  const { id } = updateDrinkParamsSchema.parse(request.params);
  const data = updateDrinkBodySchema.parse(request.body);
  const repository = new DrizzleDrinksRepository();
  const useCase = new UpdateDrinkUseCase(repository);
  const { drink } = await useCase.execute({ id, data });
  return reply.status(200).send(drink);
}

// src/http/controller/drinks/routes.ts
function drinksRoutes(app2) {
  app2.get(
    "/drinks",
    {
      schema: {
        tags: ["Drinks"],
        summary: "Lista todos os drinks",
        response: {
          200: import_v42.default.object({
            drinks: import_v42.default.array(
              import_v42.default.object({
                id: import_v42.default.string(),
                name: import_v42.default.string(),
                description: import_v42.default.string().nullable(),
                imageUrl: import_v42.default.string().nullable()
              })
            )
          })
        }
      }
    },
    getAllDrinks
  );
  app2.get(
    "/drinks/:id",
    {
      schema: {
        tags: ["Drinks"],
        summary: "Busca um drink pelo ID",
        params: import_v42.default.object({
          id: import_v42.default.string()
        }),
        response: {
          200: import_v42.default.object({
            drink: import_v42.default.object({
              id: import_v42.default.string(),
              name: import_v42.default.string(),
              description: import_v42.default.string(),
              imageUrl: import_v42.default.string()
            })
          }),
          404: import_v42.default.object({
            message: import_v42.default.string()
          })
        }
      }
    },
    getDrinkById
  );
  app2.post(
    "/drinks",
    {
      preValidation: [verifyJwt],
      schema: {
        tags: ["Drinks"],
        summary: "Cria um novo drink",
        body: bodyRegisterSchema,
        response: {
          201: import_v42.default.object({
            id: import_v42.default.uuid(),
            name: import_v42.default.string(),
            description: import_v42.default.string().nullable(),
            image: import_v42.default.string().nullable(),
            ingredients: import_v42.default.string().nullable(),
            difficulty: import_v42.default.string().nullable(),
            estimatedValue: import_v42.default.number().nullable(),
            restrictions: import_v42.default.string().nullable(),
            createdAt: import_v42.default.coerce.date()
          })
        }
      }
    },
    registerDrink
  );
  app2.post(
    "/drinks/favorite",
    {
      preValidation: [verifyJwt],
      schema: {
        tags: ["Drinks"],
        summary: "Adicionar ou remover favorite drink",
        body: bodyFavoriteSchema,
        response: {
          204: import_v42.default.null(),
          404: import_v42.default.object({ error: import_v42.default.string() }),
          400: import_v42.default.object({ error: import_v42.default.string() })
        }
      }
    },
    favoriteDrink
  );
  app2.put(
    "/drinks/:id",
    {
      preValidation: [verifyJwt],
      schema: {
        params: updateDrinkParamsSchema,
        body: updateDrinkBodySchema,
        response: {
          200: import_v42.default.object({
            id: import_v42.default.uuid(),
            name: import_v42.default.string(),
            description: import_v42.default.string().nullable(),
            image: import_v42.default.string().nullable(),
            ingredients: import_v42.default.string().nullable(),
            difficulty: import_v42.default.string().nullable(),
            estimatedValue: import_v42.default.number().nullable(),
            restrictions: import_v42.default.string().nullable(),
            createdAt: import_v42.default.coerce.date()
          })
        },
        tags: ["Drinks"],
        summary: "Atualiza um drink por ID"
      }
    },
    updateDrink
  );
  app2.delete(
    "/drinks/:id",
    {
      preValidation: [verifyJwt],
      schema: {
        params: import_v42.default.object({
          id: import_v42.default.uuid()
        }),
        response: {
          204: import_v42.default.null()
        },
        tags: ["Drinks"],
        summary: "Remove um drink por ID"
      }
    },
    removeDrink
  );
}

// src/http/controller/games/routes.ts
var import_v46 = __toESM(require("zod/v4"), 1);

// src/repositories/drizzle/drizzle-games-repository.ts
var import_drizzle_orm10 = require("drizzle-orm");
var DrizzleGamesRepository = class {
  async create(data) {
    const [game] = await db.insert(games).values(data).returning();
    return game;
  }
  async update(id, data) {
    const [updated] = await db.update(games).set({ ...data, updatedAt: /* @__PURE__ */ new Date() }).where((0, import_drizzle_orm10.eq)(games.id, id)).returning();
    return updated;
  }
  async delete(id) {
    await db.delete(games).where((0, import_drizzle_orm10.eq)(games.id, id));
  }
  async addFavoriteGame(userId, gameId) {
    await db.insert(favoriteGames).values({ userId, gameId });
  }
  async removeFavoriteGame(userId, gameId) {
    await db.delete(favoriteGames).where(
      (0, import_drizzle_orm10.and)((0, import_drizzle_orm10.eq)(favoriteGames.userId, userId), (0, import_drizzle_orm10.eq)(favoriteGames.gameId, gameId))
    );
  }
  async isGameFavorited(userId, gameId) {
    const result = await db.query.favoriteGames.findFirst({
      where: (0, import_drizzle_orm10.and)(
        (0, import_drizzle_orm10.eq)(favoriteGames.userId, userId),
        (0, import_drizzle_orm10.eq)(favoriteGames.gameId, gameId)
      )
    });
    return !!result;
  }
  async findActive() {
    const activeGames = await db.query.games.findMany({
      where: (0, import_drizzle_orm10.eq)(games.isActive, true)
    });
    return activeGames;
  }
  async findById(id) {
    const game = await db.query.games.findFirst({
      where: (0, import_drizzle_orm10.eq)(games.id, id)
    });
    return game ?? null;
  }
};

// src/use-cases/games/list-active-games-use-case.ts
var ListActiveGamesUseCase = class {
  constructor(gamesRepository) {
    this.gamesRepository = gamesRepository;
  }
  async execute() {
    return await this.gamesRepository.findActive();
  }
};

// src/http/controller/games/games-by-active.ts
async function gamesByActive(request, reply) {
  const repository = new DrizzleGamesRepository();
  const useCase = new ListActiveGamesUseCase(repository);
  const games2 = await useCase.execute();
  return reply.status(200).send({ games: games2 });
}

// src/http/controller/games/games-favorite.ts
var import_v43 = require("zod/v4");

// src/use-cases/games/toggle-favorite-game-use-case.ts
var ToggleFavoriteGameUseCase = class {
  constructor(repository) {
    this.repository = repository;
  }
  async execute({
    userId,
    gameId,
    isFavorite
  }) {
    const alreadyFavorited = await this.repository.isGameFavorited(
      userId,
      gameId
    );
    if (isFavorite && !alreadyFavorited) {
      await this.repository.addFavoriteGame(userId, gameId);
    } else if (!isFavorite && alreadyFavorited) {
      await this.repository.removeFavoriteGame(userId, gameId);
    }
  }
};

// src/http/controller/games/games-favorite.ts
var favoriteGameBodySchema = import_v43.z.object({
  gameId: import_v43.z.uuid(),
  isFavorite: import_v43.z.boolean()
});
async function gamesFavorite(request, reply) {
  const { gameId, isFavorite } = favoriteGameBodySchema.parse(request.body);
  const { sub: userId } = request.user;
  const useCase = new ToggleFavoriteGameUseCase(new DrizzleGamesRepository());
  await useCase.execute({ userId, gameId, isFavorite });
  return reply.status(204).send();
}

// src/http/controller/games/register.ts
var import_v44 = __toESM(require("zod/v4"), 1);

// src/use-cases/games/register-game-use-case.ts
var CreateGameUseCase = class {
  constructor(gameRepository) {
    this.gameRepository = gameRepository;
  }
  async execute({
    data
  }) {
    const game = await this.gameRepository.create(data);
    return { game };
  }
};

// src/http/controller/games/register.ts
var gameCreateBodySchema = import_v44.default.object({
  name: import_v44.default.string(),
  description: import_v44.default.string().optional(),
  image: import_v44.default.url(),
  isActive: import_v44.default.boolean().optional()
});
async function createGame(request, reply) {
  const body = gameCreateBodySchema.parse(request.body);
  const repository = new DrizzleGamesRepository();
  const useCase = new CreateGameUseCase(repository);
  const { game } = await useCase.execute({ data: body });
  return reply.status(201).send(game);
}

// src/http/controller/games/update.ts
var import_v45 = __toESM(require("zod/v4"), 1);

// src/use-cases/games/update-game-use-case.ts
var UpdateGameUseCase = class {
  constructor(gameRepository) {
    this.gameRepository = gameRepository;
  }
  async execute({
    id,
    data
  }) {
    const game = await this.gameRepository.update(id, data);
    return { game };
  }
};

// src/http/controller/games/update.ts
var gameUpdateBodySchema = import_v45.default.object({
  name: import_v45.default.string().optional(),
  description: import_v45.default.string().optional(),
  image: import_v45.default.string().optional(),
  isActive: import_v45.default.boolean().optional()
});
var gameParamsSchema = import_v45.default.object({
  id: import_v45.default.uuid()
});
async function updateGame(request, reply) {
  const { id } = gameParamsSchema.parse(request.params);
  const data = gameUpdateBodySchema.parse(request.body);
  const repository = new DrizzleGamesRepository();
  const useCase = new UpdateGameUseCase(repository);
  const { game } = await useCase.execute({ id, data });
  return reply.status(200).send(game);
}

// src/use-cases/games/remove-game-use-case.ts
var RemoveGameUseCase = class {
  constructor(gameRepository) {
    this.gameRepository = gameRepository;
  }
  async execute({ id }) {
    await this.gameRepository.delete(id);
  }
};

// src/http/controller/games/remove.ts
async function removeGame(request, reply) {
  const { id } = gameParamsSchema.parse(request.params);
  const repository = new DrizzleGamesRepository();
  const useCase = new RemoveGameUseCase(repository);
  await useCase.execute({ id });
  return reply.status(204).send();
}

// src/http/controller/games/routes.ts
function gamesRoutes(app2) {
  app2.get(
    "/games",
    {
      onRequest: [verifyJwt],
      schema: {
        tags: ["Games"],
        summary: "Lista todos os jogos ativos",
        response: {
          200: import_v46.default.object({
            games: import_v46.default.array(
              import_v46.default.object({
                id: import_v46.default.uuid(),
                name: import_v46.default.string(),
                description: import_v46.default.string().nullable(),
                image: import_v46.default.string(),
                isActive: import_v46.default.boolean()
              })
            )
          })
        }
      }
    },
    gamesByActive
  );
  app2.post(
    "/games/favorite",
    {
      onRequest: [verifyJwt],
      schema: {
        tags: ["Games"],
        summary: "Adiciona ou remove um jogo dos favoritos",
        body: import_v46.default.object({
          gameId: import_v46.default.uuid(),
          isFavorite: import_v46.default.boolean()
        }),
        response: {
          204: import_v46.default.null()
        }
      }
    },
    gamesFavorite
  );
  app2.post(
    "/games",
    {
      schema: {
        body: gameCreateBodySchema,
        response: {
          201: import_v46.default.object({
            id: import_v46.default.uuid(),
            name: import_v46.default.string(),
            description: import_v46.default.string().nullable(),
            image: import_v46.default.string(),
            isActive: import_v46.default.boolean(),
            createdAt: import_v46.default.coerce.date(),
            updatedAt: import_v46.default.coerce.date()
          })
        },
        tags: ["Games"],
        summary: "Cria um novo game"
      }
    },
    createGame
  );
  app2.put(
    "/games/:id",
    {
      schema: {
        params: gameParamsSchema,
        body: gameUpdateBodySchema,
        response: {
          200: import_v46.default.object({
            id: import_v46.default.uuid(),
            name: import_v46.default.string(),
            description: import_v46.default.string().nullable(),
            image: import_v46.default.string(),
            isActive: import_v46.default.boolean(),
            createdAt: import_v46.default.coerce.date(),
            updatedAt: import_v46.default.coerce.date()
          })
        },
        tags: ["Games"],
        summary: "Atualiza um game existente"
      }
    },
    updateGame
  );
  app2.delete(
    "/games/:id",
    {
      schema: {
        params: gameParamsSchema,
        response: {
          204: import_v46.default.null()
        },
        tags: ["Games"],
        summary: "Remove um game por ID"
      }
    },
    removeGame
  );
}

// src/http/controller/users/routes.ts
var import_v49 = __toESM(require("zod/v4"), 1);

// src/http/controller/users/authenticate.ts
var import_v47 = require("zod/v4");

// src/utils/compare-password.ts
var import_bcryptjs = __toESM(require("bcryptjs"), 1);
async function comparePassword(plainPassword, hashedPassword) {
  return await import_bcryptjs.default.compare(plainPassword, hashedPassword);
}

// src/use-cases/errors/invalid-credentials-error.ts
var InvalidCredentialsError = class extends AppError {
  constructor() {
    super("Credenciais inv\xE1lidas.", 401);
  }
};

// src/use-cases/users/authenticate-user-use-case.ts
var AuthenticateUserUseCase = class {
  usersRepository;
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }
  async execute({
    email,
    password
  }) {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new InvalidCredentialsError();
    }
    const isPasswordValid = await comparePassword(password, user.passwordHash);
    if (!isPasswordValid) {
      throw new InvalidCredentialsError();
    }
    return { user };
  }
};

// src/repositories/drizzle/drizzle-users-repositories.ts
var import_drizzle_orm11 = require("drizzle-orm");
var DrizzleUsersRepositories = class {
  async findFavoritesByUserId(userId) {
    const drinksFavorited = await db.select().from(favoriteDrinks).innerJoin(drinks, (0, import_drizzle_orm11.eq)(favoriteDrinks.drinkId, drinks.id)).where((0, import_drizzle_orm11.eq)(favoriteDrinks.userId, userId));
    const gamesFavorited = await db.select().from(favoriteGames).innerJoin(games, (0, import_drizzle_orm11.eq)(favoriteGames.gameId, games.id)).where((0, import_drizzle_orm11.eq)(favoriteGames.userId, userId));
    const locationsFavorited = await db.select().from(favoriteLocations).innerJoin(locations, (0, import_drizzle_orm11.eq)(favoriteLocations.locationId, locations.id)).where((0, import_drizzle_orm11.eq)(favoriteLocations.userId, userId));
    return {
      drinks: drinksFavorited.map(({ drinks: drinks2 }) => drinks2),
      games: gamesFavorited.map(({ games: games2 }) => games2),
      locations: locationsFavorited.map(({ locations: locations2 }) => locations2)
    };
  }
  async findByEmail(email) {
    const user = await db.query.users.findFirst({
      where: (0, import_drizzle_orm11.eq)(users.email, email)
    });
    return user ?? null;
  }
  async findById(id) {
    const user = await db.query.users.findFirst({
      where: (0, import_drizzle_orm11.eq)(users.id, id)
    });
    return user ?? null;
  }
  async save(user) {
    const [createdUser] = await db.insert(users).values(user).returning();
    return createdUser;
  }
  async delete(id) {
    await db.delete(users).where((0, import_drizzle_orm11.eq)(users.id, id));
  }
  async update(user) {
    const { id, ...data } = user;
    await db.update(users).set(data).where((0, import_drizzle_orm11.eq)(users.id, id));
  }
  async listAll() {
    const result = await db.select().from(users);
    return result;
  }
};

// src/http/controller/users/authenticate.ts
var schemaSessionBody = import_v47.z.object({
  email: import_v47.z.email(),
  password: import_v47.z.string().min(6)
});
async function authenticate(request, reply) {
  const { email, password } = schemaSessionBody.parse(request.body);
  console.log("kdnjdnd");
  const repository = new DrizzleUsersRepositories();
  const useCase = new AuthenticateUserUseCase(repository);
  try {
    const { user } = await useCase.execute({ email, password });
    const token = await reply.jwtSign({
      sub: user.id,
      email: user.email
    });
    return reply.send({ token });
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(401).send({ error: "Invalid credentials" });
    }
    return reply.status(500).send({ error: "Internal server error" });
  }
}

// src/http/controller/users/profile.ts
async function profile(request, reply) {
  return reply.send({
    id: request.user.sub,
    email: request.user.email
  });
}

// src/http/controller/users/register.ts
var import_v48 = require("zod/v4");

// src/utils/hash-password.ts
var import_bcryptjs2 = __toESM(require("bcryptjs"), 1);
async function hashPassword(plainPassword) {
  const saltRounds = 10;
  return await import_bcryptjs2.default.hash(plainPassword, saltRounds);
}

// src/use-cases/errors/user-already-exists-error.ts
var UserAlreadyExistsError = class extends AppError {
  constructor() {
    super("Usu\xE1rio com esse email j\xE1 existe.", 409);
  }
};

// src/use-cases/users/users-register-use-case.ts
var UsersRegisterUseCase = class {
  usersRepository;
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }
  async execute({
    name,
    email,
    password
  }) {
    const existingUser = await this.usersRepository.findByEmail(email);
    if (existingUser) {
      throw new UserAlreadyExistsError();
    }
    const passwordHash = await hashPassword(password);
    const newUser = {
      name,
      email,
      passwordHash
    };
    const user = await this.usersRepository.save(newUser);
    return { user };
  }
};

// src/http/controller/users/register.ts
var registerSchemaBody = import_v48.z.object({
  name: import_v48.z.string().min(3),
  email: import_v48.z.email(),
  password: import_v48.z.string().min(6)
});
async function register(request, reply) {
  const { name, email, password } = registerSchemaBody.parse(request.body);
  const repository = new DrizzleUsersRepositories();
  const useCase = new UsersRegisterUseCase(repository);
  const { user } = await useCase.execute({ name, email, password });
  return reply.status(201).send({
    id: user.id,
    name: user.name,
    email: user.email
  });
}

// src/use-cases/users/get-user-favorites-use-case.ts
var GetUserFavoritesUseCase = class {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }
  async execute(userId) {
    const favorites = await this.userRepository.findFavoritesByUserId(userId);
    return favorites;
  }
};

// src/http/controller/users/get-all-favorites.ts
async function getAllFavorites(request, reply) {
  const userId = request.user.sub;
  const repository = new DrizzleUsersRepositories();
  const useCase = new GetUserFavoritesUseCase(repository);
  const favorites = await useCase.execute(userId);
  return reply.status(200).send(favorites);
}

// src/http/controller/users/routes.ts
function usersRoutes(app2) {
  app2.post(
    "/session",
    {
      schema: {
        tags: ["Auth"],
        summary: "Autentica\xE7\xE3o de usu\xE1rio",
        body: import_v49.default.object({
          email: import_v49.default.email(),
          password: import_v49.default.string().min(6)
        }),
        response: {
          200: import_v49.default.object({
            token: import_v49.default.string()
          }),
          401: import_v49.default.object({
            error: import_v49.default.string()
          })
        }
      }
    },
    authenticate
  );
  app2.post(
    "/users",
    {
      schema: {
        tags: ["Users"],
        summary: "Registra um novo usu\xE1rio",
        body: import_v49.default.object({
          name: import_v49.default.string().min(3),
          email: import_v49.default.email(),
          password: import_v49.default.string().min(6)
        }),
        response: {
          201: import_v49.default.object({
            id: import_v49.default.uuid(),
            name: import_v49.default.string(),
            email: import_v49.default.email()
          })
        }
      }
    },
    register
  );
  app2.get(
    "/users/me",
    {
      onRequest: [verifyJwt],
      schema: {
        tags: ["Users"],
        summary: "Retorna os dados do usu\xE1rio autenticado",
        response: {
          200: import_v49.default.object({
            id: import_v49.default.string(),
            email: import_v49.default.email()
          }),
          401: import_v49.default.object({
            error: import_v49.default.string()
          })
        }
      }
    },
    profile
  );
  app2.get(
    "/user/favorites",
    {
      onRequest: [verifyJwt],
      schema: {
        tags: ["Users"],
        summary: "Retorna favoritos do usu\xE1rio agrupados por categoria",
        response: {
          200: import_v49.default.object({
            drinks: import_v49.default.array(
              import_v49.default.object({
                id: import_v49.default.uuid(),
                name: import_v49.default.string(),
                description: import_v49.default.string().nullable(),
                image: import_v49.default.string().nullable(),
                ingredients: import_v49.default.string().nullable(),
                difficulty: import_v49.default.string().nullable(),
                estimatedValue: import_v49.default.number().nullable(),
                restrictions: import_v49.default.string().nullable(),
                createdAt: import_v49.default.coerce.date()
              })
            ),
            games: import_v49.default.array(
              import_v49.default.object({
                id: import_v49.default.uuid(),
                name: import_v49.default.string(),
                description: import_v49.default.string().nullable(),
                image: import_v49.default.string(),
                isActive: import_v49.default.boolean(),
                createdAt: import_v49.default.coerce.date(),
                updatedAt: import_v49.default.coerce.date()
              })
            ),
            locations: import_v49.default.array(
              import_v49.default.object({
                id: import_v49.default.uuid(),
                name: import_v49.default.string(),
                address: import_v49.default.string().nullable(),
                image: import_v49.default.string().nullable(),
                createdAt: import_v49.default.coerce.date()
              })
            )
          })
        }
      }
    },
    getAllFavorites
  );
}

// src/http/controller/locations/routes.ts
var import_v411 = __toESM(require("zod/v4"), 1);

// src/repositories/drizzle/drizzle-locations-repository.ts
var import_drizzle_orm12 = require("drizzle-orm");
var DrizzleLocationRepository = class {
  async addFavoriteLocation(userId, locationId) {
    await db.insert(favoriteLocations).values({ userId, locationId });
  }
  async removeLocation(userId, locationId) {
    await db.delete(favoriteLocations).where(
      (0, import_drizzle_orm12.and)(
        (0, import_drizzle_orm12.eq)(favoriteLocations.userId, userId),
        (0, import_drizzle_orm12.eq)(favoriteLocations.locationId, locationId)
      )
    );
  }
  async isFavoritedLocation(userId, locationId) {
    const result = await db.query.favoriteLocations.findFirst({
      where: (0, import_drizzle_orm12.and)(
        (0, import_drizzle_orm12.eq)(favoriteLocations.userId, userId),
        (0, import_drizzle_orm12.eq)(favoriteLocations.locationId, locationId)
      )
    });
    return !!result;
  }
  async findAllWithDrinks() {
    const allLocations = await db.select().from(locations);
    const result = await Promise.all(
      allLocations.map(async (loc) => {
        const drinkLinks = await db.select({
          id: drinks.id,
          name: drinks.name
        }).from(locationDrinks).innerJoin(drinks, (0, import_drizzle_orm12.eq)(locationDrinks.drinkId, drinks.id)).where((0, import_drizzle_orm12.eq)(locationDrinks.locationId, loc.id));
        return {
          ...loc,
          drinks: drinkLinks.map((d) => d)
        };
      })
    );
    return result;
  }
  async findById(id) {
    const location = await db.query.locations.findFirst({
      where: (loc, { eq: eq5 }) => eq5(loc.id, id)
    });
    if (!location) {
      return null;
    }
    const drinkLinks = await db.select({
      id: drinks.id,
      name: drinks.name
    }).from(locationDrinks).innerJoin(drinks, (0, import_drizzle_orm12.eq)(locationDrinks.drinkId, drinks.id)).where((0, import_drizzle_orm12.eq)(locationDrinks.locationId, location.id));
    return {
      ...location,
      drinks: drinkLinks.map((d) => d)
    };
  }
};

// src/use-cases/locations/locations-all-use-case.ts
var GetAllLocationsUseCase = class {
  constructor(locationRepository) {
    this.locationRepository = locationRepository;
  }
  async execute() {
    const locations2 = await this.locationRepository.findAllWithDrinks();
    return locations2;
  }
};

// src/http/controller/locations/locations-all.ts
async function locationsAll(request, reply) {
  const locationRepository = new DrizzleLocationRepository();
  const getAllLocationsUseCase = new GetAllLocationsUseCase(locationRepository);
  const locations2 = await getAllLocationsUseCase.execute();
  return reply.status(200).send(locations2);
}

// src/use-cases/locations/toggle-favorite-location-use-case.ts
var ToggleFavoriteLocationUseCase = class {
  constructor(locationRepository) {
    this.locationRepository = locationRepository;
  }
  async execute({
    userId,
    locationId,
    isFavorite
  }) {
    const alreadyFavorited = await this.locationRepository.isFavoritedLocation(
      userId,
      locationId
    );
    if (isFavorite && !alreadyFavorited) {
      await this.locationRepository.addFavoriteLocation(userId, locationId);
    } else if (!isFavorite && alreadyFavorited) {
      await this.locationRepository.removeLocation(userId, locationId);
    }
  }
};

// src/http/controller/locations/locations-favorite.ts
var import_v410 = __toESM(require("zod/v4"), 1);
var locationFavoriteSchema = import_v410.default.object({
  locationId: import_v410.default.uuid(),
  isFavorite: import_v410.default.boolean()
});
async function locationFavorite(request, reply) {
  const { locationId, isFavorite } = locationFavoriteSchema.parse(request.body);
  const userId = request.user.sub;
  const repository = new DrizzleLocationRepository();
  const useCase = new ToggleFavoriteLocationUseCase(repository);
  await useCase.execute({ userId, locationId, isFavorite });
  return reply.status(204).send();
}

// src/http/controller/locations/routes.ts
function locationsRoutes(app2) {
  app2.get(
    "/locations",
    {
      schema: {
        tags: ["locations"],
        summary: "Retorna os dados dos locais",
        response: {
          200: import_v411.default.array(
            import_v411.default.object({
              id: import_v411.default.string(),
              name: import_v411.default.string(),
              address: import_v411.default.string().nullable(),
              image: import_v411.default.string().nullable(),
              createdAt: import_v411.default.date(),
              drinks: import_v411.default.array(
                import_v411.default.object({
                  id: import_v411.default.string(),
                  name: import_v411.default.string()
                })
              )
            })
          ),
          401: import_v411.default.object({
            error: import_v411.default.string()
          })
        }
      }
    },
    locationsAll
  );
  app2.post(
    "/locations/favorite",
    {
      onRequest: [verifyJwt],
      schema: {
        tags: ["Locations"],
        summary: "Adiciona ou remove um local dos favoritos",
        body: locationFavoriteSchema,
        response: {
          204: import_v411.default.null(),
          401: import_v411.default.object({
            error: import_v411.default.string()
          })
        }
      }
    },
    locationFavorite
  );
}

// src/app.ts
var app = (0, import_fastify.fastify)({
  logger: true
});
app.setValidatorCompiler(import_fastify_type_provider_zod.validatorCompiler);
app.setSerializerCompiler(import_fastify_type_provider_zod.serializerCompiler);
app.register(import_cors.fastifyCors, {
  origin: "*"
});
app.register(import_jwt.default, {
  secret: env.JWT_SECRET,
  sign: {
    expiresIn: env.JWT_EXPIRES_IN
  },
  decode: { complete: true }
});
app.register(import_swagger.default, {
  openapi: {
    info: {
      title: "API de Exemplo",
      description: "Documenta\xE7\xE3o da API de exemplo utilizando Fastify",
      version: "1.0.0"
    }
  },
  transform: import_fastify_type_provider_zod.jsonSchemaTransform
});
app.register(import_swagger_ui.default, {
  routePrefix: "/docs"
});
app.get("/teste", () => {
  return "OK";
});
app.register(usersRoutes);
app.register(drinksRoutes);
app.register(gamesRoutes);
app.register(locationsRoutes);
app.setErrorHandler(errorHandler);

// src/server.ts
app.listen({
  port: env.PORT,
  host: env.HOST
});

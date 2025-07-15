import { app } from "./app.ts";
import { env } from "./env/index.ts";
import dotenv from "dotenv";
dotenv.config();

app.listen({
  port: env.PORT,
  host: env.HOST,
});

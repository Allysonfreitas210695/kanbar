import type { FastifyInstance } from "fastify";
import { ZodError } from "zod";
import { env } from "./env/index.ts";
import { AppError } from "./use-cases/errors/kanbar-error.ts";

type FastifyErrorHandler = FastifyInstance["errorHandler"];

export const errorHandler: FastifyErrorHandler = (error, _, reply) => {
  if (error instanceof ZodError) {
    console.log("kdkndj");
    return reply.status(400).send({
      message: "Error during validation",
      errors: error.message,
    });
  }

  if (error instanceof AppError) {
    return reply.status(error.statusCode).send({ message: error.message });
  }

  if (env.NODE_ENV !== "production") {
    // biome-ignore lint/suspicious/noConsole: <explanation>
    console.error(error);
  }

  return reply.status(500).send({ message: "Internal server error!" });
};

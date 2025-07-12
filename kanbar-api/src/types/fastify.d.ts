import type { FastifyRequest, FastifyReply, FastifyInstance } from "fastify";
import type { JwtPayload } from "../types/jwt-payload";
import { ZodTypeProvider } from "fastify-type-provider-zod";

declare module "fastify" {
  interface FastifyInstance {
    authenticate: (
      request: FastifyRequest,
      reply: FastifyReply
    ) => Promise<void>;
  }

  interface FastifyRequest {
    user?: JwtPayload;
  }
}

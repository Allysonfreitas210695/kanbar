import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { verifyJwt } from "../../../middlewares/verify-jwt.ts";

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  return reply.send({
    id: request.user.sub,
    email: request.user.email,
  });
}

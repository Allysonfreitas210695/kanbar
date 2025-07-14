import type { FastifyReply, FastifyRequest } from "fastify";

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  return reply.send({
    id: request.user.sub,
    email: request.user.email,
  });
}

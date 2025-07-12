import type { FastifyRequest, FastifyReply, FastifyInstance } from "fastify";
import type { JwtPayload } from "../src/types/jwt-payload.ts";

export const setupAuth = (app: FastifyInstance) => {
  app.addHook(
    "onRequest",
    async (request: FastifyRequest, reply: FastifyReply) => {
      const authHeader = request.headers.authorization;
      if (!authHeader) {
        return;
      }

      try {
        const token = authHeader.replace("Bearer ", "");
        console.log(token);
        const decoded = (await app.jwt.verify(token)) as JwtPayload;
        request.user = decoded;
      } catch (err) {
        reply.status(401).send({ error: "Invalid or expired token" });
        throw err;
      }
    }
  );

  app.decorate(
    "authenticate",
    async (request: FastifyRequest, reply: FastifyReply) => {
      if (!request.user) {
        reply.status(401).send({ error: "Unauthorized" });
        throw new Error("Unauthorized");
      }
    }
  );
};

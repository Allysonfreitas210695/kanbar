import {
  FastifyInstance,
  RawRequestDefaultExpression,
  RawReplyDefaultExpression,
  RawServerDefault,
  FastifyBaseLogger,
} from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";

export type fastifyZodInstance = FastifyInstance<
  RawServerDefault,
  RawRequestDefaultExpression,
  RawReplyDefaultExpression,
  FastifyBaseLogger,
  ZodTypeProvider
>;

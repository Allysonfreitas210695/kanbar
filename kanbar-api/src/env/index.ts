import { z } from "zod";

const envSchema = z.object({
  PORT: z.coerce.number().default(3333),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  HOST: z.string().default("0.0.0.0"),
  DATABASE_URL: z
    .string()
    .url()
    .refine(
      (url) => url.startsWith("postgresql://") || url.startsWith("postgres://"),
      {
        message: "DATABASE_URL must start with postgresql:// or postgres://",
      }
    ),
  JWT_SECRET: z.string().min(32, {
    message: "JWT_SECRET must be at least 32 characters long",
  }),
  JWT_EXPIRES_IN: z.string().default("7d"),
  FRONTEND_URL: z.string().default("*"),
  API_BASE_URL: z.url().optional(),
});

export const env = envSchema.parse(process.env);

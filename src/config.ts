import * as Joi from 'joi';

export interface JWT {
  secret: string;
}

export interface App {
  port: number;
}

export interface Env {
  env: string;
  app: App;
  jwt: JWT;
}

export const configValidator = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'production', 'test'),
  APP_PORT: Joi.number().required(),
  DATABASE_URL: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
});

export const configLoader = (): Env => ({
  env: process.env.NODE_ENV,
  app: {
    port: Number(process.env.APP_PORT),
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
});

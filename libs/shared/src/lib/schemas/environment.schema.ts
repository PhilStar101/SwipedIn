import * as Joi from 'joi';

export const environmentSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'production', 'test'),
  PORT: Joi.number(),
  HOST: Joi.string().uri(),
  DB_USERNAME: Joi.string().min(1).required(),
  DB_PASSWORD: Joi.string().min(1).required(),
  DB_NAME: Joi.string().min(1).required(),
  DB_URI: Joi.string()
    .regex(/(mongodb\+srv:\/\/.*:.*@.*\/.*)|(mongodb:\/\/.*\/.*)/)
    .required(),
});

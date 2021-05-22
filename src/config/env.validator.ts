import Joi from 'joi';

const envValidator = Joi.object({
  DISCORD_BOT_TOKEN: Joi.string().required(),

  STACKHERO_REDIS_URL_TLS: Joi.string().required(),

  COMMAND_PREFIX: Joi.string().required(),
}).unknown();

export default () => {
  return envValidator.validate(process.env);
}
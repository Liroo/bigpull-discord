import Joi from 'joi';

const envValidator = Joi.object({
  DISCORD_BOT_TOKEN: Joi.string().required(),

  STACKHERO_REDIS_URL_TLS: Joi.string().required(),

  COMMAND_PREFIX: Joi.string().required(),

  WLOGS_URL: Joi.string().required(),
  WLOGS_CLIENT_ID: Joi.string().required(),
  WLOGS_CLIENT_SECRET: Joi.string().required(),

  BNET_URL: Joi.string().required(),
  BLIZZARD_API_URL: Joi.string().required(),
  BLIZZARD_CLIENT_ID: Joi.string().required(),
  BLIZZARD_CLIENT_SECRET: Joi.string().required(),
}).unknown();

export default () => {
  return envValidator.validate(process.env);
}
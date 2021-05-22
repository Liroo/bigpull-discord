import Joi from "joi";
import { WowClass } from "types/wow";

export const JoiWowProgressClass: Joi.StringSchema = Joi.string().valid(...Object.values(WowClass));
import BaseCommand from "base/command";
import { Message } from "discord.js";
import Joi from "joi";
import { WowClass } from "types/wow";
import { JoiWowProgressClass } from "utils/wow/validator";

export default class WowProgressCommand extends BaseCommand {
  public name: string = 'wowprogress';

  protected _validator: Joi.ArraySchema = Joi.array().items(
    JoiWowProgressClass
  ).length(1);

  protected _exec(message: Message, wowClass: WowClass = WowClass.All): void {
    message.channel.send(wowClass);
  }
}

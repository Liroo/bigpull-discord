import { Client, Message } from "discord.js";
import Joi from "joi";

export default abstract class BaseCommand {
  public name: string = 'not_implemented';
  private _client: Client;

  constructor(client: Client) {
    this._client = client;
  }

  protected _validator: Joi.ArraySchema = Joi.array();

  public async exec(message: Message, args: string[]) {
    const validation = this._validator.validate(args);

    if (!validation.error) {
      await this._exec.apply(this, [message, ...validation.value]);
    }
  }

  protected abstract _exec(...args: any[]): Promise<void>;
}
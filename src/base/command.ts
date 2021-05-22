import { Client, Message } from "discord.js";
import Joi from "joi";

export default class BaseCommand {
  public name: string = 'not_implemented';
  private _client: Client;

  constructor(client: Client) {
    this._client = client;
  }

  protected _validator: Joi.ArraySchema = Joi.array();

  public exec(message: Message, args: string[]) {
    const validation = this._validator.validate(args);

    if (!validation.error) {
      this._exec.apply(this, [message, ...validation.value]);
    }
  }

  protected _exec(...args: any[]): void {
    console.log('Command is not implementing a _exec function.');
  }
}
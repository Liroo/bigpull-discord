import BaseEvent from "base/event";
import { Client } from "discord.js";

export default class ReadyEvent extends BaseEvent {
  public once: boolean = true;

  public async exec() {
    console.log('Ready !');
  }
}

import BaseEvent from "base/event";
import { Client } from "discord.js";

export default class ReadyEvent extends BaseEvent {
  public once: boolean = true;

  exec() {
    console.log('Ready !');
  }
}

import BaseCommand from "base/command";
import BaseEvent from "base/event";
import { Message } from "discord.js";

export default class ReadyEvent extends BaseEvent {
  public async exec(message: Message) {
    if (!message.content.startsWith(global.__ENV__.COMMAND_PREFIX) || message.author.bot) return;

    const args: string[] = message.content
      .slice(global.__ENV__.COMMAND_PREFIX.length)
      .trim()
      .split(/ +/);
    
    const commandName = (args.shift()?.toLocaleLowerCase() as string);

    if (this._bigpull.commands.has(commandName)) {
      const command: BaseCommand = this._bigpull.commands.get(commandName) as BaseCommand;

      // maybe permission?
      try {
        await command.exec(message, args);
      } catch (error) {
        console.error(error);
        message.channel.send('There was an error with this command.');
      }
    }
  }
}

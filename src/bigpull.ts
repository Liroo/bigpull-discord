import { Client, ClientOptions, Collection } from 'discord.js';
import BaseCommand from 'base/command';
import BaseEvent from "base/event";

import { getFilesSync } from 'utils/loader';

export default class BigPull {
  private _client: Client;

  public commands: Collection<string, BaseCommand> = new Collection();

  constructor(options: ClientOptions = {}) {
    this._client = new Client(options);

    this._loadCommands();
    this._loadEvents();

    this._client.login(process.env.DISCORD_BOT_TOKEN);
  }

  _loadCommands(): void {
    const commandsFiles: string[] = getFilesSync(`${__dirname}/commands/`);

    for (const file of commandsFiles) {
      const command: BaseCommand = new (require(`${file}`).default)(this);
      const name = command.name;

      this.commands.set(name, command);
    }
  }

  _loadEvents(): void {
    const eventFiles: string[] = getFilesSync(`${__dirname}/events/`);

    for (const file of eventFiles) {
      const event: BaseEvent = new (require(`${file}`).default)(this);
      const name = file.slice(file.lastIndexOf('/') + 1, file.length - 3);

      if (event.once) {
        this._client.once(name, (...args) => event.exec(...args));
      } else {
        this._client.on(name, (...args) => event.exec(...args));
      }
    }
  }
}
import BaseCommand from "base/command";
import { InjectClass } from "decorators/inject";
import { Message, MessageEmbed } from "discord.js";
import GraphqlWlogs from "graphql/wlogs";
import ScrapperWowProgress from "scrapper/wowprogress";
import Joi from "joi";
import { WowCharacter, WowClass } from "types/wow";
import { WowProgressPlayer } from "types/wowprogress";
import { JoiWowProgressClass } from "utils/wow/validator";
import HttpBlizzardApi from "http/blizzardApi";

export default class WowProgressCommand extends BaseCommand {
  public name: string = 'wowprogress';

  @InjectClass(GraphqlWlogs) graphqlWlogs: GraphqlWlogs;
  @InjectClass(HttpBlizzardApi) httpBlizzardApi: HttpBlizzardApi;

  protected _validator: Joi.ArraySchema = Joi.array().items(
    JoiWowProgressClass
  ).length(1);

  protected async _exec(message: Message, wowClass: WowClass = WowClass.All): Promise<void> {
    const scrapper = new ScrapperWowProgress();

    let players: WowProgressPlayer[] = [];
    try {
      await scrapper.init();
      players = await scrapper.scrapMain(wowClass);
    } catch (err) {
      await scrapper.close();
      throw err;
    }
    await scrapper.close();

    const wlogsPlayers = await this.graphqlWlogs.getPlayers(players as WowCharacter[]);
    const characterMedias = await this.httpBlizzardApi.getCharacterMedias(players as WowCharacter[]);

    const embedCharacters = players.map((_, i) => {
      const msg = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle(`${players[i].name}-${players[i].server}`)
        .setURL(players[i].link)
        .setAuthor('Big Pull')
        .setDescription('Some description here')
        .setThumbnail(characterMedias[i].assets[0].value)
        .addFields(
          { name: 'Faction', value: wlogsPlayers[i].faction.name },
          { name: 'Mythic Raid Avg', value: wlogsPlayers[i].zoneRankings.bestPerformanceAverage, inline: true },
          { name: 'Inline field title', value: 'Some value here', inline: true },
        )
        .setTimestamp()

        message.channel.send(msg);
    });
  }
}

import { Singleton } from "decorators/singleton";
import ScrapperBehavior from "scrapper/behavior";
import { WowClass } from "types/wow";
import { WowProgressPlayer } from "types/wowprogress";

const WOWPROGRESS_LIST_URL = 'https://www.wowprogress.com/gearscore/?lfg=1&raids_week=3&lang=fr&sortby=ts';

@Singleton
export default class ScrapperWowProgress extends ScrapperBehavior {
  public async scrapMain(wowClass: WowClass) {
    console.log(`(Not implemented): Potential class handling there for ${wowClass}`);

    const players: WowProgressPlayer[] = await this.single(WOWPROGRESS_LIST_URL, this._scrapList);

    return players;
  }

  public _scrapList(): WowProgressPlayer[] {
    const players = Array.from(document.querySelectorAll('table.rating tbody tr:not(:first-child)'));

    const playersInfo = players.map((player) => {
      const name = player.querySelector('td:nth-of-type(1)')?.textContent as string;
      let server = player.querySelector('td:nth-of-type(4)')?.textContent as string;
      server = server.substring(server.lastIndexOf('-') + 1, server.length)

      const link = 'https://www.wowprogress.com' + player.querySelector('td:nth-of-type(1) a')?.getAttribute('href') as string;

      // date is bugged
      const dateString = player.querySelector('td:nth-of-type(6) span')?.getAttribute('aria-label') as string;
      const date: Date = new Date(dateString);

      return { name, server, link, date };
    });

    return playersInfo;
  }
}
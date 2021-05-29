import { InjectClass } from 'decorators/inject';
import { gql } from 'graphql-request';
import HttpWlogs from 'http/wlogs';
import { WowCharacter } from 'types/wow';
import GraphqlBehavior from './behavior';

export default class GraphqlWlogs extends GraphqlBehavior {
  @InjectClass(HttpWlogs) httpWlogs: HttpWlogs;

  constructor() {
    super();

    this.init(`${global.__ENV__.WLOGS_URL}/api/v2/client`);
  }

  private async _getPlayers(players: WowCharacter[]) {
    const characterQuery = players.map(({ name, server }, i) => {
      return `
        i${i}: character(name: "${name}", serverRegion: "EU", serverSlug: "${server}"
        ) {
          id,
          name,
          server {
            name
          },
          classID,
          faction {
            name
          },
          zoneRankings(difficulty: 5)
        }
      `;
    });
    const query = gql`
      {
        characterData {
          ${characterQuery.join(`\n`)}
        }
      }
    `;

    return await this.request(query);
  }

  async getPlayers(players: WowCharacter[], alreadyTried: boolean = false): Promise<any[]> {
    let res: any = {};
    try {
      res = await this._getPlayers(players);
    } catch (err) {
      if (err.response.status === 401 && !alreadyTried) {
        const { access_token } = await this.httpWlogs.getAccessToken();

        this.setBearer(access_token);

        return this.getPlayers(players, true);
      } else {
        throw err;
      }
    }

    const wlogsPlayers = [];
    for (var key in res.characterData) {
      if (Object.prototype.hasOwnProperty.call(res.characterData, key)) {
        if (res.characterData[key]) { // This will handle null value
          /*
            Null value should not be found but there is a case here where
            it can happen.

            Profil from other region IE. US will trigger this null value
            because I don't handle it
          */
          wlogsPlayers.push(res.characterData[key]);
        }
      }
    }

    return wlogsPlayers;
  }
}
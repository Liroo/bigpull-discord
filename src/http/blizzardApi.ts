import { InjectClass } from 'decorators/inject';
import { Singleton } from 'decorators/singleton';
import { WowCharacter } from 'types/wow';
import HttpBehavior from './behavior';
import HttpBNet from './bnet';

@Singleton
export default class HttpBlizzardApi extends HttpBehavior {
  @InjectClass(HttpBNet) httpBNet: HttpBNet;

  constructor() {
    super(global.__ENV__.BLIZZARD_API_URL);
  }

  public async _getCharacterMedia(character: WowCharacter, access_token: string): Promise<object> {
    try {
      return await this.getHttp(`/profile/wow/character/${character.server.toLowerCase()}/${character.name.toLowerCase()}/character-media?namespace=profile-eu`, {
        'authorization': `Bearer ${access_token}`
      })
    } catch(err) {
      console.error(err);
      return {};
    }
  }

  public async getCharacterMedias(characters: WowCharacter[]): Promise<object> {
    const { access_token } = await this.httpBNet.getAccessToken();

    const characterQueries = characters.map((character) =>
      this._getCharacterMedia(character, access_token)
    );

    return await Promise.all(characterQueries);
  }
}
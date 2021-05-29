import { Singleton } from 'decorators/singleton';
import HttpBehavior from './behavior';

@Singleton
export default class HttpBNet extends HttpBehavior {
  constructor() {
    super(global.__ENV__.BNET_URL);
  }

  public async getAccessToken() {
    const basicToken = Buffer.from(
        `${global.__ENV__.BLIZZARD_CLIENT_ID}:${global.__ENV__.BLIZZARD_CLIENT_SECRET}`
      ).toString('base64');

    return await this.postHttp('/oauth/token?grant_type=client_credentials', {}, {
      "authorization": `Basic ${basicToken}`
    });
  }
}
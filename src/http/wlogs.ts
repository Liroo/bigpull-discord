import { Singleton } from 'decorators/singleton';
import HttpBehavior from './behavior';

@Singleton
export default class HttpWlogs extends HttpBehavior {
  constructor() {
    super(global.__ENV__.WLOGS_URL);
  }

  public async getAccessToken() {
    return await this.postHttp('/oauth/token', {
      grant_type: 'client_credentials',
      client_id: global.__ENV__.WLOGS_CLIENT_ID,
      client_secret: global.__ENV__.WLOGS_CLIENT_SECRET,
    });
  }
}
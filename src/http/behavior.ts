import { Client, Pool } from 'undici';
import HttpError from './errors';

export enum HttpMethod {
  Get = 'GET',
  Post = 'POST',
}

export default class HttpBehavior {
  private readonly pool: Pool;

  constructor(url: string, options: object = {}) {
    this.pool = new Pool(url, {
      keepAliveTimeout: 1000,
      headersTimeout: 0,
      bodyTimeout: 0,
      pipelining: 0,
      connections: 100,
      ...options,
    } as any);
  }

  protected async request<Out = any, In = any>(method: HttpMethod, path: string, req?: In, headers?: object): Promise<Out> {
    const options: Client.RequestOptions = {
      path,
      method,
      headers: {
        "Content-Type": "application/json",
        ...(headers || {}),
      },
    };
    if (method === HttpMethod.Post && req) {
      options.body = JSON.stringify(req);
    }
    const { statusCode, body } = await this.pool.request(options);

    let buffer = "";
    try {
      body.setEncoding("utf8");
      for await (const data of body) {
        buffer = buffer.concat(data);
      }
    } catch (err) {
      body.destroy();
      throw err;
    }

    let response;
    try {
      response = JSON.parse(buffer);
    } catch (e) {
      response = buffer.toString();
      if (response.length === 0) response = undefined;
    }

    if (statusCode >= 300) {
      throw new HttpError(statusCode.toString(), response);
    }
    return response;
  }

  protected async getHttp<Out = any>(path: string, headers?: object): Promise<Out> {
    return await this.request<Out>(HttpMethod.Get, path, {}, headers);
  }

  protected async postHttp<Out = any, In = any>(path: string, req?: In, headers?: object): Promise<Out> {
    return await this.request<Out, In>(HttpMethod.Post, path, req, headers);
  }
}
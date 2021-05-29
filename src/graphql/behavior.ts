import { GraphQLClient } from 'graphql-request'
import { RequestDocument, Variables } from 'graphql-request/dist/types';

export default class GraphqlBehavior {
  private client?: GraphQLClient;

  public init(endpoint: string, options?: object): void {
    this.client = new GraphQLClient(endpoint, options);
  }

  public setBearer(token: string): void {
    this.client.setHeader('authorization', `Bearer ${token}`);
  }

  protected async request<T = any, V = Variables>(document: RequestDocument, variables?: V): Promise<T> {
    return await this.client.request<T, V>(document, variables);
  }
}
import { Response, Request } from 'express';
import { IConfig } from 'config';

export interface IResolverContext {
  request: Request;
  response: Response;
  config: IConfig;
}

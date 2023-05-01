import { IConfig } from 'config';
import { Models } from 'mongoose';
import { PubSub } from 'graphql-subscriptions';
import { IStaff } from '@server-databases/mongodb/interfaces/IStaff';

export interface IResolverContext {
  config: IConfig;
  models: Models;
  pubSub: PubSub;
  authenticatedStaff: IStaff;
}

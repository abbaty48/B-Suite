import { Type } from '@server-resolvers/utype';
import { DateScalar } from '@server-resolvers/date';
import { Queries } from '@server-resolvers/queries';
import { Mutations } from '@server-resolvers/mutations';
import { Resolvers } from '@server-models/@types/resolver_types';
import { Subscriptions } from '@server-resolvers/subscriptions';

export const resolvers: Resolvers = {
  Type,
  Query: Queries,
  Date: DateScalar,
  Mutation: Mutations,
  Subscription: Subscriptions,
};

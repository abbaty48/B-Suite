import { ObjectId } from 'mongodb';
import { PubSub } from 'graphql-subscriptions';
import { StoreController } from '@server-controllers/store.controller';

export const escapeRegExp = (s: string) =>
  s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');

export const stringToID = (s: string) =>
  ObjectId.isValid(s) ? new ObjectId(s) : new ObjectId();

export const decodeRSAKey = (s: string): string => {
  return Buffer.from(s, 'base64').toString('ascii');
};

export const extractToken = (authorization: string): string => {
  const _ = authorization.split(' '); // split the authorization
  return _[1]; // get the token string from the authorization string
};

export const genRandom = (radix: number = 36) =>
  Math.floor(Math.random() * Date.now()).toString(radix);

export const setRealTimeSubscription = async (
  pubSub: PubSub,
  listen: string,
  key: string,
  value: number
) => {
  const {
    totalSales,
    totalStaffs,
    totalProducts,
    totalCustomers,
    totalWarehouses,
    totalExpiredProducts,
  } = await StoreController.store();

  pubSub.publish(listen, {
    storeRealTime: {
      totalSales: totalSales.result ?? 0,
      totalStaffs: totalStaffs.result ?? 0,
      totalProducts: totalProducts.result ?? 0,
      totalCustomers: totalCustomers.result ?? 0,
      totalWarehouses: totalWarehouses.result ?? 0,
      totalExpiredProducts: totalExpiredProducts.result ?? 0,
      [key]: value,
    },
  });
};

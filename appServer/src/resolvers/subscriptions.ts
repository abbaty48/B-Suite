/* eslint-disable @typescript-eslint/no-explicit-any */
import { SubscriptionResolvers } from '@server-models/@types/resolver_types';

const ProductSubscriptions: SubscriptionResolvers = {
  productAddSubscription: {
    subscribe: (_, __, { pubSub }: any) =>
      pubSub.asyncIterator('LISTEN_ADD_PRODUCT'),
  }, // end productAddSubscription
  productEditSubscription: {
    subscribe: (_, __, { pubSub }: any) =>
      pubSub.asyncIterator('LISTEN_EDIT_PRODUCT'),
  },
  productDeleteSubscription: {
    subscribe: (_, __, { pubSub }: any) =>
      pubSub.asyncIterator('LISTEN_DELETE_PRODUCT'),
  },
}; // end ProductSubscriptions

const StaffSubscriptions: SubscriptionResolvers = {
  staffAddSubscription: {
    subscribe: (_, __, { pubSub }: any) =>
      pubSub.asyncIterator('LISTEN_ADD_STAFF'),
  },
  staffDeleteSubscription: {
    subscribe: (_, __, { pubSub }: any) =>
      pubSub.asyncIterator('LISTEN_DELETE_STAFF'),
  },
}; // end StaffSubscripbtions

const CategorySubscriptions: SubscriptionResolvers = {
  categoryAddSubscription: {
    subscribe: (_, __, { pubSub }: any) =>
      pubSub.asyncIterator('LISTEN_ADD_CATEGORY'),
  },
  categoryEditSubscription: {
    subscribe: (_, __, { pubSub }: any) =>
      pubSub.asyncIterator('LISTEN_EDIT_CATEGORY'),
  },
  categoryDeleteSubscription: {
    subscribe: (_, __, { pubSub }: any) =>
      pubSub.asyncIterator('LISTEN_DELETE_CATEGORY'),
  },
}; // end CategorySubscription

const WarehouseSubscriptins: SubscriptionResolvers = {
  warehouseAddSubscription: {
    subscribe: (_, __, { pubSub }: any) =>
      pubSub.asyncIterator('LISTEN_ADD_WAREHOUSE'),
  },
  warehouseEditSubscription: {
    subscribe: (_, __, { pubSub }: any) =>
      pubSub.asyncIterator('LISTEN_EDIT_WAREHOUSE'),
  },
  warehouseDeleteSubscription: {
    subscribe: (_, __, { pubSub }: any) =>
      pubSub.asyncIterator('LISTEN_DELETE_WAREHOUSE'),
  },
}; // end WarehouseSubscriptins

const SupplySubscriptions: SubscriptionResolvers = {
  supplyAddSubscription: {
    subscribe: (_, __, { pubSub }: any) =>
      pubSub.asyncIterator('LISTEN_ADD_SUPPLY'),
  },
  supplyEditSubscription: {
    subscribe: (_, __, { pubSub }: any) =>
      pubSub.asyncIterator('LISTEN_EDIT_SUPPLY'),
  },
  supplyDeleteSubscription: {
    subscribe: (_, __, { pubSub }: any) =>
      pubSub.asyncIterator('LISTEN_DELETE_SUPPLY'),
  },
}; // end SupplySubscriptions

const SaleSubscriptions: SubscriptionResolvers = {
  saleAddSubscription: {
    subscribe: (_, __, { pubSub }: any) =>
      pubSub.asyncIterator('LISTEN_ADD_SALE'),
  },
  saleEditSubscription: {
    subscribe: (_, __, { pubSub }: any) =>
      pubSub.asyncIterator('LISTEN_EDIT_SALE'),
  },
  saleDeleteSubscription: {
    subscribe: (_, __, { pubSub }: any) =>
      pubSub.asyncIterator('LISTEN_DELETE_SALE'),
  },
};

const StoreSubscriptions: SubscriptionResolvers = {
  storeRealTime: {
    subscribe: (_, __, { pubSub }: any) =>
      pubSub.asyncIterator('LISTEN_REALTIME_STORE'),
  },
}; // StoreSubscriptions

export const Subscriptions: SubscriptionResolvers = {
  ...CategorySubscriptions,
  ...WarehouseSubscriptins,
  ...ProductSubscriptions,
  ...SupplySubscriptions,
  ...StaffSubscriptions,
  ...SaleSubscriptions,
  ...StoreSubscriptions,
};

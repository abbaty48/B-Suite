import { Model, Schema, model, models } from 'mongoose';
import { IStore } from '@server-databases/mongodb/interfaces/IStore';

const StoreSchema = new Schema(
  {
    _sysInitialized: { type: 'boolean', required: false, default: false },
    _enterpriseInitialized: {
      type: 'boolean',
      required: false,
      default: false,
    },
    enterPrise: {
      type: {
        name: { type: 'string', required: true },
        slogan: { type: 'string', required: false },
        title: { type: 'string', required: false },
        address: { type: 'string', required: false },
        about: { type: 'string', required: false },
        website: { type: 'string', required: false },
        contacts: { type: ['string'], required: true },
        email: { type: 'string', required: false },
        socialAccounts: {
          type: {
            facebook: { type: 'string', required: false },
            twitter: { type: 'string', required: false },
            youtube: { type: 'string', required: false },
            instagram: { type: 'string', required: false },
          },
          required: false,
        },
        owners: [
          {
            name: { type: 'string', required: true },
            email: { type: 'string', required: true },
            about: { type: 'string', required: false },
            picture: { type: 'string', required: false },
            phoneNumber: { type: 'string', required: true },
            website: { type: 'string', required: false },
            socialAccounts: {
              type: {
                facebook: { type: 'string', required: false },
                twitter: { type: 'string', required: false },
                youtube: { type: 'string', required: false },
                instagram: { type: 'string', required: false },
              },
              required: false,
            }, // end socialAccounts
          }, // owners
        ], // end owners
      },
      required: true,
    },
  },
  {
    capped: {
      max: 1,
    },
  }
);

export const storeModel =
  (models.store as Model<IStore>) || model<IStore>('store', StoreSchema);

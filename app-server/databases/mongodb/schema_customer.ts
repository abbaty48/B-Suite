import { Model, Schema, model, models } from 'mongoose';
import { ICustomer } from '@server-databases/mongodb/interfaces/ICustomer';

const CustomerSchema = new Schema<ICustomer>({
  customerID: { type: 'string', required: true },
  warehouseID: { type: 'string', required: false },
  name: { type: 'string', required: true },
  email: { type: 'string', required: false },
  address: { type: 'string', required: false },
  phoneNumber: { type: 'string', required: false },
  beneficiary: { type: 'boolean', required: false, default: false },
  saleIDs: { type: ['string'], required: false, default: [] },
  metas: {
    type: {
      avatarURL: 'string',
      dateOfBirth: 'string',
      socialMedia: {
        facebook: 'string',
        twitter: 'string',
        instagram: 'string',
      },
    },
    required: false,
  },
});

CustomerSchema.virtual('warehouse', {
  ref: 'warehouse',
  localField: 'warehouseID',
  foreignField: 'warehouseID',
});
CustomerSchema.virtual('purchases', {
  ref: 'sale',
  foreignField: 'saleID',
  localField: 'saleIDs',
});

export const customerModel =
  (models.customer as Model<ICustomer>) || model('customer', CustomerSchema);

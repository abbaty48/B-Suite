import mongoose, { Model, Schema, model, models } from 'mongoose';
import { ISale } from '@server-databases/mongodb/interfaces/ISale';
import { ICustomer } from '@server-databases/mongodb/interfaces/ICustomer';

const SaleSchema = new Schema<ISale>(
  {
    saleID: { type: 'string', _id: true, required: true },
    staffID: { type: 'string', required: true },
    customerID: {
      type: 'string',
      required: true,
      validate: {
        validator: (value: ICustomer) =>
          customerModel.exists({ customerID: value.customerID }),
        msg: `[VALIDATION ERROR]: The provided customer does not exist in the customer table.`,
      },
    },
    productIDs: {
      type: ['string'],
      required: true,
    },
    warehouseID: { type: Schema.Types.ObjectId, required: false },
    date: {
      type: 'string',
      required: true,
      default: new Date(Date.now()).toLocaleDateString(),
    },
    time: {
      type: 'string',
      required: true,
      default: new Date(Date.now()).toLocaleTimeString(),
    },
    profit: {
      type: { percentage: 'number', status: 'string' },
      required: false,
    },
    paid: { type: 'number', required: true },
    totalPrice: { type: 'number', required: true }, // end totalPrice
    balance: { type: 'number', required: false, default: 0 },
    discount: { type: 'number', required: false, default: 0 },
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
    collection: 'sales',
  }
);

SaleSchema.virtual('staff', {
  ref: 'staff',
  justOne: true,
  localField: 'staffID',
  foreignField: 'staffID',
});
SaleSchema.virtual('customer', {
  ref: 'customer',
  justOne: true,
  localField: 'customerID',
  foreignField: 'customerID',
});
SaleSchema.virtual('products', {
  ref: 'product',
  localField: 'productIDs',
  foreignField: 'productID',
  options: { populate: 'category' },
});
SaleSchema.virtual('warehouse', {
  ref: 'warehouse',
  localField: 'warehouseID',
  foreignField: 'warehouseID',
  options: { populate: 'Staffs Products' },
});

export const saleModel =
  (models.sale as Model<ISale>) || model('sale', SaleSchema);

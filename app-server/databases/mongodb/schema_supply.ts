import { Model, Schema, model, models } from 'mongoose';
import { ISupply } from '@/src/databases/mongodb/interfaces/ISupply';

/**
 * PURCHASE SCHEMA
 * - Manage stores
 * - For supplying of goods and services
 * - Add new supplied goods to a product
 */
const SupplySchema = new Schema<ISupply>(
  {
    supplyID: { type: 'string', required: true },
    staffID: { type: 'string', required: true },
    productIDs: { type: ['string'], required: true },
    totalPrice: { type: 'number', required: false, default: () => 0 },
    totalQuantity: { type: 'number', required: false, default: () => 0 },
    date: {
      type: 'string',
      required: false,
      default: () => new Date().toISOString(),
    },
    warehouseID: { type: 'string', required: false },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    collection: 'supplies',
    timestamps: {
      createdAt: true,
      updatedAt: true,
      currentTime: () => new Date().getTime(),
    },
  }
);

SupplySchema.virtual('staff', {
  ref: 'staff',
  justOne: true,
  localField: 'staffID',
  foreignField: 'staffID',
});

SupplySchema.virtual('products', {
  ref: 'product',
  localField: 'productIDs',
  foreignField: 'productID',
  options: { populate: 'category' },
});

SupplySchema.virtual('warehouse', {
  ref: 'warehouse',
  justOne: true,
  localField: 'warehouseID',
  foreignField: 'warehouseID',
});

export const supplyModel =
  (models.supply as Model<ISupply>) || model<ISupply>('supply', SupplySchema);

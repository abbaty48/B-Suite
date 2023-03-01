import { Model, Schema, model, models } from 'mongoose';
import { IWarehouse } from '@server-databases/mongodb/interfaces/IWarehouse';

const WarehouseSchema = new Schema<IWarehouse>(
  {
    warehouseID: { type: 'string', _id: true, required: true },
    name: { type: 'string', required: false },
    address: { type: 'string', required: true },
    staffs: { type: [{ staffID: 'string' }], default: [] },
    products: { type: [{ productID: 'string' }], default: [] },
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

WarehouseSchema.virtual('Staffs', {
  ref: 'staff',
  foreignField: 'staffID',
  localField: 'staffs.staffID',
});

WarehouseSchema.virtual('Products', {
  ref: 'product',
  foreignField: 'productID',
  localField: 'products.productID',
});

export const warehouseModel =
  (models.warehouse as Model<IWarehouse>) ||
  model('warehouse', WarehouseSchema);

import { Model, Schema, ValidatorProps, model, models } from 'mongoose';
import { IWarehouse } from '@server-databases/mongodb/interfaces/IWarehouse';

const WarehouseSchema = new Schema<IWarehouse>(
  {
    warehouseID: { type: 'string', _id: true, required: true, index: true },
    name: {
      type: 'string',
      required: false,
      index: true,
      validate: {
        validator: async function (): Promise<boolean> {
          const name =
            this.op === 'findOneAndUpdate'
              ? this.getUpdate().$set.name
              : this.name;
          //
          return (await warehouseModel.exists({ name })) ? false : true;
        },
        message: (props: ValidatorProps) =>
          `[DUPLICATION ERROR]: A Warehouse with the same name "${props.value}" already exist.`,
      },
    },
    address: {
      type: 'string',
      required: true,
      validate: {
        validator: async function (): Promise<boolean> {
          const address =
            this.op === 'findOneAndUpdate'
              ? this.getUpdate().$set.address
              : this.address;
          //
          return (await warehouseModel.exists({ address })) ? false : true;
        },
        message: (props: ValidatorProps) =>
          `[DUPLICATION ERROR]: A Warehouse with the same address ("${props.value}") could not exist.`,
      },
    },
    staffIDs: { type: ['string'], required: false, default: [] },
    productIDs: {
      type: ['string'],
      required: false,
      default: [],
    },
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
    collection: 'warehouses',
    timestamps: {
      createdAt: true,
      updatedAt: true,
      currentTime: () => new Date().getTime(),
    },
  }
);

WarehouseSchema.virtual('staffs', {
  ref: 'staff',
  foreignField: 'staffID',
  localField: 'staffIDs',
});

WarehouseSchema.virtual('products', {
  ref: 'product',
  foreignField: 'productID',
  localField: 'productIDs',
});

export const warehouseModel =
  (models.warehouse as Model<IWarehouse>) ||
  model<IWarehouse>('warehouse', WarehouseSchema);

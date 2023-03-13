import { stringToID } from '@/src/commons/helpers';
import { Types, Model, Schema, model, models } from 'mongoose';
import { IProduct } from '@server-databases/mongodb/interfaces/IProduct';
import { categoryModel } from '@server-databases/mongodb/schema_category';
import { ICategory } from '@server-databases/mongodb/interfaces/ICategory';
import { IWarehouse } from '@server-databases/mongodb/interfaces/IWarehouse';

export const productSchema = new Schema<IProduct>(
  {
    productID: { type: 'string', _id: true, required: true, index: true },
    name: { type: 'string', required: true, index: true },
    inStock: {
      index: true,
      type: 'boolean',
      required: false,
      default: function () {
        return this?.quantity > 0;
      },
    },
    expired: {
      index: true,
      type: 'boolean',
      required: false,
      default: (schema: IProduct) => {
        return schema.expirationDate
          ? Date.now() >= Date.parse(schema.expirationDate)
          : false;
      },
    },
    category: {
      index: true,
      required: true,
      ref: 'category',
      type: Types.ObjectId,
      validate: {
        validator: (value: ICategory) =>
          categoryModel.exists({ _id: stringToID(value.id) }),
        msg: `[VALIDATION ERROR]: The provided category does not exist in the category table, please add the category first and try again.`,
      },
    },
    quantity: { type: 'number', required: true, min: 0 },
    retailPrice: { type: 'number', required: true },
    wholesalePrice: { type: 'number', required: true },
    expirationDate: { type: 'string', required: false },
    images: { type: ['string'], required: false },
    description: { type: 'string', required: false },
    warehouse: {
      index: true,
      required: false,
      ref: 'warehouse',
      type: Types.ObjectId,
      validate: {
        validator: (value: IWarehouse) =>
          categoryModel.exists({ _id: stringToID(value.id) }),
        msg: `[VALIDATION ERROR]: The provided warehouse does not exist in the warehouse table, please add the warehouse data first and try again.`,
      },
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    collection: 'products',
    timestamps: {
      createdAt: true,
      updatedAt: true,
      currentTime: () => new Date().getTime(),
    },
  }
);

productSchema.pre('save', function (this) {
  updateInStock(this, 'SAVE');
});

productSchema.pre('findOneAndUpdate', function (this) {
  updateInStock(this, 'FIND_ONE_AND_UPDATE');
});

const updateInStock = (_this: any, action: 'SAVE' | 'FIND_ONE_AND_UPDATE') => {
  let _update;
  //
  switch (action) {
    case 'FIND_ONE_AND_UPDATE':
      _update = _this.getUpdate().$set;
      break;
    case 'SAVE':
      _update = _this.getChanges().$set;
      break;
  }
  if (_update.quantity !== undefined) {
    _this.set({ inStock: _update.quantity > 0 });
  }
};

export const productModel =
  (models.product as Model<IProduct>) ||
  model<IProduct>('product', productSchema);

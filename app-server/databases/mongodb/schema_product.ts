import { stringToID } from '@/src/commons/helpers';
import { Types, Model, Schema, model, models } from 'mongoose';
import { IProduct } from '@server-databases/mongodb/interfaces/IProduct';
import { FeatureSchema } from '@server-databases/mongodb/schema_feature';
import { categoryModel } from '@server-databases/mongodb/schema_category';
import { ICategory } from '@server-databases/mongodb/interfaces/ICategory';
import { warehouseModel } from '@server-databases/mongodb/schema_warehouse';

export const productSchema = new Schema<IProduct>(
  {
    productID: { type: 'string', _id: true, required: true, index: true },
    name: {
      type: 'string',
      required: true,
      index: true,
      validate: {
        validator: async function (): Promise<boolean> {
          const name =
            this.op === 'findOneAndUpdate'
              ? this.getUpdate().$set.name
              : this.name;
          //
          return (await productModel.exists({ name })) ? false : true;
        },
        message: (_prop) =>
          `[DUPLICATE ERROR]:  A product with the provided name "${_prop.value}" already exist in the products record, please provide a different one and try again.`,
      },
    },
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
        msg: `[VALIDATION ERROR]: The provided category does not exist in the category records, please add the category first and try again.`,
      },
    },
    quantity: { type: 'number', required: true, min: 0 },
    retailPrice: { type: 'number', required: true },
    wholesalePrice: { type: 'number', required: true },
    expirationDate: { type: 'string', required: false },
    features: { type: [FeatureSchema], required: false },
    description: { type: 'string', required: false },
    warehouseIDs: ['string'],
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

productSchema.virtual('warehouses', {
  ref: 'warehouse',
  localField: 'warehouseIDs',
  foreignField: 'warehouseID',
});

productSchema.pre('save', function (this: IProduct) {
  updateProperties(this, 'SAVE');
});

productSchema.pre('findOneAndUpdate', function (this: IProduct) {
  updateProperties(this, 'FIND_ONE_AND_UPDATE');
});

const updateProperties = (
  _this: any,
  action: 'SAVE' | 'FIND_ONE_AND_UPDATE'
) => {
  let _update;
  //
  switch (action) {
    case 'FIND_ONE_AND_UPDATE':
      {
        _update = _this.getUpdate().$set;
        // UPDATE PRODUCT_IDS IN WAREHOUSE
        if (_this?.getUpdate().warehouseIDs !== undefined) {
          _upsertProductID(
            _this.getUpdate().warehouseIDs,
            _this.getUpdate().productID
          );
        }
      }
      break;
    case 'SAVE':
      {
        _update = _this.getChanges().$set;
        // UPDATE PRODUCT_IDS IN WAREHOUSE
        if (_update?.warehouseIDs !== undefined) {
          _upsertProductID(_update.warehouseIDs, _update.productID);
        }
      }
      break;
  }
  // UPDATE QUANTITY
  if (_update?.quantity !== undefined) {
    _this.set({ inStock: _update.quantity > 0 });
  }
};

const _upsertProductID = async (warehouseIDs: string[], productID: string) => {
  if (warehouseIDs.length > 0) {
    warehouseIDs.forEach(async (warehouseID) => {
      await warehouseModel.findOneAndUpdate(
        { warehouseID, productIDs: { $ne: productID } },
        { $push: { productIDs: productID } },
        { new: true, upsert: false }
      ); // end findOneAndUpdate
    });
  } // end warehouseID
};

export const productModel =
  (models.product as Model<IProduct>) ||
  model<IProduct>('product', productSchema);

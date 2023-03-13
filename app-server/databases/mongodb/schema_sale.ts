import { Model, Schema, model, models } from 'mongoose';
import {
  ISale,
  ISaleProduct,
} from '@server-databases/mongodb/interfaces/ISale';
import {
  productModel,
  productSchema,
} from '@server-databases/mongodb/schema_product';
import { IProduct } from '@server-databases/mongodb/interfaces/IProduct';

const SaleProductSchema = new Schema<ISaleProduct>({
  ...productSchema.paths,
  kind: {
    type: 'string',
    required: false,
    default: function (this: ISaleProduct) {
      return this.category.name;
    },
  },
  quantity: {
    type: 'number',
    required: true,
  },
  subTotal: {
    type: 'number',
    required: false,
    default: function (this: ISaleProduct) {
      return this.retailPrice * this.quantity;
    }, // end function
  }, // end subTotal
});

SaleProductSchema.pre('save', async function (this: ISaleProduct) {
  // DECREASE THE PRODUCT QUANTITY
  const _product = await productModel.findOne<IProduct>({
    productID: this.productID,
  });

  if (_product.quantity <= 0) {
    throw new Error(
      `[OUT OF STOCK]: The product "${_product.name}" is currently unavailable in the products stock records.`
    );
  } // end meta check

  if (this.quantity > _product.quantity) {
    throw new Error(
      `[OUT OF STOCK]: The available quantity (${_product.quantity}) of product "${_product.name}" in the stock record is less than the sale quantity (${this.quantity}), please provide the quantity for "${_product.name}" to be less than or equal to ${_product.quantity}`
    );
  }
});

const SaleSchema = new Schema<ISale>(
  {
    saleID: { type: 'string', required: true },
    staffID: { type: 'string', required: true },
    customerID: {
      type: 'string',
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
      default: function (this: ISale) {
        // total all subtotal
        // e.g 1800
        const _totalSubtotal = this.products.reduce(
          (total, cProduct) => (total += cProduct.subTotal),
          0
        );
        // total with discount
        // eg 1800 - ((5% / 100) * 100) = 1795
        const _total = _totalSubtotal - (this.discount / 100) * 100;
        // differences 1795 - 1700PAID = 95
        const _diff = _total - this.paid;
        // Percentage
        // e.g 1700/1795 * 100 = 94.707521 ceil will round up and remove the decimal part = 95
        const percentage = Math.floor((this.paid / _total) * 100);

        return {
          percentage,
          status: percentage >= 90 ? 'Gain' : 'Lost',
        }; // end return
      }, // end default
    }, // end profit
    paid: { type: 'number', required: true },
    totalPrice: {
      type: 'number',
      required: false,
      default: function (this: ISale) {
        return this.products.reduce((total, cProduct) => {
          return (total += cProduct.subTotal);
        }, 0);
      },
    }, // end totalPrice
    discount: { type: 'number', required: false, default: 0 },
    totalQuantity: {
      type: 'number',
      required: false,
      default: function (this: ISale) {
        return this.products.reduce(
          (total, cProduct) => (total += cProduct.quantity),
          0
        );
      }, // end default
    }, // end totalQuantity
    products: [SaleProductSchema],
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
    collection: 'sales',
    timestamps: {
      createdAt: true,
      updatedAt: true,
      currentTime: () => new Date().getTime(),
    },
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
SaleSchema.virtual('warehouse', {
  ref: 'warehouse',
  localField: 'warehouseID',
  foreignField: 'warehouseID',
  options: { populate: 'Staffs Products' },
});
SaleSchema.pre('save', function (this: ISale) {
  // DECREASE THE PRODUCT QUANTITY RECORD IN THE STORE
  this.products.forEach(
    async ({ productID, quantity }: ISaleProduct) => {
      const _product = await productModel.findOne<IProduct>({
        productID,
      });
      _product.quantity -= quantity;
      await _product.save();
    } // end async
  ); // end each
});

export const saleModel =
  (models.sale as Model<ISale>) || model('sale', SaleSchema);

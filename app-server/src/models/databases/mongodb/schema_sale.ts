import { Model, Schema, UpdateQuery, model, models } from 'mongoose';
import {
  ISale,
  ISaleProduct,
} from '@server-databases/mongodb/interfaces/ISale';
import { productModel } from '@server-databases/mongodb/schema_product';
import { IProduct } from '@server-databases/mongodb/interfaces/IProduct';
import { SaleProductSchema } from '@server-databases/mongodb/schema_saleProduct';

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
    paid: { type: 'number', required: true },
    discount: { type: 'number', required: false, default: 0 },
    profit: {
      type: { percentage: 'number', status: 'string' },
      required: false,
      default: function (this: ISale) {
        return _computePercentage(this);
      }, // end default
    }, // end profit
    totalPrice: {
      type: 'number',
      required: false,
      default: function (this: ISale) {
        return _computeTotalPrice(this);
      },
    }, // end totalPrice
    totalQuantity: {
      type: 'number',
      required: false,
      default: function (this: ISale) {
        return _computeTotalQuantity(this);
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

function _computeTotalPrice(_this: any) {
  return _this.products.reduce((total: number, cProduct: ISaleProduct) => {
    return (total += cProduct.subTotal);
  }, 0);
}

function _computeTotalQuantity(_this: any) {
  return _this.products.reduce((total: number, cProduct: ISaleProduct) => {
    return (total += cProduct.quantity);
  }, 0);
}

function _computePercentage(updateSale: any) {
  // total all subtotal
  // e.g 1800
  const _totalSubtotal = updateSale.products.reduce(
    (total: any, cProduct: { subTotal: any }) => (total += cProduct.subTotal),
    0
  );
  // total with discount
  // eg 1800 - ((5% / 100) * 100) = 1795
  const _total = _totalSubtotal - (updateSale.discount ?? 0 / 100) * 100;
  // differences 1795 - 1700PAID = 95
  const _diff = _total - updateSale.paid;
  // Percentage
  // e.g 1700/1795 * 100 = 94.707521 ceil will round up and remove the decimal part = 95
  // Math.min constraint the value from ranging over 100
  const percentage = Math.min(
    Math.floor((updateSale.paid / _total) * 100),
    100
  );

  return {
    percentage,
    status: percentage >= 90 ? 'Gain' : 'Lost',
  }; // end return
}

const _saveUpdate = (_this: any) => {
  // DECREASE THE PRODUCT QUANTITY RECORD IN THE STORE
  _this.products.forEach(
    async ({ productID, quantity }: ISaleProduct) => {
      const _product = await productModel.findOne<IProduct>({
        productID,
      });
      _product.quantity -= quantity;
      _product.save({ validateBeforeSave: false });
    } // end async
  ); // end each
};

SaleSchema.pre('findOneAndUpdate', function () {
  const _updates = this.getUpdate() as UpdateQuery<ISale>;
  // recompute the profit
  this.set('profit', _computePercentage(_updates));
  // recompute the totalQuantity
  this.set('totalQuantity', _computeTotalQuantity(_updates));
  // recompute the totalPrice
  this.set('totalPrice', _computeTotalPrice(_updates));
  // saveUpdate
  _saveUpdate(_updates);
});

// PRE save
SaleSchema.pre('save', function () {
  _saveUpdate(this);
});

export const saleModel =
  (models.sale as Model<ISale>) || model('sale', SaleSchema);

import { Schema } from 'mongoose';
import { GraphQLError } from 'graphql';
import { ISaleProduct } from '@server-databases/mongodb/interfaces/ISale';
import {
  productModel,
  productSchema,
} from '@server-databases/mongodb/schema_product';
import { IProduct } from '@server-databases/mongodb/interfaces/IProduct';

export const SaleProductSchema = new Schema<ISaleProduct>({
  ...productSchema.paths,
  kind: {
    type: 'string',
    required: false,
    default: function (this: ISaleProduct) {
      return this.category.name;
    },
  },
  subTotal: {
    type: 'number',
    required: false,
    default: function (this: ISaleProduct) {
      return this.retailPrice * this.quantity;
    }, // end function
  }, // end subTotal
  quantity: { type: 'number', required: true, min: 0 },
});

SaleProductSchema.pre('save', function () {
  _saveUpdate(this);
});

async function _saveUpdate(_this: ISaleProduct) {
  // DECREASE THE PRODUCT QUANTITY
  const _product = await productModel.findOne<IProduct>({
    productID: _this.productID,
  });

  if (_product.quantity <= 0) {
    throw new GraphQLError(
      `[OUT OF STOCK]: The product "${_product.name}" is currently unavailable in the products stock records.`,
      { extensions: { code: 'BAD_INPUT', http: { status: 401 } } }
    );
  } // end meta check

  if (_this.quantity > _product.quantity) {
    throw new GraphQLError(
      `[OUT OF STOCK]: The available quantity (${_product.quantity}) of product "${_product.name}" in the stock record is less than the sale quantity (${_this.quantity}), please provide the quantity for "${_product.name}" to be less than or equal to ${_product.quantity}`,
      { extensions: { code: 'BAD_INPUT', http: { status: 401 } } }
    );
  }
}

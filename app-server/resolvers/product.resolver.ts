import { CallbackError } from 'mongoose';
import { productModel } from '@server-databases/mongodb/schema_product';
import { escapeRegExp, genRandom, stringToID } from '@server-commons/helpers';
import { RolePrevileges } from '@server-databases/mongodb/enums/RolePrevilage';
import { Filter, IFilters } from '@server-databases/mongodb/interfaces/IFilter';
import staffRoleAuthorization from '@server-commons/auths/authorizationMiddleware';

import {
  IProduct,
  IProductPayload,
  IProductsPayload,
  IProductAddPayload,
  IProductEditPayload,
  IProductDeletePayload,
} from '@server-databases/mongodb/interfaces/IProduct';
import { IResolverContext } from '@server-commons/models/interfaces/IResolverContext';

export const ProductResolver = {
  product: async (
    searchFilter: any,
    { request, response, config }: IResolverContext
  ) => {
    return new Promise<IProductPayload>(async (resolve) => {
      try {
        // AUTHENTICATE
        await staffRoleAuthorization(
          request,
          response,
          config.get('jwt.private'),
          RolePrevileges.READ_PRODUCT
        ); // end staffRoleAuthorization
        // SEARCH FILTER
        const {
          name,
          inStock,
          expired,
          quantity,
          productID,
          categoryID,
          warehouseID,
          retailPrice,
          expirationDate,
          wholesalePrice,
        } = searchFilter;
        const product = await productModel.findOne<IProduct>(
          {
            $or: [
              inStock !== undefined ? { inStock } : {},
              expired !== undefined ? { expired } : {},
              quantity ? { quantity: { $eq: quantity } } : {},
              retailPrice ? { retailPrice: { $eq: retailPrice } } : {},
              expirationDate ? { expirationDate: { $eq: expirationDate } } : {},
              wholesalePrice ? { wholesalePrice: { $eq: wholesalePrice } } : {},
              name
                ? { name: { $regex: escapeRegExp(name), $options: 'si' } }
                : {},
              productID
                ? {
                    productID: {
                      $eq: productID,
                    },
                  }
                : {},
              categoryID
                ? {
                    category: { $eq: stringToID(categoryID) },
                  }
                : {},
              warehouseID
                ? {
                    warehouse: { $eq: stringToID(warehouseID) },
                  }
                : {},
            ],
          },
          {},
          { populate: 'category warehouse' }
        );
        resolve({
          error: null,
          product,
        });
      } catch (error) {
        resolve({
          error: `[INTERNAL ERROR]: ${error.message}`,
          product: null,
        }); // end resolve
      } // end catch
    }); // end  promise
  },
  products: async (
    searchFilter: any,
    filter: IFilters,
    { request, config, response }: IResolverContext
  ) => {
    return new Promise<IProductsPayload>(async (resolve) => {
      try {
        // AUTHENTICATE
        await staffRoleAuthorization(
          request,
          response,
          config.get('jwt.private'),
          RolePrevileges.READ_PRODUCT
        );
        // SEARCH FILTER
        const {
          name,
          inStock,
          expired,
          quantity,
          productID,
          categoryID,
          retailPrice,
          warehouseID,
          expirationDate,
          wholesalePrice,
        } = searchFilter ?? {};
        // PAGINATE THE PRODUCTS
        const sort = filter.sort ?? Filter.sort,
          limit = filter.limit ?? Filter.limit,
          pageIndex = filter.pageIndex ?? Filter.pageIndex;
        const products = await productModel
          .find(
            {
              $or: [
                inStock !== undefined ? { inStock } : {},
                expired !== undefined ? { expired } : {},
                quantity ? { quantity: { $eq: quantity } } : {},
                retailPrice ? { retailPrice: { $eq: retailPrice } } : {},
                expirationDate
                  ? { expirationDate: { $eq: expirationDate } }
                  : {},
                wholesalePrice
                  ? { wholesalePrice: { $eq: wholesalePrice } }
                  : {},
                name
                  ? { name: { $regex: escapeRegExp(name), $options: 'si' } }
                  : {},
                productID
                  ? {
                      productID: {
                        $eq: productID,
                      },
                    }
                  : {},
                categoryID
                  ? {
                      category: { $eq: stringToID(categoryID) },
                    }
                  : {},
                warehouseID
                  ? {
                      warehouse: { $eq: stringToID(warehouseID) },
                    }
                  : {},
              ],
            },
            {},
            { populate: 'category warehouse' }
          )
          .sort({ firstName: sort })
          .skip(limit * pageIndex)
          .limit(limit);
        resolve({
          error: null,
          products,
          filters: {
            sort,
            total: products.length,
            nextPageIndex: pageIndex + 1,
            currentPageIndex: pageIndex,
          },
        });
      } catch (error) {
        resolve({
          error: error.message,
          filters: null,
          products: [],
        });
      }
    }); // end promise
  },
  addProduct: async (
    addProductInput: any,
    { request, response, config }: IResolverContext
  ) => {
    return new Promise<IProductAddPayload>(async (resolve) => {
      try {
        await staffRoleAuthorization(
          request,
          response,
          config.get('jwt.private'),
          RolePrevileges.ADD_PRODUCT
        );
        // PRODUCT VALIDATION
        if (await productModel.exists({ name: addProductInput.name })) {
          return resolve({
            added: false,
            newAdded: null,
            error: `[DUPLICATE ERROR]: A product with the same name "${addProductInput.name}" already exist, please provide a different name.`,
          });
        }
        //
        const productID = `PID${genRandom(10)}`;
        productModel.create(
          {
            ...addProductInput,
            productID,
            category: addProductInput.categoryID,
            warehouse: addProductInput.warehouseID ?? null,
          },
          async (error: CallbackError, newAdded: IProduct) => {
            if (error) {
              console.log(`[ERROR ADDING PRODUCT]: ${error.message}`);
              return;
            }
            resolve({
              added: true,
              error: null,
              newAdded: await newAdded.populate('category warehouse'),
            });
          }
        );
      } catch (error) {
        resolve({
          error: `[INTERNAL ERROR]: ${error.message}`,
          added: false,
          newAdded: null,
        });
      }
    }); // end promise
  },
  editProduct: async (
    editProductInput: any,
    { request, response, config }: IResolverContext
  ) => {
    return new Promise<IProductEditPayload>(async (resolve) => {
      try {
        await staffRoleAuthorization(
          request,
          response,
          config.get('jwt.private'),
          RolePrevileges.UPDATE_PRODUCT
        );
        // UPDATE
        const newEdited = await productModel.findOneAndUpdate(
          { productID: editProductInput.productID },
          { ...editProductInput },
          { new: true, runValidators: true, populate: 'category warehouse' }
        );
        resolve({
          edited: true,
          error: null,
          newEdited,
        });
      } catch (error) {
        resolve({
          edited: false,
          newEdited: null,
          error: error.message,
        });
      }
    });
  },
  deleteProduct: async (
    productID: string,
    warehouseID: string | undefined,
    { request, response, config }: IResolverContext
  ) => {
    return new Promise<IProductDeletePayload>(async (resolve) => {
      try {
        await staffRoleAuthorization(
          request,
          response,
          config.get('jwt.private'),
          RolePrevileges.DELETE_PRODUCT
        );
        // FIND THE PRDDUCT AND DELETE IT
        if (warehouseID) {
          await productModel.findOneAndRemove({
            $and: [{ productID }, { warehouseID }],
          });
        } else {
          await productModel.findOneAndRemove({ productID });
        }
        resolve({
          deleted: true,
          error: null,
        });
      } catch (error) {
        resolve({
          deleted: false,
          error: error.message,
        });
      }
    }); // end promise
  }, // end deleteProduct
};

import config from 'config';
import { CallbackError } from 'mongoose';
import { productModel } from '@server-databases/mongodb/schema_product';
import { Pagin, IPagin } from '@/src/databases/mongodb/interfaces/IPagin';
import { deleteFileUploader, serverFileUploader } from '@server-commons/file';
import { escapeRegExp, genRandom, stringToID } from '@server-commons/helpers';
import { RolePrevileges } from '@server-databases/mongodb/enums/RolePrevilage';
import staffRoleAuthorization from '@server-commons/auths/authorizationMiddleware';

import {
  IProduct,
  IProductPayload,
  IProductsPayload,
  IProductAddPayload,
  IProductEditPayload,
  IProductDeletePayload,
} from '@server-databases/mongodb/interfaces/IProduct';
import { warehouseModel } from '@server-databases/mongodb/schema_warehouse';
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
                    warehouses: [warehouseID],
                  }
                : {},
            ],
          },
          {},
          { populate: 'category warehouses' }
        );
        resolve({
          error: null,
          product,
        });
      } catch (error) {
        resolve({
          product: null,
          error: `[EXCEPTION]: ${error.message}`,
        }); // end resolve
      } // end catch
    }); // end  promise
  },
  products: async (
    searchFilter: any,
    pagin: IPagin,
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
        const sort = pagin?.sort ?? Pagin.sort,
          limit = pagin?.limit ?? Pagin.limit,
          pageIndex = pagin?.pageIndex ?? Pagin.pageIndex;
        //
        const products = await productModel.find(
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
          {
            sort: { name: { sort } },
            skip: limit * pageIndex,
            limit,
            populate: 'category warehouses',
          }
        );
        resolve({
          error: null,
          products,
          pagins: {
            sort,
            currentPageIndex: pageIndex,
            nextPageIndex: pageIndex + 1,
            totalPaginated: products.length,
            totalDocuments: await productModel.count(),
          }, // end pagins
        }); // end resolve
      } catch (error) {
        resolve({
          pagins: null,
          products: [],
          error: `[EXCEPTION]: ${error.message}`,
        }); // end resolve
      } // end catch
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
        const productID = `PID${genRandom(10)}`;
        await productModel.create(
          {
            ...addProductInput,
            productID,
            category: addProductInput.categoryID,
          },
          async (error: CallbackError, newAdded: IProduct) => {
            /**
             * FEATURES
             * --upload features image if provided
             */
            if (addProductInput.featuresURI) {
              addProductInput.featuresURI.forEach(async (uri: string) => {
                try {
                  // upload each each
                  const _feature = await serverFileUploader(
                    // IMAGEPATH
                    uri,
                    // UPLOAD PATH
                    `./public/uploads/features/products/${productID.toUpperCase()}`,
                    // SERVER URL
                    config.get('server.domain'),
                    // DESTINATED FILE NAME
                    `${addProductInput.name}_${genRandom().toLowerCase()}`
                  );
                  if (_feature) {
                    // console.log('_F: ', _feature);
                    newAdded.features.push(_feature);
                    await newAdded.save({ validateBeforeSave: false });
                    // _features.push(_feature);
                  }
                } catch (error) {}
              }); // end forEach
              // update the
              // console.log('FEATURES: ', _features);
            } // end featuresURI
            //
            resolve({
              added: true,
              error: null,
              newAdded: await newAdded.populate('category warehouses'),
            }); // end resolve
          } // end callbacck
        ); // end create
      } catch (error) {
        resolve({
          added: false,
          newAdded: null,
          error: `[EXCEPTION]: ${error.message}`,
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
        productModel.findOneAndUpdate(
          { productID: editProductInput.productID },
          { ...editProductInput },
          { new: true, runValidators: true, populate: 'category warehouses' },
          async (error, newEdited: IProduct) => {
            // EDIT FEATURE
            if (editProductInput.editFeatures) {
              const { action, addFeatureURI, removeFeatureByName } =
                editProductInput.editFeatures;

              if (action == 'ADD') {
                addFeatureURI.forEach(async (uri: string) => {
                  try {
                    // upload each each
                    const _feature = await serverFileUploader(
                      // IMAGEPATH
                      uri,
                      // UPLOAD PATH
                      `./public/uploads/features/products/${newEdited.productID.toUpperCase()}`,
                      // SERVER URL
                      config.get('server.domain'),
                      // DESTINATED FILE NAME
                      `${newEdited.name}_${genRandom().toLowerCase()}`
                    );
                    if (_feature) {
                      newEdited.features.push(_feature);
                      await newEdited.save({ validateBeforeSave: false });
                      // _features.push(_feature);
                    }
                  } catch (error) {
                    // console.log('#ERROR: ', error);
                  }
                }); // end forEach
              } else if (action == 'REMOVE') {
                if (
                  deleteFileUploader(
                    `./public/uploads/features/products/${editProductInput.productID}/${removeFeatureByName}`
                  )
                ) {
                  // delete the file the product feature array
                  newEdited.features = newEdited.features.filter(
                    (_feature) => _feature.fileName !== removeFeatureByName
                  );
                  await newEdited.save({ validateBeforeSave: false });
                }
              } // end if EDIT
            } // end if feature

            resolve({
              edited: true,
              error: null,
              newEdited,
            }); // end resolve
          } // end callback
        ); // end fineOneAndUpdate
      } catch (error) {
        resolve({
          edited: false,
          newEdited: null,
          error: `[EXCEPTION]: ${error.message}`,
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
        // FIND THE PORDUCT AND DELETE IT
        if (warehouseID) {
          await productModel.findOneAndRemove({
            $and: [{ productID }, { warehouseID }],
          });
        } else {
          await productModel.findOneAndRemove({ productID });

          // DELETE ALL PRODUCT IMAGES
          await deleteFileUploader(
            `./public/uploads/features/products/${productID}`
          );
        }
        // DELETE A PRODUCTID FROM WAREHOUSE IF WAREHOUSEID NOT UNDEFINED AND PRODUCTIDS CONTAIN THE PRODUCTID
        const criteria = warehouseID
          ? { $and: [{ warehouseID }, { productIDs: productID }] }
          : { productIDs: productID };
        await warehouseModel.findOneAndUpdate(
          criteria,
          { $pull: { productIDs: productID } },
          { multi: true }
        );
        //
        resolve({
          deleted: true,
          error: null,
        });
      } catch (error) {
        resolve({
          deleted: false,
          error: `[EXCEPTION]: ${error.message}`,
        });
      }
    }); // end promise
  }, // end deleteProduct
};

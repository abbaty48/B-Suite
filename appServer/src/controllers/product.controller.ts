import { Pagin } from '@server-databases/mongodb/interfaces/IPagin';
import {
  deleteFileUploader,
  serverFileUploader,
} from '@server-commons/commons.file';
import {
  genRandom,
  stringToID,
  escapeRegExp,
  setRealTimeSubscription,
} from '@server-commons/commons.helpers';
import { productModel } from '@server-databases/mongodb/schema_product';
import { IResolverContext } from '@server-models/interfaces/IResolverContext';
import {
  Product,
  PaginInput,
  ProductPayload,
  ProductAddInput,
  ProductsPayload,
  ProductEditInput,
  ProductAddPayload,
  SearchProductInput,
  ProductEditPayload,
  ProductDeletePayload,
  SubscriptionActionType,
} from '@server-models/@types/resolver_types';
import { IProduct } from '@server-models/databases/mongodb/interfaces/IProduct';
import { warehouseModel } from '@server-models/databases/mongodb/schema_warehouse';

export class ProductController {
  /** getProduct:  search for a specific base on the search term.
   * @param searchTerm - term to search a product with, using either of
   * property: name,inStock,expired,quantity,productID,categoryID,warehouseID,
   * retailPrice,expiratonDate,wholesalePrice.
   */
  static getProduct = async (searchTerm: SearchProductInput) => {
    return new Promise<ProductPayload>(async (resolve) => {
      try {
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
        } = searchTerm;

        const criteria =
          inStock !== undefined
            ? { inStock }
            : expired !== undefined
            ? { expired }
            : quantity
            ? { quantity: { $eq: quantity } }
            : retailPrice
            ? { retailPrice: { $eq: retailPrice } }
            : expirationDate
            ? { expirationDate: { $eq: expirationDate } }
            : wholesalePrice
            ? { wholesalePrice: { $eq: wholesalePrice } }
            : name
            ? { name: { $regex: escapeRegExp(name), $options: 'si' } }
            : productID
            ? { productID: { $eq: productID } }
            : categoryID
            ? { category: { $eq: stringToID(categoryID) } }
            : warehouseID
            ? { warehouses: [warehouseID] }
            : {};

        const product = await productModel.findOne<Product>(
          { $or: [criteria] },
          {},
          { populate: 'category warehouses' }
        );
        // console.log('PRODUCT: ', product);
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
  };

  static getProducts = async (
    searchTerm: SearchProductInput,
    pagin: PaginInput
  ) => {
    return new Promise<ProductsPayload>(async (resolve) => {
      try {
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
        } = searchTerm ?? {};
        // PAGINATE THE PRODUCTS
        const sort = pagin?.sort ?? Pagin.sort,
          limit = pagin?.limit ?? Pagin.limit,
          pageIndex = pagin?.pageIndex ?? Pagin.pageIndex;
        //
        const criteria =
          inStock !== undefined
            ? { inStock }
            : expired !== undefined
            ? { expired }
            : quantity
            ? { quantity: { $eq: quantity } }
            : retailPrice
            ? { retailPrice: { $eq: retailPrice } }
            : expirationDate
            ? { expirationDate: { $eq: expirationDate } }
            : wholesalePrice
            ? { wholesalePrice: { $eq: wholesalePrice } }
            : name
            ? { name: { $regex: escapeRegExp(name), $options: 'si' } }
            : productID
            ? { productID: { $eq: productID } }
            : categoryID
            ? { category: { $eq: stringToID(categoryID) } }
            : warehouseID
            ? { warehouses: [warehouseID] }
            : {};
        const products = await productModel.find<Product>(
          {
            $or: [criteria],
          },
          {},
          {
            sort: { name: sort },
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
  };

  static addProduct = async (
    addProductInput: ProductAddInput,
    { config, pubSub, authenticatedStaff }: IResolverContext
  ) => {
    return new Promise<ProductAddPayload>(async (resolve) => {
      try {
        const productID = `PID${genRandom(10)}`;
        const newProduct = await productModel.create({
          ...addProductInput,
          productID,
          category: addProductInput.categoryID,
        }); // end create
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
                newProduct.features.push(_feature);
                await newProduct.save({ validateBeforeSave: false });
                // _features.push(_feature);
              }
            } catch (error) {}
          }); // end forEach
        } // end featuresURI
        //
        const newAdded = (await newProduct.populate(
          'category warehouses'
        )) as Product;

        /** Publish Subscription on LISTEN_ADD_PRODUCT */

        pubSub.publish('LISTEN_ADD_PRODUCT', {
          productAddSubscription: {
            error: null,
            payload: {
              timestamp: new Date(),
              actionResult: newAdded,
              actionBy: authenticatedStaff,
              actionType: SubscriptionActionType.Added,
            },
          },
        });
        setRealTimeSubscription(
          pubSub,
          'LISTEN_REALTIME_STORE',
          'totalProducts',
          await productModel.count()
        );
        // Resolve
        resolve({
          added: true,
          error: null,
          newAdded,
        }); // end resolve
      } catch (error) {
        resolve({
          added: false,
          newAdded: null,
          error: `[EXCEPTION]: ${error.message}`,
        }); // end resolve
      } // end catch
    }); // end promise
  };

  static editProduct = async (
    editProductInput: ProductEditInput,
    { config, pubSub, authenticatedStaff }: IResolverContext
  ) => {
    return new Promise<ProductEditPayload>(async (resolve) => {
      try {
        // UPDATE
        const newEdited = await productModel.findOneAndUpdate<IProduct>(
          { productID: editProductInput.productID },
          { ...editProductInput },
          { new: true, runValidators: true, populate: 'category warehouses' }
        ); // end fineOneAndUpdate
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
                (_feature: any) => _feature.fileName !== removeFeatureByName
              );
              await newEdited.save({ validateBeforeSave: false });
            }
          } // end if EDIT
        } // end if feature

        /** Publish Subscription on LISTEN_EDIT_PRODUCT */

        pubSub.publish('LISTEN_EDIT_PRODUCT', {
          productEditSubscription: {
            error: null,
            payload: {
              timestamp: new Date(),
              actionResult: newEdited,
              actionBy: authenticatedStaff,
              actionType: SubscriptionActionType.Edited,
            },
          },
        });

        resolve({
          edited: true,
          error: null,
          newEdited: newEdited as Product,
        }); // end resolve
      } catch (error) {
        resolve({
          edited: false,
          newEdited: null,
          error: `[EXCEPTION]: ${error.message}`,
        });
      }
    });
  };

  static deleteProduct = async (
    productID: string,
    warehouseID: string | undefined,
    { models, pubSub, authenticatedStaff }: IResolverContext
  ) => {
    return new Promise<ProductDeletePayload>(async (resolve) => {
      try {
        // FIND THE PORDUCT AND DELETE IT
        let deletedProduct;
        if (warehouseID) {
          await productModel.findOneAndRemove({
            $and: [{ productID }, { warehouseID }],
          });
        } else {
          deletedProduct = await productModel.findOneAndRemove({
            productID,
          });
          // DELETE ALL PRODUCT IMAGES
          await deleteFileUploader(
            `./public/uploads/features/products/${productID}`
          );
        }
        // DELETE A PRODUCTID FROM WAREHOUSE IF WAREHOUSEID NOT UNDEFINED AND PRODUCTIDS CONTAIN THE PRODUCTID
        const criteria = warehouseID
          ? { $and: [{ warehouseID }, { productIDs: productID }] }
          : { productIDs: productID };
        models[''];
        await warehouseModel.findOneAndUpdate(
          criteria,
          { $pull: { productIDs: productID } },
          { multi: true }
        );
        /** Publish Subscription on LISTEN_ADD_PRODUCT */
        pubSub.publish('LISTEN_DELETE_PRODUCT', {
          productDeleteSubscription: {
            error: null,
            payload: {
              timestamp: new Date(),
              actionBy: authenticatedStaff,
              actionResult: deletedProduct,
              actionType: SubscriptionActionType.Deleted,
            },
          },
        });
        setRealTimeSubscription(
          pubSub,
          'LISTEN_REALTIME_STORE',
          'totalProducts',
          await productModel.count()
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
  }; // end deleteProduct
}

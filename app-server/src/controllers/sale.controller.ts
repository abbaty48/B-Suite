import { saleModel } from '@server-databases/mongodb/schema_sale';
import {
  escapeRegExp,
  genRandom,
  setRealTimeSubscription,
} from '@server-commons/commons.helpers';
import { productModel } from '@server-databases/mongodb/schema_product';
import { IResolverContext } from '@server-models/interfaces/IResolverContext';
import { customerModel } from '@server-models/databases/mongodb/schema_customer';
import {
  Sale,
  PaginInput,
  SalePayload,
  SaleProduct,
  SalesPayload,
  SaleAddInput,
  SaleAddPayload,
  SaleEditPayload,
  SearchSaleInput,
  SaleDeletePayload,
  SubscriptionActionType,
} from '@server-models/@types/resolver_types';
import { Pagin } from '@server-models/databases/mongodb/interfaces/IPagin';
import { ICustomer } from '@server-models/databases/mongodb/interfaces/ICustomer';

export const SaleController = {
  sale: async (searchTerm: SearchSaleInput) => {
    return new Promise<SalePayload>(async (resolve) => {
      try {
        // SEARCH FILTER
        const {
          date,
          time,
          saleID,
          staffID,
          paidPrice,
          productID,
          customerID,
          productName,
        } = searchTerm ?? {};
        // PAGINATE THE PRODUCTS
        let sale: Sale = null;

        if (productName) {
          sale = (
            await saleModel.find<Sale>(
              {},
              {},
              { populate: 'staff customer products' }
            )
          ).find((s) => s.products.find((p) => p.name === productName));
        } else {
          // CRITERIA
          const criteria = date
            ? { date: { $eq: date } }
            : time
            ? { time: { $regex: escapeRegExp(time), $options: 'si' } }
            : saleID
            ? { saleID: { $eq: saleID } }
            : staffID
            ? { staffID: { $eq: staffID } }
            : paidPrice
            ? { paid: { $eq: paidPrice } }
            : // query sale where the productIDs contain at least the productID
            productID
            ? {
                productIDs: productID,
              }
            : customerID
            ? {
                customerID: { $eq: customerID },
              }
            : {};
          sale = await saleModel.findOne<Sale>(
            {
              $or: [criteria],
            },
            {},
            { populate: 'staff customer products' }
          );
        }
        resolve({
          error: null,
          sale,
        });
      } catch (error) {
        resolve({
          error: `[INTERNAL ERROR]: ${error.message}`,
          sale: null,
        }); // end resolve
      } // end catch
    }); // end  promise
  },
  sales: async (searchTerm: any, pagin: PaginInput) => {
    return new Promise<SalesPayload>(async (resolve) => {
      try {
        // SEARCH FILTER
        const {
          date,
          time,
          saleID,
          staffID,
          paidPrice,
          productID,
          customerID,
          productName,
        } = searchTerm ?? {};
        // PAGINATE THE PRODUCTS
        const sort = pagin?.sort ?? Pagin.sort,
          limit = pagin?.limit ?? Pagin.limit,
          pageIndex = pagin?.pageIndex ?? Pagin.pageIndex;

        let sales: Sale[] = [];

        if (productName) {
          const _index = pageIndex <= 0 ? 1 : pageIndex;
          const _start = (_index - 1) * limit;
          const _end = _start + limit;
          sales = (
            await saleModel.find<Sale>(
              {},
              {},
              { populate: 'staff customer products' }
            )
          )
            .filter((s) => s.products.find((p) => p.name === productName))
            .slice(_start, _end);
        } else {
          const criteria = date
            ? { date: { $eq: date } }
            : time
            ? { time: { $regex: escapeRegExp(time), $options: 'si' } }
            : saleID
            ? { saleID: { $eq: saleID } }
            : staffID
            ? { staffID: { $eq: staffID } }
            : paidPrice
            ? { paid: { $eq: paidPrice } }
            : // query sale where the productIDs contain at least the productID
            productID
            ? {
                productIDs: productID,
              }
            : customerID
            ? {
                customerID: { $eq: customerID },
              }
            : {};
          sales = await saleModel
            .find<Sale>(
              {
                $or: [criteria],
              },
              {},
              { populate: 'staff customer products' }
            )
            .sort({ time: sort })
            .skip(limit * pageIndex)
            .limit(limit);
        }
        resolve({
          error: null,
          sales,
          pagins: {
            sort,
            totalPaginated: sales.length,
            currentPageIndex: pageIndex,
            totalDocuments: await saleModel.count(),
            nextPageIndex: sales.length ? pageIndex + 1 : 0,
          },
        });
      } catch (error) {
        resolve({
          error: error.message,
          pagins: null,
          sales: [],
        });
      }
    }); // end promise
  },
  addSale: async (
    addSaleInput: SaleAddInput,
    { pubSub, authenticatedStaff }: IResolverContext
  ) => {
    return new Promise<SaleAddPayload>(async (resolve) => {
      try {
        // SALEID
        const saleID = `SALE${genRandom(10)}`;
        /** PRODUCTS */
        const products = (await addSaleInput.productMetas.reduce(
          async (
            accumulator: any,
            meta: { productID: string; quantity: number }
          ) => {
            const product = await productModel.findOne(
              { productID: meta.productID },
              {},
              { populate: 'category' }
            );
            if (product !== null) {
              (await Promise.resolve(accumulator)).push({
                ...product._doc,
                kind: product.category.name,
                quantity: meta.quantity,
                subTotal: meta.quantity * product.retailPrice,
              });
            } // end  product
            return await accumulator;
          },
          []
        )) as SaleProduct[];

        if ((await products).length <= 0) {
          return resolve({
            added: false,
            newAdded: null,
            error:
              "[ERROR ADDING PRODUCT]: The product(`s) you're about to sell does not exist in the products stock records.",
          });
        }
        /** CUSTOMER */
        let _customer: ICustomer = null;
        if (addSaleInput.customerID) {
          // get the customer
          _customer = await customerModel.findOne({
            customerID: addSaleInput.customerID,
          });
          _customer.saleIDs.push(saleID);
        } else if (addSaleInput.addCustomer) {
          // create the new customer
          const customerID = `CIN${genRandom().slice(0, 5).toUpperCase()}`;
          _customer = new customerModel({
            ...addSaleInput.addCustomer,
            customerID,
            saleIDs: [saleID],
          }); // end new customerModel
        } else {
          return resolve({
            added: false,
            newAdded: null,
            error: `[ERROR ADDING SALE]: A customer must exist to make a sale, either provide a customerID or add a new customer.`,
          });
        }
        /** CREATE THE SALEMODEL */
        try {
          const _newCreated = await saleModel.create(
            [
              {
                ...addSaleInput,
                saleID,
                products,
                staffID: authenticatedStaff.staffID,
                customerID: _customer.customerID,
              },
            ],
            { validateBeforeSave: false }
          );
          // SAVE the Customer
          _customer.balance
            ? (_customer.balance += addSaleInput.balance)
            : addSaleInput.balance;
          await _customer.save();
          // CREATE A NEW SALE OBJECT
          const newAdded = Object.assign(
            await _newCreated[0].populate<Sale>('staff customer'),
            {
              products: await products,
              balance: _customer.balance ?? 0,
            }
          );
          /** Publish Subscription on LISTEN_ADD_STAFF */
          pubSub.publish('LISTEN_ADD_SALE', {
            saleAddSubscription: {
              error: null,
              payload: {
                timestamp: new Date(),
                actionResult: newAdded,
                actionBy: authenticatedStaff,
                actionType: SubscriptionActionType.Added,
              }, // end payload
            }, // end staffDeleteSubscription
          }); // end publish

          setRealTimeSubscription(
            pubSub,
            'LISTEN_REALTIME_STORE',
            'totalSales',
            await saleModel.count()
          );
          resolve({
            added: true,
            error: null,
            newAdded,
          });
        } catch (error) {
          if (error) {
            console.log('ERROR: ', error);
            return resolve({
              added: false,
              newAdded: null,
              error: `[ERROR SAVING SELL RECORD]: ${error.message}`,
            });
          }
        }
      } catch (error) {
        resolve({
          added: false,
          newAdded: null,
          error: `[EXCEPTION]: ${error.message}`,
        });
      }
    }); // end promise
  },
  editSale: async (
    editSaleInput: any,
    { pubSub, authenticatedStaff }: IResolverContext
  ) => {
    return new Promise<SaleEditPayload>(async (resolve) => {
      try {
        const { saleID, productMetas } = editSaleInput;
        // editSaleInput.productMetas
        if (productMetas) {
          let salesProducts: SaleProduct[] = (
            await saleModel.findOne({
              saleID,
            })
          ).products as SaleProduct[];

          productMetas.forEach(
            async (meta: { productID: string; quantity: number }) => {
              if (
                salesProducts.find((p) => p.productID === meta.productID) ===
                undefined
              ) {
                const product = await productModel.findOne(
                  { productID: meta.productID },
                  {},
                  { populate: 'category' }
                );
                if (product) {
                  salesProducts = salesProducts.reduce(
                    (_saleProducts: SaleProduct[], _product: SaleProduct) => {
                      _saleProducts.push({
                        ...(product._doc as unknown as SaleProduct),
                        quantity: meta.quantity,
                        kind: product.category.name,
                        subTotal: meta.quantity * product.retailPrice,
                      });
                      return _saleProducts;
                    },
                    salesProducts
                  );
                } // end product
              } // end if not meta
              else {
                return salesProducts.map((product: any) => {
                  if (product.productID === meta.productID) {
                    return Object.assign(
                      { ...product._doc },
                      {
                        quantity: meta.quantity,
                        subTotal: product.retailPrice * meta.quantity,
                      }
                    );
                  } // end product.ID == meta.productID
                  return product;
                }); // end map
              } // end forEach
            } // end forEach
          ); // end productMetas.forEach

          editSaleInput.productIDs = salesProducts.map(
            (product: any) => product.productID
          );
          //
          if (salesProducts.length <= 0) {
            return resolve({
              edited: false,
              newEdited: null,
              error:
                "[ERROR ADDING PRODUCT]: The product(`s) you're about to sell does not exist in the products records.",
            });
          }

          editSaleInput.products = salesProducts;
        } // end editSaleInput.productMetas

        /** CUSTOMER */
        let _customer: ICustomer = null;
        // A customerID is provided to edit
        if (editSaleInput.customerID) {
          // get the customer
          // get the customer
          _customer = await customerModel.findOne({
            customerID: editSaleInput.customerID,
          });

          if (!_customer) {
            return resolve({
              edited: false,
              error: `A customer with the ID: ${editSaleInput.customerID} does not exists in the customers record, please provide an existing customer ID or create a new customer.`,
              newEdited: null,
            }); // end resolve
          } else {
            if (_customer.balance && editSaleInput.balance) {
              _customer.balance += editSaleInput.balance;
            } // end if
          } // end else
        } else if (editSaleInput.addCustomer) {
          // create the new customer
          const customerID = `CIN${genRandom().slice(0, 5).toUpperCase()}`;
          _customer = new customerModel({
            ...editSaleInput.addCustomer,
            customerID,
            saleIDs: [editSaleInput.saleID],
          }); // end new customerModel
        }

        // UPDATE SALE
        const newEdited = await saleModel.findOneAndUpdate<Sale>(
          { saleID: editSaleInput.saleID },
          {
            ...editSaleInput,
          }, // end $set
          {
            new: true,
            runValidators: false,
            populate: 'staff products customer',
          }
        );

        // console.log('NEWEDITED: ', newEdited);
        // SAVE CUSTOMER AFTER UPDATE
        _customer.save();
        /** Publish Subscription on LISTEN_EDIT_SALE */
        pubSub.publish('LISTEN_EDIT_SALE', {
          saleEditSubscription: {
            error: null,
            payload: {
              timestamp: new Date(),
              actionResult: newEdited,
              actionBy: authenticatedStaff,
              actionType: SubscriptionActionType.Edited,
            }, // end payload
          }, // end staffDeleteSubscription
        }); // end publish
        // RESOLVE
        resolve({
          edited: true,
          error: null,
          newEdited,
        });
      } catch (error) {
        resolve({
          edited: false,
          newEdited: null,
          error: `[EXCEPTION]: ${error.message}`,
        });
      }
    });
  },
  deleteSale: async (
    saleID: string,
    warehouseID: string,
    { pubSub, authenticatedStaff }: IResolverContext
  ) => {
    return new Promise<SaleDeletePayload>(async (resolve) => {
      try {
        let deletedSale: Sale;
        if (warehouseID) {
          deletedSale = await saleModel.findOneAndRemove<Sale>({
            $and: [{ saleID }, { warehouseID }],
          });
        } else {
          deletedSale = await saleModel.findOneAndRemove<Sale>({ saleID });
        }
        /** Publish Subscription on LISTEN_DELETE_SALE */
        pubSub.publish('LISTEN_DELETE_SALE', {
          saleDeleteSubscription: {
            error: null,
            payload: {
              timestamp: new Date(),
              actionResult: deletedSale,
              actionBy: authenticatedStaff,
              actionType: SubscriptionActionType.Deleted,
            }, // end payload
          }, // end staffDeleteSubscription
        }); // end publish

        setRealTimeSubscription(
          pubSub,
          'LISTEN_REALTIME_STORE',
          'totalSales',
          await saleModel.count()
        );

        resolve({
          deleted: true,
          error: null,
        });
      } catch (error) {
        resolve({
          deleted: false,
          error: `[EXCEPTION]: ${error.message}`,
        }); // end resolve
      } // end catch
    }); // end promise
  }, // end deleteSale
};

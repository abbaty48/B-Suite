import { CallbackError } from 'mongoose';
import { escapeRegExp, genRandom } from '@server-commons/helpers';
import { saleModel } from '@server-databases/mongodb/schema_sale';
import { productModel } from '@server-databases/mongodb/schema_product';
import { RolePrevileges } from '@server-databases/mongodb/enums/RolePrevilage';
import { Filter, IFilters } from '@server-databases/mongodb/interfaces/IFilter';
import staffRoleAuthorization from '@server-commons/auths/authorizationMiddleware';
import {
  ISale,
  ISalePayload,
  ISalesPayload,
  ISaleAddPayload,
  ISaleEditPayload,
  ISaleDeletePayload,
} from '@server-databases/mongodb/interfaces/ISale';
import { IResolverContext } from '@server-commons/models/interfaces/IResolverContext';
import { categoryModel } from '../databases/mongodb/schema_category';
import { customerModel } from '../databases/mongodb/schema_customer';
import { ICustomer } from '../databases/mongodb/interfaces/ICustomer';
import { IProduct } from '../databases/mongodb/interfaces/IProduct';

export const SaleResolver = {
  sale: async (
    searchFilter: any,
    { request, response, config }: IResolverContext
  ) => {
    return new Promise<ISalePayload>(async (resolve) => {
      try {
        // AUTHENTICATE
        await staffRoleAuthorization(
          request,
          response,
          config.get('jwt.private'),
          RolePrevileges.READ_SALE
        ); // end staffRoleAuthorization
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
        } = searchFilter ?? {};
        // PAGINATE THE PRODUCTS

        let sale: ISale = null;

        if (productName) {
          sale = (
            await saleModel.find(
              {},
              {},
              { populate: 'staff customer products' }
            )
          ).find((s) => s.products.find((p) => p.name === productName));
        } else {
          sale = await saleModel.findOne<ISale>(
            {
              $or: [
                date ? { date: { $eq: date } } : {},
                time
                  ? { time: { $regex: escapeRegExp(time), $options: 'si' } }
                  : {},
                saleID ? { saleID: { $eq: saleID } } : {},
                staffID ? { staffID: { $eq: staffID } } : {},
                paidPrice ? { paid: { $eq: paidPrice } } : {},
                // query sale where the productIDs contain at least the productID
                productID
                  ? {
                      productIDs: productID,
                    }
                  : {},
                customerID
                  ? {
                      customerID: { $eq: customerID },
                    }
                  : {},
              ],
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
  sales: async (
    searchFilter: any,
    filter: IFilters,
    { request, response, config }: IResolverContext
  ) => {
    return new Promise<ISalesPayload>(async (resolve) => {
      try {
        // AUTHENTICATE
        await staffRoleAuthorization(
          request,
          response,
          config.get('jwt.private'),
          RolePrevileges.READ_SALE
        );
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
        } = searchFilter ?? {};
        // PAGINATE THE PRODUCTS
        const sort = filter.sort ?? Filter.sort,
          limit = filter.limit ?? Filter.limit,
          pageIndex = filter.pageIndex ?? Filter.pageIndex;

        let sales: ISale[] = [];

        if (productName) {
          const _index = pageIndex <= 0 ? 1 : pageIndex;
          const _start = (_index - 1) * limit;
          const _end = _start + limit;
          sales = (
            await saleModel.find(
              {},
              {},
              { populate: 'staff customer products' }
            )
          )
            .filter((s) => s.products.find((p) => p.name === productName))
            .slice(_start, _end);
        } else {
          sales = await saleModel
            .find<ISale>(
              {
                $or: [
                  date ? { date: { $eq: date } } : {},
                  time
                    ? { time: { $regex: escapeRegExp(time), $options: 'si' } }
                    : {},
                  saleID ? { saleID: { $eq: saleID } } : {},
                  staffID ? { staffID: { $eq: staffID } } : {},
                  paidPrice ? { paid: { $eq: paidPrice } } : {},
                  // query sale where the productIDs contain at least the productID
                  productID
                    ? {
                        productIDs: productID,
                      }
                    : {},
                  customerID
                    ? {
                        customerID: { $eq: customerID },
                      }
                    : {},
                ],
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
          filters: {
            sort,
            totalFilter: sales.length,
            currentPageIndex: pageIndex,
            totalDocuments: await saleModel.count(),
            nextPageIndex: sales.length ? pageIndex + 1 : 0,
          },
        });
      } catch (error) {
        resolve({
          error: error.message,
          filters: null,
          sales: [],
        });
      }
    }); // end promise
  },
  addSale: async (
    addSaleInput: any,
    { request, response, config }: IResolverContext
  ) => {
    return new Promise<ISaleAddPayload>(async (resolve) => {
      try {
        const authStaff = await staffRoleAuthorization(
          request,
          response,
          config.get('jwt.private'),
          RolePrevileges.ADD_SALE
        );

        // SALEID
        const saleID = `SALE${genRandom(10)}`;
        /** PRODUCTS */
        const products = addSaleInput.productMetas.reduce(
          async (
            accumulator: any[],
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
                quantity: meta.quantity,
                subTotal: meta.quantity * product.retailPrice,
              });
            } // end  product
            return await accumulator;
          },
          []
        );

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
          _customer = new customerModel<ICustomer>({
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
        saleModel.create(
          {
            ...addSaleInput,
            saleID,
            products: await products,
            staffID: authStaff.staffID,
            customerID: _customer.customerID,
          },
          async (error: CallbackError, _newAdded: ISale) => {
            if (error) {
              return resolve({
                added: false,
                newAdded: null,
                error: `[ERROR SAVING SELL RECORD]: ${error.message}`,
              });
            }
            // SAVE the Customer
            _customer.balance = addSaleInput.balance;
            await _customer.save();
            // CREATE A NEW SALE OBJECT
            const newAdded = Object.assign(
              await _newAdded.populate('staff customer'),
              {
                products: await products,
              }
            );

            resolve({
              added: true,
              error: null,
              newAdded,
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
  editSale: async (
    editSaleInput: any,
    { request, response, config }: IResolverContext
  ) => {
    return new Promise<ISaleEditPayload>(async (resolve) => {
      try {
        await staffRoleAuthorization(
          request,
          response,
          config.get('jwt.private'),
          RolePrevileges.UPDATE_SALE
        );
        // editSaleInput.productMetas
        if (editSaleInput.productMetas) {
          const products = editSaleInput.productMetas.reduce(
            async (
              accumulator: any[],
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
                  quantity: meta.quantity,
                  subTotal: meta.quantity * product.retailPrice,
                });
              } // end  product
              return await accumulator;
            },
            []
          );
          editSaleInput.productIDs = (await products).map(
            (product: any) => product.productID
          );
          //
          if ((await products).length <= 0) {
            return resolve({
              edited: false,
              newEdited: null,
              error:
                "[ERROR ADDING PRODUCT]: The product(`s) you're about to sell does not exist in the products records.",
            });
          }
        } // end editSaleInput.productMetas
        // UPDATE
        const newEdited = await saleModel.findOneAndUpdate(
          { saleID: editSaleInput.saleID },
          { ...editSaleInput },
          {
            new: true,
            runValidators: true,
            populate: 'staff products customer',
          }
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
  deleteSale: async (
    saleID: string,
    warehouseID: string,
    { request, response, config }: IResolverContext
  ) => {
    return new Promise<ISaleDeletePayload>(async (resolve) => {
      try {
        await staffRoleAuthorization(
          request,
          response,
          config.get('jwt.private'),
          RolePrevileges.DELETE_SALE
        );

        if (warehouseID) {
          await saleModel.findOneAndRemove({
            $and: [{ saleID }, { warehouseID }],
          });
        } else {
          await saleModel.findOneAndRemove({ saleID });
        }
        resolve({
          deleted: true,
          error: null,
        });
      } catch (error) {
        resolve({
          deleted: false,
          error: `[INTERNAL ERROR]: ${error.message}`,
        }); // end resolve
      } // end catch
    }); // end promise
  }, // end deleteSale
};

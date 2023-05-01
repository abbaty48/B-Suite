import { saleModel } from '@server-databases/mongodb/schema_sale';
import { storeModel } from '@server-databases/mongodb/schema_store';
import { staffModel } from '@server-databases/mongodb/schema_staff';
import { productModel } from '@server-databases/mongodb/schema_product';
import { customerModel } from '@server-databases/mongodb/schema_customer';
import { warehouseModel } from '@server-databases/mongodb/schema_warehouse';
import {
  Store,
  Enterprise,
  InitPayload,
  EnterpriseAddInput,
  EnterpriseAddPayload,
  EnterpriseEditPayload,
} from '@server-models/@types/resolver_types';

interface IStorePayload<T> {
  error: string | null;
  result: T;
}

type Action =
  | 'getTotalSales'
  | 'getTotalStaffs'
  | 'getTotalProducts'
  | 'getTotalCustomers'
  | 'getTotalWarehouses'
  | 'getTotalExpiredProducts';

const payload = async (action: Action) => {
  return new Promise<IStorePayload<number>>(async (resolve) => {
    try {
      //
      let result = null;
      switch (action) {
        // GET_TOTAL_SALES
        case 'getTotalSales':
          result = await saleModel.count();
          break;
        // GET_TOTAL_STAFFS
        case 'getTotalStaffs':
          result = await staffModel.count();
          break;
        // GET_TOTAL_PRODUCTS
        case 'getTotalProducts':
          result = await productModel.count();
          break;
        // GET_TOTAL_CUSTOMERS
        case 'getTotalCustomers':
          result = await customerModel.count();
          break;
        // GET_TOTAL_WAREHOUSE
        case 'getTotalWarehouses':
          result = await warehouseModel.count();
          break;
        // GETTOTAL_EXPIRED_PRODUCTS
        case 'getTotalExpiredProducts':
          result = await productModel.count({ expired: true });
          break;
      } // end switch
      // RESOLVE
      resolve({
        result,
        error: null,
      });
    } catch (error) {
      resolve({
        error,
        result: null,
      }); // end resolve
    } // end catch
  }); // end promise
}; // end totalSales

export class StoreController {
  // STORE
  static store = async () => {
    return new Promise<Store>(async (resolve) => {
      resolve({
        // TOTAL SALES
        totalSales: await payload('getTotalSales'),
        // TOTAL STAFFS
        totalStaffs: await payload('getTotalStaffs'),
        // TOTAL PRODUCTS
        totalProducts: await payload('getTotalProducts'),
        // TOTAL CUSTOMERS
        totalCustomers: await payload('getTotalCustomers'),
        // TOTAL WAREHOUSES
        totalWarehouses: await payload('getTotalWarehouses'),
        // TOTAL EXPIRED PRODUCTS
        totalExpiredProducts: await payload('getTotalExpiredProducts'),
        // ENTERPRISE INITIALIZED
        _enterpriseInitialized:
          (await storeModel.find({}))[0]?._enterpriseInitialized ?? false,
        // SYSTEM INITIALIZED
        _sysInitialized:
          (await storeModel.find({}))[0]?._sysInitialized ?? false,
        // ENTERPRISE
        enterPrise: await new Promise<IStorePayload<Enterprise>>(
          async (resolve) => {
            try {
              const _enterPrice =
                ((await storeModel.findOne())?.enterPrise
                  ._doc as unknown as Enterprise) ?? null;

              resolve({
                error: null,
                result: _enterPrice
                  ? {
                      // ...(await storeModel.findOne()).enterPrise._doc,
                      ..._enterPrice,
                      staffs: await staffModel.find(),
                      products: await productModel.find(),
                      customers: await customerModel.find(),
                      warehouses: await warehouseModel.find(),
                    }
                  : null,
              });
            } catch (error) {
              resolve({
                result: null,
                error: `[EXCEPTION]: ${error.message}`,
              }); // end resolve
            } // end catch
          } // end promise
        ), // end enterPrise
      }); // end resolve
    }); // end promise
  }; // end store
  static addEnterprise = async (addEnterpriseInput: EnterpriseAddInput) => {
    return new Promise<EnterpriseAddPayload>(
      async (resolve) => {
        try {
          // check if alreay initialized or not
          if (await storeModel.findOne({ _enterpriseInitialized: true })) {
            return resolve({
              added: false,
              newAdded: null,
              error: `[ACTION DENIED]: it looks like you've alreay set up your enterprise informations, only one enterprise is allowed.`,
            });
          }
          //
          const newAdded = await storeModel.create({
            _enterpriseInitialized: true,
            enterPrise: {
              ...addEnterpriseInput,
            },
          });
          //
          resolve({
            error: null,
            added: true,
            newAdded: {
              ...newAdded.enterPrise._doc,
              staffs: [],
              products: [],
              customers: [],
              warehouses: [],
            },
          });
        } catch (error) {
          resolve({
            error: `[EXCEPTION]: ${error.message}`,
            added: false,
            newAdded: null,
          });
        } // end catch
      } // end resolve
    ); // end promise
  }; // end addEnterprise
  static editEnterprise = async (editEnterpriseInput: any) => {
    return new Promise<EnterpriseEditPayload>(async (resolve) => {
      try {
        //
        const _mixed = Object.assign(
          { ...(await storeModel.findOne()).enterPrise._doc },
          { ...editEnterpriseInput }
        );
        const enterprise = (
          await storeModel.findOneAndUpdate(
            {},
            { $set: { enterPrise: { ..._mixed } } },
            { new: true }
          )
        ).enterPrise;

        resolve({
          error: null,
          edited: true,
          newEdited: {
            ...enterprise._doc,
            staffs: await staffModel.find(),
            products: await productModel.find(),
            customers: await customerModel.find(),
            warehouses: await warehouseModel.find(),
          }, // end endEdited
        }); // end resolve
      } catch (error) {
        resolve({
          edited: false,
          newEdited: null,
          error: `[EXCEPTION]: ${error.message}`,
        }); // end resolve
      } // end catch
    }); // end promise
  }; // end editEnterprise
  static _initializeSys = async (_init: boolean) => {
    return new Promise<InitPayload>(async (resolve) => {
      try {
        // FIND_AND_UPDATE
        await storeModel.findOneAndUpdate(
          {},
          { $set: { _sysInitialized: _init } }
        );
        // RESOLVE
        resolve({
          error: null,
          _initialized: _init,
        });
      } catch (error) {
        resolve({
          _initialized: false,
          error: `[EXCEPTION]: ${error.message}`,
        }); // end resolve
      } // end catch
    }); // end Promise
  }; // end _initializeSys
} // end StoreResolver

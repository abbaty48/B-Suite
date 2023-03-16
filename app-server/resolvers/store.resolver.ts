import { saleModel } from '@server-databases/mongodb/schema_sale';
import { storeModel } from '@server-databases/mongodb/schema_store';
import { staffModel } from '@server-databases/mongodb/schema_staff';
import { productModel } from '@server-databases/mongodb/schema_product';
import { customerModel } from '@server-databases/mongodb/schema_customer';
import { warehouseModel } from '@server-databases/mongodb/schema_warehouse';
import { IEnterprise } from '@server-databases/mongodb/interfaces/IEnterprise';
import { RolePrevileges } from '@server-databases/mongodb/enums/RolePrevilage';
import staffRoleAuthorization from '@server-commons/auths/authorizationMiddleware';
import { IResolverContext } from '@server-commons/models/interfaces/IResolverContext';

interface IStore {
  totalSales: IStorePayload<number>;
  totalStaffs: IStorePayload<number>;
  totalProducts: IStorePayload<number>;
  totalCustomers: IStorePayload<number>;
  totalWarehouses: IStorePayload<number>;
  totalExpiredProducts: IStorePayload<number>;
  enterPrise: IStorePayload<IEnterprise>;
}

interface IStorePayload<T> {
  error: string | null;
  result: T;
}
interface IStoreAddPayload {
  error: string | null;
  added: boolean;
  newAdded: IEnterprise | null;
}
interface IStoreEditPayload {
  error: string | null;
  edited: boolean;
  newEdited: IEnterprise | null;
}

type Action =
  | 'getTotalSales'
  | 'getTotalStaffs'
  | 'getTotalProducts'
  | 'getTotalCustomers'
  | 'getTotalWarehouses'
  | 'getTotalExpiredProducts';

const payload = async (
  action: Action,
  previlege: RolePrevileges,
  { request, response, config }: IResolverContext
) => {
  return new Promise<IStorePayload<number>>(async (resolve) => {
    try {
      //Authenticate and Authorize the user
      await staffRoleAuthorization(
        request,
        response,
        config.get('jwt.private'),
        previlege
      );
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

export const StoreResolver = {
  // STORE
  store: async (context: IResolverContext) => {
    return new Promise<IStore>(async (resolve) => {
      resolve({
        // TOTAL SALES
        totalSales: await payload(
          'getTotalSales',
          RolePrevileges.READ_SALE,
          context
        ),
        // TOTAL STAFFS
        totalStaffs: await payload(
          'getTotalStaffs',
          RolePrevileges.READ_STAFF,
          context
        ),
        // TOTAL PRODUCTS
        totalProducts: await payload(
          'getTotalProducts',
          RolePrevileges.READ_PRODUCT,
          context
        ),
        // TOTAL CUSTOMERS
        totalCustomers: await payload(
          'getTotalCustomers',
          RolePrevileges.READ_CUSTOMER,
          context
        ),
        // TOTAL WAREHOUSES
        totalWarehouses: await payload(
          'getTotalWarehouses',
          RolePrevileges.READ_WAREHOUSE,
          context
        ),
        // TOTAL EXPIRED PRODUCTS
        totalExpiredProducts: await payload(
          'getTotalExpiredProducts',
          RolePrevileges.READ_PRODUCT,
          context
        ),
        // ENTERPRISE
        enterPrise: await new Promise<IStorePayload<IEnterprise>>(
          async (resolve) => {
            try {
              resolve({
                error: null,
                result: {
                  ...(await storeModel.findOne()).enterPrise._doc,
                  staffs: await staffModel.find(),
                  products: await productModel.find(),
                  customers: await customerModel.find(),
                  warehouses: await warehouseModel.find(),
                },
              });
            } catch (error) {
              resolve({
                error,
                result: null,
              }); // end resolve
            } // end catch
          } // end promise
        ), // end enterPrise
      }); // end resolve
    }); // end promise
  }, // end store
  addEnterprise: async (
    addEnterpriseInput: any,
    { request, response, config }: IResolverContext
  ) => {
    return new Promise<IStoreAddPayload>(
      async (resolve) => {
        try {
          //Authenticate and Authorize the user
          await staffRoleAuthorization(
            request,
            response,
            config.get('jwt.private'),
            RolePrevileges.ADD_ENTERPRISE
          );
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
            error,
            added: false,
            newAdded: null,
          });
        } // end catch
      } // end resolve
    ); // end promise
  }, // end addEnterprise
  editEnterprise: async (
    editEnterpriseInput: any,
    { request, response, config }: IResolverContext
  ) => {
    return new Promise<IStoreEditPayload>(async (resolve) => {
      try {
        //Authenticate and Authorize the user
        await staffRoleAuthorization(
          request,
          response,
          config.get('jwt.private'),
          RolePrevileges.UPDATE_ENTERPRISE
        );
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
          error,
          edited: false,
          newEdited: null,
        }); // end resolve
      } // end catch
    }); // end promise
  }, // end editEnterprise
  _initializeSys: async (
    _init: boolean,
    { request, response, config }: IResolverContext
  ) => {
    return new Promise(async (resolve) => {
      try {
        //Authenticate and Authorize the user
        await staffRoleAuthorization(
          request,
          response,
          config.get('jwt.private'),
          RolePrevileges.INITIALIZED_SYSTEM
        );
        // FIND_AND_UPDATE
        await storeModel.findOneAndUpdate(
          {},
          { $set: { _sysInitialized: _init } }
        );
        // RESOLVE
        resolve({
          error: null,
          _initialized: true,
        });
      } catch (error) {
        resolve({
          error,
          _initialized: false,
        }); // end resolve
      } // end catch
    }); // end Promise
  }, // end _initializeSys
}; // end StoreResolver

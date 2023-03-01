import { CallbackError } from 'mongoose';
import { staffModel } from '@server-databases/mongodb/schema_staff';
import { mongodbService } from '@server-datasources/index.datasources';
import { productModel } from '@server-databases/mongodb/schema_product';
import { warehouseModel } from '@server-databases/mongodb/schema_warehouse';
import { RolePrevileges } from '@server-databases/mongodb/enums/RolePrevilage';
import staffRoleAuthorization from '@server-commons/auths/authorizationMiddleware';

import { IStaff } from '@server-databases/mongodb/interfaces/IStaff';
import { IProduct } from '@server-databases/mongodb/interfaces/IProduct';
import {
  IWarehouse,
  IWarehouseAddPayload,
  IWarehouseDeletePayload,
  IWarehouseEditPayload,
} from '@server-databases/mongodb/interfaces/IWarehouse';
import { IResolverContext } from '@server-commons/models/interfaces/IResolverContext';

mongodbService();

export const WarehouseResolver = {
  warehouses: async ({
    request,
    response,
    config,
  }: IResolverContext): Promise<IWarehouse[]> => {
    // Apply Authorization Role
    await staffRoleAuthorization(
      request,
      response,
      config,
      RolePrevileges.READ_WAREHOUSE
    );
    return await warehouseModel.find<IWarehouse>();
  },
  addWarehouse: async (
    inputs: {
      warehouseID: string;
      address: string;
      staffs?: IStaff[];
      products?: IProduct[];
    },
    { request, response, config }: IResolverContext
  ) => {
    return new Promise<IWarehouseAddPayload>(async (resolve) => {
      const { warehouseID, address, products, staffs } = inputs;

      try {
        if (await warehouseModel.exists({ address })) {
          return resolve({
            error: `A warehouse with the same address "${address}" already exist, please provide a new one.`,
            added: false,
            newAdded: null,
          });
        } // end if-exists

        // Apply Authorization Role
        await staffRoleAuthorization(
          request,
          response,
          config,
          RolePrevileges.READ_WAREHOUSE
        );
        warehouseModel.create(
          {
            warehouseID,
            address,
            staffs: staffs ?? [],
            products: products ?? [],
          },
          (error: CallbackError, result: IWarehouse) => {
            if (error) {
              return resolve({
                error: 'Error adding a new warehouse, REASON: ' + error.message,
                added: false,
                newAdded: null,
              });
            }
            resolve({
              error: null,
              added: true,
              newAdded: result,
            });
          }
        );
      } catch (error) {
        resolve({
          error: error.message,
          added: false,
          newAdded: null,
        });
      } // end catch
    }); // end promise
  }, // end addCategory
  editWarehouse: async (
    inputs: {
      warehouseID: string;
      address?: string;
      staffs?: IStaff[];
      products?: IProduct[];
    },
    { request, response, config }: IResolverContext
  ) => {
    return new Promise<IWarehouseEditPayload>(async (resolve) => {
      const { warehouseID, address, products, staffs } = inputs;
      if (await warehouseModel.exists({ address })) {
        return resolve({
          edited: false,
          error: `A warehouse with the same "${address}" already exist, please provide a new one.`,
        });
      } // end if-exists

      // Apply Authorization Role
      await staffRoleAuthorization(
        request,
        response,
        config,
        RolePrevileges.UPDATE_WAREHOUSE
      );

      warehouseModel.findOneAndUpdate(
        { warehouseID },
        { $set: { address, staffs, products } },
        async (error: CallbackError, updatedCategory: IWarehouse) => {
          // if error
          if (error) {
            return resolve({
              edited: false,
              error: error.message,
            });
          } // end error

          resolve({
            edited: true,
            error: null,
          }); // end resolve
        } // end callback
      ); // end findOneAndUpdate
    }); // end Promise
  }, // end editCategory
  deleteWarehouse: async (
    warehouseID: string,
    { request, response, config }: IResolverContext
  ) => {
    return new Promise<IWarehouseDeletePayload>(async (resolve) => {
      // Apply Authorization Role
      await staffRoleAuthorization(
        request,
        response,
        config,
        RolePrevileges.DELETE_WAREHOUSE
      );

      warehouseModel.findOneAndRemove(
        { warehouseID },
        async (error: CallbackError, deletedCategory: IWarehouse) => {
          if (error) {
            return resolve({ deleted: false, error: error.message });
          } // end if

          try {
            // Delete all products under the warehouse
            await productModel.deleteMany({ warehouseID });
            // Delete all staffs under the warehouse
            await staffModel.deleteMany({ warehouseID });
            resolve({ deleted: true, error: null });
          } catch (error) {
            resolve({ error: error.message, deleted: false });
          } // end catch
        } // end  callback
      ); // end findOneAndRemove
    }); // end Promise
  }, // end deleteCategory
}; // end CategoryResolver

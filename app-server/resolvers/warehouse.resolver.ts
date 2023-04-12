import { CallbackError } from 'mongoose';
import { escapeRegExp, genRandom } from '@server-commons/helpers';
import { staffModel } from '@server-databases/mongodb/schema_staff';
import { productModel } from '@server-databases/mongodb/schema_product';
import { warehouseModel } from '@server-databases/mongodb/schema_warehouse';
import { RolePrevileges } from '@server-databases/mongodb/enums/RolePrevilage';
import staffRoleAuthorization from '@server-commons/auths/authorizationMiddleware';

import {
  IWarehouse,
  IWarehousePayload,
  IWarehousesPayload,
  IWarehouseAddPayload,
  IWarehouseEditPayload,
  IWarehouseDeletePayload,
} from '@server-databases/mongodb/interfaces/IWarehouse';
import { IPagin, Pagin } from '@/src/databases/mongodb/interfaces/IPagin';
import { IResolverContext } from '@server-commons/models/interfaces/IResolverContext';

export const WarehouseResolver = {
  warehouse: async (
    searchFilter: {
      name?: string;
      address?: string;
      warehouseID?: string;
    },
    { request, response, config }: IResolverContext
  ) => {
    return new Promise<IWarehousePayload>(async (resolve) => {
      try {
        // Apply Authorization Role
        await staffRoleAuthorization(
          request,
          response,
          config.get('jwt.private'),
          RolePrevileges.READ_WAREHOUSE
        );
        const { warehouseID, name, address } = searchFilter;
        // FINDS WAREHOUSES
        const warehouse = await warehouseModel.findOne(
          {
            $or: [
              warehouseID ? { warehouseID: { $eq: warehouseID } } : {},
              name
                ? { name: { $regex: escapeRegExp(name), $options: 'si' } }
                : {},
              address
                ? { address: { $regex: escapeRegExp(address), $options: 'si' } }
                : {},
            ],
          },
          {},
          { populate: 'staffs products' }
        );
        // console.log('WAREHOUSE: ', warehouse);
        // RESOLVE
        resolve({
          error: null,
          warehouse,
        }); // end resolve
      } catch (error) {
        resolve({
          error: `[EXCEPTION]: ${error.message}`,
          warehouse: null,
        }); // end resolve
      } // end catch
    }); // end promise
  }, // end houses
  warehouses: async (
    searchFilter: {
      name?: string;
      address?: string;
      warehouseID?: string;
    },
    pagin: IPagin,
    { request, response, config }: IResolverContext
  ) => {
    return new Promise<IWarehousesPayload>(async (resolve) => {
      try {
        // Apply Authorization Role
        await staffRoleAuthorization(
          request,
          response,
          config.get('jwt.private'),
          RolePrevileges.READ_WAREHOUSE
        );
        // SEARCHFILTER
        const { warehouseID, name, address } = searchFilter ?? {};
        // FILTERS
        const sort = pagin?.sort ?? Pagin.sort,
          limit = pagin?.limit ?? Pagin.limit,
          pageIndex = pagin?.pageIndex ?? Pagin.pageIndex;
        // FINDS WAREHOUSES
        const warehouses = await warehouseModel.find(
          {
            $or: [
              warehouseID ? { warehouseID: { $eq: warehouseID } } : {},
              name
                ? { name: { $regex: escapeRegExp(name), $options: 'si' } }
                : {},
              address
                ? {
                    address: {
                      $regex: escapeRegExp(address),
                      $options: 'si',
                    },
                  }
                : {},
            ],
          },
          {},
          {
            sort: { name: sort },
            skip: pageIndex * limit,
            limit,
            populate: 'staffs products',
          }
        );
        // RESOLVE
        resolve({
          error: null,
          warehouses,
        }); // end resolve
      } catch (error) {
        resolve({
          warehouses: [],
          error: `[EXCEPTION]: ${error.message}`,
        }); // end resolve
      } // end catch
    }); // end promise
  }, // end houses
  addWarehouse: async (
    addWarehouseInput: {
      name: string;
      address: string;
      staffIDs?: string[];
      productIDs?: string[];
    },
    { request, response, config }: IResolverContext
  ) => {
    return new Promise<IWarehouseAddPayload>(async (resolve) => {
      try {
        // Apply Authorization Role
        await staffRoleAuthorization(
          request,
          response,
          config.get('jwt.private'),
          RolePrevileges.ADD_WAREHOUSE
        );
        //
        const warehouseID = `WID${genRandom().toUpperCase()}`;
        const newAdded = await warehouseModel.create({
          ...addWarehouseInput,
          warehouseID,
        }); // end create
        resolve({
          error: null,
          added: true,
          newAdded: await newAdded.populate('staffs products'),
        }); // end resolve
      } catch (error) {
        resolve({
          error: `[EXCEPTION]: ${error.message}`,
          added: false,
          newAdded: null,
        }); // end resolve
      } // end catch
    }); // end promise
  }, // end addCategory
  editWarehouse: async (
    editWarehouseInput: {
      warehouseID: string;
      name?: string;
      address?: string;
      staffIDs?: string[];
      productIDs?: string[];
    },
    { request, response, config }: IResolverContext
  ) => {
    return new Promise<IWarehouseEditPayload>(async (resolve) => {
      try {
        // Apply Authorization Role
        await staffRoleAuthorization(
          request,
          response,
          config.get('jwt.private'),
          RolePrevileges.UPDATE_WAREHOUSE
        );

        const newEdited = await warehouseModel.findOneAndUpdate(
          { warehouseID: editWarehouseInput.warehouseID },
          { $set: { ...editWarehouseInput } },
          {
            new: true,
            context: 'query',
            runValidators: true,
            populate: 'staffs products',
          }
        ); // end findOneAndUpdate
        resolve({
          error: null,
          newEdited,
          edited: newEdited ? true : false,
        }); // end resolve
      } catch (error) {
        resolve({
          edited: true,
          newEdited: null,
          error: `[EXCEPTION]: ${error.message}`,
        }); // end resolve
      }
    }); // end Promise
  }, // end editCategory
  deleteWarehouse: async (
    warehouseID: string,
    { request, response, config }: IResolverContext
  ) => {
    return new Promise<IWarehouseDeletePayload>(async (resolve) => {
      try {
        // Apply Authorization Role
        await staffRoleAuthorization(
          request,
          response,
          config.get('jwt.private'),
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
              resolve({
                error: `[EXCEPTION] : ${error.message}`,
                deleted: false,
              }); // end resolve
            } // end catch
          } // end  callback
        ); // end findOneAndRemove
      } catch (error) {
        resolve({
          deleted: false,
          error: `[EXCEPTION]: ${error.message}`,
        }); // end resolve
      } // end catch
    }); // end Promise
  }, // end deleteCategory
}; // end CategoryResolver

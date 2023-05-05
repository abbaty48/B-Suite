import { staffModel } from '@server-databases/mongodb/schema_staff';
import {
  escapeRegExp,
  genRandom,
  setRealTimeSubscription,
} from '@server-commons/commons.helpers';
import { productModel } from '@server-databases/mongodb/schema_product';
import { warehouseModel } from '@server-databases/mongodb/schema_warehouse';
import {
  Warehouse,
  PaginInput,
  WarehousePayload,
  WarehousesPayload,
  WarehouseAddInput,
  WarehouseEditInput,
  WarehouseAddPayload,
  WarehouseSearchInput,
  WarehouseEditPayload,
  WarehouseDeletePayload,
  SubscriptionActionType,
} from '@server-models/@types/resolver_types';
import { Pagin } from '@server-models/databases/mongodb/interfaces/IPagin';
import { IResolverContext } from '@server-models/interfaces/IResolverContext';

export class WarehouseController {
  static warehouse = async (searchFilter: WarehouseSearchInput) => {
    return new Promise<WarehousePayload>(async (resolve) => {
      try {
        const { warehouseID, name, address } = searchFilter;
        // CRITERIA
        const criteria = warehouseID
          ? { warehouseID: { $eq: warehouseID } }
          : name
          ? { name: { $regex: escapeRegExp(name), $options: 'si' } }
          : address
          ? { address: { $regex: escapeRegExp(address), $options: 'si' } }
          : {};
        // FINDS WAREHOUSES
        const warehouse = (await warehouseModel.findOne(
          {
            $or: [criteria],
          },
          {},
          { populate: 'staffs products' }
        )) as Warehouse;
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
  }; // end houses
  static warehouses = async (
    searchTerm: WarehouseSearchInput,
    pagin: PaginInput
  ) => {
    return new Promise<WarehousesPayload>(async (resolve) => {
      try {
        // SEARCHFILTER
        const { warehouseID, name, address } = searchTerm ?? {};
        // FILTERS
        const sort = pagin?.sort ?? Pagin.sort,
          limit = pagin?.limit ?? Pagin.limit,
          pageIndex = pagin?.pageIndex ?? Pagin.pageIndex;
        // CRITERIA
        const criteria = warehouseID
          ? { warehouseID: { $eq: warehouseID } }
          : name
          ? { name: { $regex: escapeRegExp(name), $options: 'si' } }
          : address
          ? {
              address: {
                $regex: escapeRegExp(address),
                $options: 'si',
              },
            }
          : {};
        // FINDS WAREHOUSES
        const warehouses = (await warehouseModel.find<Warehouse>(
          {
            $or: [criteria],
          },
          {},
          {
            sort: { name: sort },
            skip: pageIndex * limit,
            limit,
            populate: 'staffs products',
          }
        )) as Warehouse[];
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
  }; // end houses
  static addWarehouse = async (
    addWarehouseInput: WarehouseAddInput,
    { pubSub, authenticatedStaff }: IResolverContext
  ) => {
    return new Promise<WarehouseAddPayload>(async (resolve) => {
      try {
        //
        const warehouseID = `WID${genRandom().toUpperCase()}`;
        const _newAdded = await warehouseModel.create({
          ...addWarehouseInput,
          warehouseID,
        }); // end create
        // POPULATE
        const newAdded = (await _newAdded.populate(
          'staffs products'
        )) as Warehouse;
        /** PUBLISH SUBSCRIPTION FOR LISTEN_ADD_WAREHOUSE */
        pubSub.publish('LISTEN_ADD_WAREHOUSE', {
          warehouseAddSubscription: {
            error: null,
            payload: {
              timestamp: new Date(),
              actionResult: newAdded,
              actionBy: authenticatedStaff,
              actionType: SubscriptionActionType.Added,
            },
          },
        }); // end publish
        setRealTimeSubscription(
          pubSub,
          'LISTEN_REALTIME_STORE',
          'totalWarehouses',
          await warehouseModel.count()
        );
        resolve({
          error: null,
          added: true,
          newAdded,
        }); // end resolve
      } catch (error) {
        resolve({
          error: `[EXCEPTION]: ${error.message}`,
          added: false,
          newAdded: null,
        }); // end resolve
      } // end catch
    }); // end promise
  }; // end addCategory
  static editWarehouse = async (
    editWarehouseInput: WarehouseEditInput,
    { pubSub, authenticatedStaff }: IResolverContext
  ) => {
    return new Promise<WarehouseEditPayload>(async (resolve) => {
      try {
        const newEdited = (await warehouseModel.findOneAndUpdate(
          { warehouseID: editWarehouseInput.warehouseID },
          { $set: { ...editWarehouseInput } },
          {
            new: true,
            context: 'query',
            runValidators: true,
            populate: 'staffs products',
          }
        )) as Warehouse; // end findOneAndUpdate

        /** PUBLISH SUBSCRIPTION FOR LISTEN_EDIT_WAREHOUSE */
        pubSub.publish('LISTEN_EDIT_WAREHOUSE', {
          warehouseEditSubscription: {
            error: null,
            payload: {
              timestamp: new Date(),
              actionResult: newEdited,
              actionBy: authenticatedStaff,
              actionType: SubscriptionActionType.Edited,
            },
          },
        }); // end publish
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
  }; // end editCategory
  static deleteWarehouse = async (
    warehouseID: string,
    { pubSub, authenticatedStaff }: IResolverContext
  ) => {
    return new Promise<WarehouseDeletePayload>(async (resolve) => {
      try {
        const deletedWarehouse = (await warehouseModel.findOneAndRemove({
          warehouseID,
        })) as Warehouse; // end findOneAndRemove
        // Delete all products under the warehouse
        await productModel.deleteMany({ warehouseID });
        // Delete all staffs under the warehouse
        await staffModel.deleteMany({ warehouseID });
        /** PUBLISH SUBSCRIPTION FOR LISTEN_ADD_CATEGORY */
        pubSub.publish('LISTEN_DELETE_WAREHOUSE', {
          warehouseDeleteSubscription: {
            error: null,
            payload: {
              timestamp: new Date(),
              actionBy: authenticatedStaff,
              actionResult: deletedWarehouse,
              actionType: SubscriptionActionType.Deleted,
            },
          }, // warehouseDeleteSusbscription
        }); // end publish
        setRealTimeSubscription(
          pubSub,
          'LISTEN_REALTIME_STORE',
          'totalWarehouses',
          await warehouseModel.count()
        );
        resolve({ deleted: true, error: null });
      } catch (error) {
        resolve({
          deleted: false,
          error: `[EXCEPTION]: ${error.message}`,
        }); // end resolve
      } // end catch
    }); // end Promise
  }; // end deleteCategory
} // end CategoryResolver

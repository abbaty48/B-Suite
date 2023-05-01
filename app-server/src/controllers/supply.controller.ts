import { genRandom } from '@server-commons/commons.helpers';
import { Pagin } from '@server-databases/mongodb/interfaces/IPagin';
import { supplyModel } from '@server-databases/mongodb/schema_supply';
import { productModel } from '@server-databases/mongodb/schema_product';
import { IResolverContext } from '@server-models/interfaces/IResolverContext';
import {
  Supply,
  PaginInput,
  SupplyPayload,
  SupplyAddInput,
  SupplysPayload,
  SupplyEditInput,
  SupplyAddPayload,
  SearchSupplyInput,
  SupplyEditPayload,
  SupplyDeleteInput,
  SupplyDeletePayload,
  SubscriptionActionType,
} from '@server-models/@types/resolver_types';

export class SupplyController {
  static supply = async (searchTerm: SearchSupplyInput) => {
    return new Promise<SupplyPayload>(async (resolve) => {
      try {
        // SEARCHTERMS
        const { supplyID, staffID, date, time } = searchTerm;
        // CRITERIA
        const criteria = supplyID
          ? { supplyID: { $eq: supplyID } }
          : staffID
          ? { staffID: { $eq: staffID } }
          : date
          ? { date: { $regex: date, $options: 'si' } }
          : time
          ? { date: { $regex: time, $options: 'si' } }
          : {};

        //
        const supply = await supplyModel.findOne<Supply>(
          {
            $or: [criteria],
          },
          {},
          { populate: 'staff products' }
        );
        resolve({
          error: null,
          supply,
        });
      } catch (error) {
        resolve({
          supply: null,
          error: `[EXCEPTION]: ${error.message}`,
        }); // end resolve
      } // end catch
    }); // end promise
  }; // end supply
  static supplies = async (
    searchTerm: SearchSupplyInput,
    pagin: PaginInput
  ) => {
    return new Promise<SupplysPayload>(async (resolve) => {
      try {
        //
        const { supplyID, staffID, date, time } = searchTerm ?? {};
        // PAGINATE THE PRODUCTS
        const sort = pagin?.sort ?? Pagin.sort,
          limit = pagin?.limit ?? Pagin.limit,
          pageIndex = pagin?.pageIndex ?? Pagin.pageIndex;
        // CRITERIA
        const criteria = supplyID
          ? { supplyID: { $eq: supplyID } }
          : staffID
          ? { staffID: { $eq: staffID } }
          : date
          ? { date: { $regex: date, $options: 'si' } }
          : time
          ? { date: { $regex: time, $options: 'si' } }
          : {};
        console.log('CRITERIA: ', criteria);
        //
        const supplies = await supplyModel.find<Supply>(
          {
            $or: [criteria],
          },
          {},
          {
            sort: { date: sort },
            skip: limit * pageIndex,
            limit,
            populate: 'staff products',
          } // end options
        );
        resolve({
          error: null,
          supplies,
          pagins: {
            sort,
            currentPageIndex: pageIndex,
            nextPageIndex: pageIndex + 1,
            totalPaginated: supplies.length,
            totalDocuments: await supplyModel.count(),
          },
        }); // end resolve
      } catch (error) {
        resolve({
          supplies: null,
          error: `[EXCEPTION]: ${error.message}`,
        }); // end resolve
      } // end catch
    }); // end promise
  }; // end supply
  static makeSupply = async (
    addSupplyInput: SupplyAddInput[],
    { pubSub, authenticatedStaff }: IResolverContext,
    warehouseID?: string
  ) => {
    return new Promise<SupplyAddPayload>(async (resolve) => {
      try {
        // get all product IDS
        const productIDs = addSupplyInput.map((p) => p.productID);
        // compute the total price
        const totalPrice = addSupplyInput.reduce(
          (total, p) => (total += p.retailPrice * p.quantity),
          0
        );
        // compute the total quantities
        const totalQuantity = addSupplyInput.reduce(
          (total, p) => (total += p.quantity),
          0
        );
        addSupplyInput.forEach(async (p) => {
          await productModel.findOneAndUpdate(
            { productID: p.productID },
            { $set: { ...p } }
          ); // findOneAndUpdate
        }); // foreEach
        //
        const _newAdded = await supplyModel.create({
          productIDs,
          totalPrice,
          totalQuantity,
          staffID: authenticatedStaff.staffID,
          supplyID: `SPID${genRandom().toUpperCase()}`,
          warehouseID: warehouseID ?? null,
        });
        const newAdded = (await _newAdded.populate('staff products')) as Supply;
        /** PUBLISH SUBSCRIPTION FOR LISTEN_ADD_SUPPLY */
        pubSub.publish('LISTEN_ADD_SUPPLY', {
          supplyAddSubscription: {
            error: null,
            payload: {
              timestamp: new Date(),
              actionResult: newAdded,
              actionBy: authenticatedStaff,
              actionType: SubscriptionActionType.Added,
            },
          },
        }); // end publish
        // resolve
        resolve({
          added: true,
          error: null,
          newAdded,
        });
      } catch (error) {
        resolve({
          added: false,
          newAdded: null,
          error: `[EXCEPTION]: ${error.message}`,
        }); // end resolve
      } // end catch
    }); // end promise
  };
  static editSupply = async (
    supplyID: string,
    editSupplyInput: SupplyEditInput[],
    { pubSub, authenticatedStaff }: IResolverContext,
    warehouseID?: string
  ) => {
    return new Promise<SupplyEditPayload>(async (resolve) => {
      try {
        // get all product IDS
        const productIDs = editSupplyInput.map((p) => p.productID);
        // compute the total price
        const totalPrice = editSupplyInput.reduce(
          (total, p) => (total += p.retailPrice * p.quantity),
          0
        );
        // compute the total quantities
        const totalQuantity = editSupplyInput.reduce(
          (total, p) => (total += p.quantity),
          0
        );
        editSupplyInput.forEach(async (p) => {
          await productModel.findOneAndUpdate(
            { productID: p.productID },
            { $set: { ...p } }
          ); // findOneAndUpdate
        }); // foreEach
        //
        const newEdited = (await supplyModel.findOneAndUpdate(
          warehouseID
            ? { $and: [{ supplyID }, { warehouseID }] }
            : { supplyID },
          {
            productIDs,
            totalPrice,
            totalQuantity,
          },
          { new: true, populate: 'staff warehouse products' }
        )) as Supply;
        /** PUBLISH SUBSCRIPTION FOR LISTEN_EDIT_SUPPLY */
        pubSub.publish('LISTEN_EDIT_SUPPLY', {
          supplyEditSubscription: {
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
          edited: true,
          error: null,
          newEdited,
        });
      } catch (error) {
        resolve({
          edited: false,
          newEdited: null,
          error: `[EXCEPTION]: ${error.message}`,
        }); // end resolve
      } // end catch
    }); // end promise
  };
  static deleteSupply = async (
    supplyDeleteInput: SupplyDeleteInput,
    { pubSub, authenticatedStaff }: IResolverContext
  ) => {
    return new Promise<SupplyDeletePayload>(async (resolve) => {
      try {
        const { supplyID, warehouseID } = supplyDeleteInput;
        //
        const _deletedSupply = await supplyModel.findOneAndRemove(
          warehouseID ? { $and: [{ supplyID }, { warehouseID }] } : { supplyID }
        );
        //
        const deletedSupply = (await _deletedSupply.populate(
          'staff warehouse products'
        )) as Supply;
        /** PUBLISH SUBSCRIPTION FOR LISTEN_DELETE_SUPPLY */
        pubSub.publish('LISTEN_DELETE_SUPPLY', {
          supplyDeleteSubscription: {
            error: null,
            payload: {
              timestamp: new Date(),
              actionResult: deletedSupply,
              actionBy: authenticatedStaff,
              actionType: SubscriptionActionType.Deleted,
            },
          },
        }); // end publish
        //
        resolve({
          error: null,
          deleted: true,
        });
      } catch (error) {
        resolve({
          deleted: false,
          error: `[EXCEPTION]: ${error.message}`,
        }); // end resolve
      } // end catch
    }); // end promise
  };
} // end SupplyResolver

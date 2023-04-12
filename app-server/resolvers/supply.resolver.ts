import {
  ISupplyPayload,
  ISupplysPayload,
  ISupplyAddPayload,
  ISupplyEditPayload,
  ISupplyDeletePayload,
  ISupply,
} from '@/src/databases/mongodb/interfaces/ISupply';
import { genRandom } from '@server-commons/helpers';
import { Pagin } from '@server-databases/mongodb/interfaces/IPagin';
import { supplyModel } from '@server-databases/mongodb/schema_supply';
import { productModel } from '@server-databases/mongodb/schema_product';
import { RolePrevileges } from '@server-databases/mongodb/enums/RolePrevilage';
import staffRoleAuthorization from '@server-commons/auths/authorizationMiddleware';
import { IResolverContext } from '@server-commons/models/interfaces/IResolverContext';
import { IProduct } from '../databases/mongodb/interfaces/IProduct';
import { CallbackError } from 'mongoose';

export const SupplyResolver = {
  supply: async (
    searchFilter: {
      date?: string;
      time?: string;
      staffID?: string;
      supplyID?: string;
    },
    { request, response, config }: IResolverContext
  ) => {
    return new Promise<ISupplyPayload>(async (resolve) => {
      try {
        //
        await staffRoleAuthorization(
          request,
          response,
          config.get('jwt.private'),
          RolePrevileges.READ_SUPPLY
        );
        //
        const { supplyID, staffID, date, time } = searchFilter;
        //
        const supply = await supplyModel.findOne<ISupply>(
          {
            $or: [
              supplyID ? { supplyID: { $eq: supplyID } } : {},
              staffID ? { staffID: { $eq: staffID } } : {},
              date ? { date: { $regex: date, $options: 'si' } } : {},
              time ? { date: { $regex: time, $options: 'si' } } : {},
            ],
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
  }, // end supply
  supplies: async (
    searchFilter: {
      date?: string;
      time?: string;
      staffID?: string;
      supplyID?: string;
    },
    pagin: any,
    { request, response, config }: IResolverContext
  ) => {
    return new Promise<ISupplysPayload>(async (resolve) => {
      try {
        //
        await staffRoleAuthorization(
          request,
          response,
          config.get('jwt.private'),
          RolePrevileges.READ_SUPPLY
        );
        //
        const { supplyID, staffID, date, time } = searchFilter;
        // PAGINATE THE PRODUCTS
        const sort = pagin?.sort ?? Pagin.sort,
          limit = pagin?.limit ?? Pagin.limit,
          pageIndex = pagin?.pageIndex ?? Pagin.pageIndex;
        //
        const supplies = await supplyModel.find<ISupply>(
          {
            $or: [
              supplyID ? { supplyID: { $eq: supplyID } } : {},
              staffID ? { staffID: { $eq: staffID } } : {},
              date ? { date: { $regex: date, $options: 'si' } } : {},
              time ? { date: { $regex: time, $options: 'si' } } : {},
            ],
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
  }, // end supply
  makeSupply: async (
    addSupplyInput: [
      {
        productID: string;
        quantity: number;
        retailPrice: number;
        wholesalePrice: number;
      }
    ],
    { request, response, config }: IResolverContext,
    warehouseID?: string
  ) => {
    return new Promise<ISupplyAddPayload>(async (resolve) => {
      try {
        //
        const _staff = await staffRoleAuthorization(
          request,
          response,
          config.get('jwt.private'),
          RolePrevileges.ADD_SUPPLY
        );
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
        const newAdded = await supplyModel.create({
          productIDs,
          totalPrice,
          totalQuantity,
          staffID: _staff.staffID,
          supplyID: `SPID${genRandom().toUpperCase()}`,
          warehouseID: warehouseID ?? null,
        });
        // resolve
        resolve({
          added: true,
          error: null,
          newAdded: await newAdded.populate('staff products'),
        });
      } catch (error) {
        resolve({
          added: false,
          newAdded: null,
          error: `[EXCEPTION]: ${error.message}`,
        }); // end resolve
      } // end catch
    }); // end promise
  },
  editSupply: async (
    supplyID: string,
    editSupplyInput: [
      {
        productID: string;
        quantity: number;
        retailPrice: number;
        wholesalePrice: number;
      }
    ],
    { request, response, config }: IResolverContext,
    warehouseID?: string
  ) => {
    return new Promise<ISupplyEditPayload>(async (resolve) => {
      try {
        //
        await staffRoleAuthorization(
          request,
          response,
          config.get('jwt.private'),
          RolePrevileges.UPDATE_SUPPLY
        );
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
        const newEdited = await supplyModel.findOneAndUpdate(
          warehouseID
            ? { $and: [{ supplyID }, { warehouseID }] }
            : { supplyID },
          {
            productIDs,
            totalPrice,
            totalQuantity,
          },
          { new: true, populate: 'staff warehouse products' }
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
          error: `[EXCEPTION]: ${error.message}`,
        }); // end resolve
      } // end catch
    }); // end promise
  },
  deleteSupply: async (
    supplyID: string,
    { request, response, config }: IResolverContext,
    warehouseID?: string
  ) => {
    return new Promise<ISupplyDeletePayload>(async (resolve) => {
      try {
        //
        await staffRoleAuthorization(
          request,
          response,
          config.get('jwt.private'),
          RolePrevileges.DELETE_SUPPLY
        );
        //
        await supplyModel.findOneAndRemove(
          warehouseID ? { $and: [{ supplyID }, { warehouseID }] } : { supplyID }
        );
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
  },
}; // end SupplyResolver

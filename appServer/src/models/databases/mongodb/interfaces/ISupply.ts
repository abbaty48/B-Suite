import { IStaff } from '@server-databases/mongodb/interfaces/IStaff';
import { IProduct } from '@server-databases/mongodb/interfaces/IProduct';
import { IWarehouse } from '@server-databases/mongodb/interfaces/IWarehouse';

/**
 * PURCHASE INTEFACE
 * - To manage store products
 */
export interface ISupplyPayload {
  error: string | null;
  supply: ISupply | null;
}

export interface ISupplysPayload {
  error: string | null;
  supplies: ISupply[] | null;
  pagins?: {
    sort: string;
    totalDocuments: number;
    totalPaginated: number;
    nextPageIndex: number;
    currentPageIndex: number;
  };
}

export interface ISupplyAddPayload {
  error: string | null;
  added: boolean;
  newAdded: ISupply;
}

export interface ISupplyEditPayload {
  error: string | null;
  edited: boolean;
  newEdited: ISupply;
}

export interface ISupplyDeletePayload {
  error: string | null;
  deleted: boolean;
}

export interface ISupply {
  _doc: ISupply;
  staffID: string;
  staff: IStaff;
  supplyID: string;
  products: IProduct[];
  productIDs: string[];
  date: string;
  totalPrice: number;
  totalQuantity: number;
  warehouseID: string;
  warehouse: IWarehouse;
}

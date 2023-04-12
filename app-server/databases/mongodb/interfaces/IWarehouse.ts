import { Document } from 'mongoose';
import { IStaff } from '@server-databases/mongodb/interfaces/IStaff';
import { IProduct } from '@server-databases/mongodb/interfaces/IProduct';

export interface IWarehousePayload {
  error: string | null;
  warehouse: IWarehouse | null;
}
export interface IWarehousesPayload {
  error: string | null;
  warehouses: IWarehouse[];
}

export interface IWarehouseAddPayload {
  error: string | null;
  added: boolean;
  newAdded: IWarehouse | null;
}

export interface IWarehouseEditPayload {
  error: string | null;
  edited: boolean;
  newEdited: IWarehouse;
}

export interface IWarehouseDeletePayload {
  error: string | null;
  deleted: boolean;
}
export interface IWarehouse extends Document {
  warehouseID: string;
  name: string;
  address: string;
  staffIDs: string[];
  productIDs: string[];
  staffs: IStaff[];
  products: IProduct[];
}

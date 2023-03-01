import { Types, Document } from 'mongoose';
import { IStaff } from '@server-databases/mongodb/interfaces/IStaff';
import { IProduct } from '@server-databases/mongodb/interfaces/IProduct';

export interface IWarehouseAddPayload {
  error: string | null;
  added: boolean;
  newAdded: IWarehouse | null;
}

export interface IWarehouseEditPayload {
  error: string | null;
  edited: boolean;
}

export interface IWarehouseDeletePayload {
  error: string | null;
  deleted: boolean;
}
export interface IWarehouse extends Document {
  warehouseID: string;
  name: string;
  address: string;
  staffs: Types.DocumentArray<IStaff>;
  products: Types.DocumentArray<IProduct>;
}

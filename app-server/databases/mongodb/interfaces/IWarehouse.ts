import { Types, Document, ObjectId } from 'mongoose';
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
  warehouseID: ObjectId;
  name: string;
  address: string;
  staffs: Types.DocumentArray<IStaff>;
  products: Types.DocumentArray<IProduct>;
}

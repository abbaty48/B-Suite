import { Document, Types } from 'mongoose';
import { IStaff } from '@server-databases/mongodb/interfaces/IStaff';
import { IProduct } from '@server-databases/mongodb/interfaces/IProduct';
import { ICustomer } from '@server-databases/mongodb/interfaces/ICustomer';
import { IWarehouse } from '@server-databases/mongodb/interfaces/IWarehouse';

export interface ISaleProduct extends IProduct {
  kind: string;
  quantity: number;
  subTotal: number;
}

export interface ISalePayload {
  error: string | null;
  sale: ISale;
}
export interface ISalesPayload {
  error: string | null;
  sales: ISale[];
  pagins: {
    currentPageIndex: number;
    nextPageIndex: number;
    totalDocuments: number;
    totalPaginated: number;
    sort: string;
  };
}

export interface ISaleAddPayload {
  error: string | null;
  added: boolean;
  newAdded: ISale | null;
}

export interface ISaleEditPayload {
  error: string | null;
  edited: boolean;
  newEdited: ISale | null;
}

export interface ISaleDeletePayload {
  error: string | null;
  deleted: boolean;
}
/**
 * @property saleID - represent a global unique id for each sale
 * @property date - represent the date of the sale e.g MM/DD/YYYY
 * @property time - represent the time of the sale
 * @property discount - represent a discount from the retailPrice given to the customer
 * @property profit - represent the total profit made from the sale
 * @property products - represent the products for the sale
 * @property totalPrice - represent the total amount price for all the products
 * @property paid - represent the amount paid for the sale leave a discount
 * @property balance - represent the balance from the totalPrice paid
 * @property staff - represent the staff that perform the sale
 * @property customer - represent the customer that make the sale
 * @property warehouse - represent the warehouse that the sale occured
 * @property staffID - repesent the ID of the staff that perform the sale
 * @property customerID - represent the ID of the customer that make the sale
 * @property productIDs - represent the IDs of the purchased products
 */
export interface ISale extends Document {
  saleID: string;
  staffID: string;
  customerID: string;
  warehouseID: Types.ObjectId;
  date: string;
  time: string;
  paid: number;
  discount: number;
  totalPrice: number;
  totalQuantity: number;
  profit: {
    percentage: number;
    status: string; // Gain/Lost
  };
  staff: IStaff;
  customer: ICustomer;
  warehouse: IWarehouse;
  products: Types.DocumentArray<ISaleProduct>;
  _doc: ISale;
}

export { IStaff };

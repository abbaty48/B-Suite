import { Document } from 'mongoose';
import { ISale } from '@server-databases/mongodb/interfaces/ISale';

export interface ICustomerPayload {
  error: string | null;
  customer: ICustomer;
}
export interface ICustomersPayload {
  error: string | null;
  customers: ICustomer[];
  filters: {
    currentPageIndex: number;
    nextPageIndex: number;
    totalDocuments: number;
    totalFilter: number;
    sort: string;
  };
}
export interface ICustomerAddPayload {
  error: string | null;
  added: boolean;
  newAdded: ICustomer | null;
}
export interface ICustomerEditPayload {
  error: string | null;
  edited: boolean;
  newEdited: ICustomer | null;
}
export interface ICustomerDeletePayload {
  error: string | null;
  deleted: boolean;
}
export interface ICustomer extends Document {
  customerID: string;
  warehouseID: string;
  name: string;
  email?: string;
  address?: string;
  balance?: number;
  phoneNumber?: string;
  beneficiary?: boolean;
  purchases: ISale[];
  saleIDs: string[];
  metas: {
    avatarURL: string;
    dateOfBirth: string;
    socialMedia: {
      facebook: string;
      twitter: string;
      instagram: string;
    };
  };
  _doc: ICustomer;
}

import { Document } from 'mongoose';

export interface ICategoryAddPayload {
  added: boolean;
  newAdded: string;
  error: string | null;
}

export interface ICategoryEditPayload {
  edited: boolean;
  oldValue: string;
  error: string | null;
  newValue: string | null;
}

export interface ICategoryDeletePayload {
  deleted: boolean;
  error: string | null;
}

export interface ICategory extends Document {
  name: string;
  _doc: ICategory;
}

import { Document } from 'mongoose';
import { IFeature } from '@server-databases/mongodb/interfaces/IFeature';
import { ICategory } from '@server-databases/mongodb/interfaces/ICategory';
import { IWarehouse } from '@server-databases/mongodb/interfaces/IWarehouse';

export interface IProductsPayload {
  error: string;
  products: IProduct[];
  pagins?: {
    sort: string;
    totalPaginated: number;
    totalDocuments: number;
    nextPageIndex: number;
    currentPageIndex: number;
  };
}

export interface IProduct extends Document {
  productID: string;
  name: string;
  inStock?: boolean;
  quantity: number;
  expired?: boolean;
  category: ICategory;
  expirationDate?: string;
  retailPrice: number;
  wholesalePrice: number;
  features?: IFeature[];
  description?: string;
  warehouses?: IWarehouse[];
  warehouseIDs?: string[];
  _doc: IProduct;
}

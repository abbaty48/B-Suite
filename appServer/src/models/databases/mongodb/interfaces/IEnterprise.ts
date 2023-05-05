import { IStaff } from '@server-databases/mongodb/interfaces/ISale';
import { IProduct } from '@server-databases/mongodb/interfaces/IProduct';
import { ICustomer } from '@server-databases/mongodb/interfaces/ICustomer';
import { IWarehouse } from '@server-databases/mongodb/interfaces/IWarehouse';

export interface ISocialAccounts {
  facebook: string;
  twitter: string;
  youtube: string;
  instagram: string;
}

export interface IEnterprise {
  _doc: IEnterprise;
  name: string;
  slogan: string;
  title: string;
  about: string;
  email: string;
  address: string;
  website: string;
  contacts: string[];
  staffs: IStaff[];
  products: IProduct[];
  customers: ICustomer[];
  warehouses: IWarehouse[];
  socialAccounts: ISocialAccounts;
  owners: [
    {
      name: string;
      email: string;
      about: string;
      picture: string;
      phoneNumber: string;
      website: string;
      socialAccounts: ISocialAccounts;
    }
  ];
}

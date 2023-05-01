import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { IResolverContext } from '../../models/interfaces/IResolverContext';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  Object: any;
};

export type AddWarehouseStaffPayload = {
  __typename?: 'AddWarehouseStaffPayload';
  added: Scalars['Boolean'];
  error?: Maybe<Scalars['String']>;
};

export type Category = {
  __typename?: 'Category';
  name: Scalars['String'];
};

export type CategoryAddPayload = {
  __typename?: 'CategoryAddPayload';
  added: Scalars['Boolean'];
  error?: Maybe<Scalars['String']>;
  newAdded?: Maybe<Scalars['String']>;
};

export type CategoryAddSubscription = ISubscription & {
  __typename?: 'CategoryAddSubscription';
  error?: Maybe<Error>;
  payload: SubscriptionPayload;
};

export type CategoryDeletePayload = {
  __typename?: 'CategoryDeletePayload';
  deleted: Scalars['Boolean'];
  error?: Maybe<Scalars['String']>;
};

export type CategoryDeleteSubscription = ISubscription & {
  __typename?: 'CategoryDeleteSubscription';
  error?: Maybe<Error>;
  payload: SubscriptionPayload;
};

export type CategoryEditPayload = {
  __typename?: 'CategoryEditPayload';
  edited: Scalars['Boolean'];
  error?: Maybe<Scalars['String']>;
  newValue?: Maybe<Scalars['String']>;
  oldValue: Scalars['String'];
};

export type CategoryEditSubscription = ISubscription & {
  __typename?: 'CategoryEditSubscription';
  error?: Maybe<Error>;
  payload: SubscriptionPayload;
};

export type CategoryPayload = {
  __typename?: 'CategoryPayload';
  categories: Array<Category>;
  error?: Maybe<Scalars['String']>;
  pagins?: Maybe<Pagins>;
};

export type Customer = {
  __typename?: 'Customer';
  address?: Maybe<Scalars['String']>;
  beneficiary?: Maybe<Scalars['Boolean']>;
  customerID: Scalars['ID'];
  email?: Maybe<Scalars['String']>;
  metas?: Maybe<CustomerMetaData>;
  name: Scalars['String'];
  phoneNumber?: Maybe<Scalars['String']>;
  purchases: Array<Sale>;
  warehouse?: Maybe<Warehouse>;
  warehouseID?: Maybe<Scalars['ID']>;
};

export type CustomerAddPayload = {
  __typename?: 'CustomerAddPayload';
  added?: Maybe<Scalars['Boolean']>;
  error?: Maybe<Scalars['String']>;
  newAdded?: Maybe<Customer>;
};

export type CustomerDeletePayload = {
  __typename?: 'CustomerDeletePayload';
  deleted: Scalars['Boolean'];
  error?: Maybe<Scalars['String']>;
};

export type CustomerEditPayload = {
  __typename?: 'CustomerEditPayload';
  edited?: Maybe<Scalars['Boolean']>;
  error?: Maybe<Scalars['String']>;
  newEdited?: Maybe<Customer>;
};

export type CustomerMetaData = {
  __typename?: 'CustomerMetaData';
  avatarURL?: Maybe<Scalars['String']>;
  dateOfBirth?: Maybe<Scalars['String']>;
  socialMedia?: Maybe<CustomerSocialMedia>;
};

export type CustomerPayload = {
  __typename?: 'CustomerPayload';
  customer?: Maybe<Customer>;
  error?: Maybe<Scalars['String']>;
};

export type CustomerSocialMedia = {
  __typename?: 'CustomerSocialMedia';
  facebook?: Maybe<Scalars['String']>;
  instagram?: Maybe<Scalars['String']>;
  twitter?: Maybe<Scalars['String']>;
};

export type CustomersPayload = {
  __typename?: 'CustomersPayload';
  customers: Array<Customer>;
  error?: Maybe<Scalars['String']>;
  pagins?: Maybe<Pagins>;
};

export type Enterprise = {
  __typename?: 'Enterprise';
  about?: Maybe<Scalars['String']>;
  address?: Maybe<Scalars['String']>;
  contacts: Array<Scalars['String']>;
  customers: Array<Customer>;
  email?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  owners: Array<EnterpriseOwner>;
  products: Array<Product>;
  slogan?: Maybe<Scalars['String']>;
  socialAccounts?: Maybe<EnterpriseSocialAccounts>;
  staffs: Array<Staff>;
  title?: Maybe<Scalars['String']>;
  warehouses: Array<Warehouse>;
  website?: Maybe<Scalars['String']>;
};

export type EnterpriseAddPayload = {
  __typename?: 'EnterpriseAddPayload';
  added: Scalars['Boolean'];
  error?: Maybe<Scalars['String']>;
  newAdded?: Maybe<Enterprise>;
};

export type EnterpriseEditPayload = {
  __typename?: 'EnterpriseEditPayload';
  edited: Scalars['Boolean'];
  error?: Maybe<Scalars['String']>;
  newEdited?: Maybe<Enterprise>;
};

export type EnterpriseOwner = {
  __typename?: 'EnterpriseOwner';
  about?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  phoneNumber?: Maybe<Scalars['String']>;
  picture?: Maybe<Scalars['String']>;
  socialAccounts?: Maybe<EnterpriseSocialAccounts>;
  website?: Maybe<Scalars['String']>;
};

export type EnterpriseSocialAccounts = {
  __typename?: 'EnterpriseSocialAccounts';
  facebook?: Maybe<Scalars['String']>;
  instagram?: Maybe<Scalars['String']>;
  twitter?: Maybe<Scalars['String']>;
  youtube?: Maybe<Scalars['String']>;
};

export type Error = {
  __typename?: 'Error';
  /** code: representing error code, i.e 401,404 */
  code: Scalars['Int'];
  /** message: describing the error message. */
  message: Scalars['String'];
  /** status: describing the status of error, i.e INVALID_ARGUMENt, UNAUTHROIZED */
  status: Scalars['String'];
  /** success: determine whether the operation successful */
  success: Scalars['Boolean'];
};

export type Feature = {
  __typename?: 'Feature';
  extension?: Maybe<Scalars['String']>;
  fileName?: Maybe<Scalars['String']>;
  filePath?: Maybe<Scalars['String']>;
  size?: Maybe<Scalars['Int']>;
  url?: Maybe<Scalars['String']>;
};

export enum FeatureEditAction {
  Add = 'ADD',
  Remove = 'REMOVE'
}

export type IProduct = {
  description?: Maybe<Scalars['String']>;
  expirationDate?: Maybe<Scalars['String']>;
  expired?: Maybe<Scalars['Boolean']>;
  features?: Maybe<Array<Maybe<Feature>>>;
  inStock: Scalars['Boolean'];
  name: Scalars['String'];
  productID: Scalars['ID'];
  quantity: Scalars['Int'];
  retailPrice: Scalars['Float'];
  warehouses?: Maybe<Array<Warehouse>>;
  wholesalePrice: Scalars['Float'];
};

export type ISubscription = {
  error?: Maybe<Error>;
  payload: SubscriptionPayload;
};

export type Mutation = {
  __typename?: 'Mutation';
  _initializeSys: InitPayload;
  categoryAdd: CategoryAddPayload;
  categoryDelete: CategoryDeletePayload;
  categoryEdit: CategoryEditPayload;
  customerAdd: CustomerAddPayload;
  customerDelete: CustomerDeletePayload;
  customerEdit: CustomerEditPayload;
  enterpriseAdd: EnterpriseAddPayload;
  enterpriseEdit: EnterpriseEditPayload;
  makeSupply: SupplyAddPayload;
  productAdd: ProductAddPayload;
  productDelete: ProductDeletePayload;
  productEdit: ProductEditPayload;
  saleAdd: SaleAddPayload;
  saleDelete: SaleDeletePayload;
  saleEdit: SaleEditPayload;
  staffAdd: StaffAddPayload;
  staffDelete: StaffDeletePayload;
  staffEdit: StaffEditPayload;
  supplyDelete: SupplyDeletePayload;
  supplyEdit: SupplyEditPayload;
  warehouseAdd: WarehouseAddPayload;
  warehouseDelete: WarehouseDeletePayload;
  warehouseEdit: WarehouseEditPayload;
};


export type Mutation_InitializeSysArgs = {
  _init: Scalars['Boolean'];
};


export type MutationCategoryAddArgs = {
  categoryAddInput: CategoryAddInput;
};


export type MutationCategoryDeleteArgs = {
  category: Scalars['String'];
};


export type MutationCategoryEditArgs = {
  categoryEditInput: CategoryEditInput;
};


export type MutationCustomerAddArgs = {
  customerAddInput: CustomerAddInput;
};


export type MutationCustomerDeleteArgs = {
  customerDeleteInput: CustomerDeleteInput;
};


export type MutationCustomerEditArgs = {
  customerEditInput: CustomerEditInput;
};


export type MutationEnterpriseAddArgs = {
  enterpriseAddInput: EnterpriseAddInput;
};


export type MutationEnterpriseEditArgs = {
  enterpriseEditInput: EnterpriseEditInput;
};


export type MutationMakeSupplyArgs = {
  supplyAddInput: Array<SupplyAddInput>;
  warehouseID?: InputMaybe<Scalars['ID']>;
};


export type MutationProductAddArgs = {
  productAddInput: ProductAddInput;
};


export type MutationProductDeleteArgs = {
  productID: Scalars['ID'];
  warehouseID?: InputMaybe<Scalars['ID']>;
};


export type MutationProductEditArgs = {
  productEditInput: ProductEditInput;
};


export type MutationSaleAddArgs = {
  saleAddInput: SaleAddInput;
};


export type MutationSaleDeleteArgs = {
  saleID: Scalars['ID'];
  warehouseID?: InputMaybe<Scalars['ID']>;
};


export type MutationSaleEditArgs = {
  saleEditInput: SaleEditInput;
};


export type MutationStaffAddArgs = {
  staffAddInput: StaffAddInput;
};


export type MutationStaffDeleteArgs = {
  staffID: Scalars['ID'];
};


export type MutationStaffEditArgs = {
  staffEditInput: StaffEditInput;
};


export type MutationSupplyDeleteArgs = {
  supplyDeleteInput: SupplyDeleteInput;
};


export type MutationSupplyEditArgs = {
  supplyEditInput: Array<SupplyEditInput>;
  supplyID: Scalars['ID'];
  warehouseID?: InputMaybe<Scalars['ID']>;
};


export type MutationWarehouseAddArgs = {
  warehouseAddInput: WarehouseAddInput;
};


export type MutationWarehouseDeleteArgs = {
  warehouseID: Scalars['ID'];
};


export type MutationWarehouseEditArgs = {
  warehouseEditInput: WarehouseEditInput;
};

export type Pagins = {
  __typename?: 'Pagins';
  currentPageIndex?: Maybe<Scalars['Int']>;
  nextPageIndex?: Maybe<Scalars['Int']>;
  sort?: Maybe<Scalars['String']>;
  totalDocuments?: Maybe<Scalars['Int']>;
  totalPaginated?: Maybe<Scalars['Int']>;
};

export type Product = IProduct & {
  __typename?: 'Product';
  category: Category;
  description?: Maybe<Scalars['String']>;
  expirationDate?: Maybe<Scalars['String']>;
  expired?: Maybe<Scalars['Boolean']>;
  features?: Maybe<Array<Maybe<Feature>>>;
  inStock: Scalars['Boolean'];
  name: Scalars['String'];
  productID: Scalars['ID'];
  quantity: Scalars['Int'];
  retailPrice: Scalars['Float'];
  warehouses?: Maybe<Array<Warehouse>>;
  wholesalePrice: Scalars['Float'];
};

export type ProductAddPayload = {
  __typename?: 'ProductAddPayload';
  added?: Maybe<Scalars['Boolean']>;
  error?: Maybe<Scalars['String']>;
  newAdded?: Maybe<Product>;
};

export type ProductAddSubscription = ISubscription & {
  __typename?: 'ProductAddSubscription';
  error?: Maybe<Error>;
  payload: SubscriptionPayload;
};

export type ProductDeletePayload = {
  __typename?: 'ProductDeletePayload';
  deleted: Scalars['Boolean'];
  error?: Maybe<Scalars['String']>;
};

export type ProductDeleteSubscription = ISubscription & {
  __typename?: 'ProductDeleteSubscription';
  error?: Maybe<Error>;
  payload: SubscriptionPayload;
};

export type ProductEditPayload = {
  __typename?: 'ProductEditPayload';
  edited: Scalars['Boolean'];
  error?: Maybe<Scalars['String']>;
  newEdited?: Maybe<Product>;
};

export type ProductEditSubscription = ISubscription & {
  __typename?: 'ProductEditSubscription';
  error?: Maybe<Error>;
  payload: SubscriptionPayload;
};

export type ProductPayload = {
  __typename?: 'ProductPayload';
  error?: Maybe<Scalars['String']>;
  product?: Maybe<Product>;
};

export type ProductsPayload = {
  __typename?: 'ProductsPayload';
  error?: Maybe<Scalars['String']>;
  pagins?: Maybe<Pagins>;
  products: Array<Product>;
};

export type Query = {
  __typename?: 'Query';
  categories: CategoryPayload;
  customer: CustomerPayload;
  customers: CustomersPayload;
  product: ProductPayload;
  products: ProductsPayload;
  sale: SalePayload;
  sales: SalesPayload;
  staff: StaffPayload;
  staffs: StaffsPayload;
  store: Store;
  supplies: SupplysPayload;
  supply: SupplyPayload;
  warehouse: WarehousePayload;
  warehouses: WarehousesPayload;
};


export type QueryCategoriesArgs = {
  pagin?: InputMaybe<PaginInput>;
};


export type QueryCustomerArgs = {
  searchTerm: SearchCustomerInput;
};


export type QueryCustomersArgs = {
  pagin?: InputMaybe<PaginInput>;
  searchTerm?: InputMaybe<SearchCustomerInput>;
};


export type QueryProductArgs = {
  searchTerm: SearchProductInput;
};


export type QueryProductsArgs = {
  pagin?: InputMaybe<PaginInput>;
  searchTerm?: InputMaybe<SearchProductInput>;
};


export type QuerySaleArgs = {
  searchTerm: SearchSaleInput;
};


export type QuerySalesArgs = {
  pagin?: InputMaybe<PaginInput>;
  searchTerm?: InputMaybe<SearchSaleInput>;
};


export type QueryStaffArgs = {
  searchTerm: SearchStaffInput;
};


export type QueryStaffsArgs = {
  pagin?: InputMaybe<PaginInput>;
  searchTerm?: InputMaybe<SearchStaffInput>;
};


export type QuerySuppliesArgs = {
  pagin?: InputMaybe<PaginInput>;
  searchTerm?: InputMaybe<SearchSupplyInput>;
};


export type QuerySupplyArgs = {
  searchTerm: SearchSupplyInput;
};


export type QueryWarehouseArgs = {
  searchTerm: WarehouseSearchInput;
};


export type QueryWarehousesArgs = {
  pagin?: InputMaybe<PaginInput>;
  searchTerm?: InputMaybe<WarehouseSearchInput>;
};

export enum RolePrevileges {
  AddCategory = 'ADD_CATEGORY',
  AddCustomer = 'ADD_CUSTOMER',
  AddEnterprise = 'ADD_ENTERPRISE',
  AddProduct = 'ADD_PRODUCT',
  AddSale = 'ADD_SALE',
  AddStaff = 'ADD_STAFF',
  AddSupply = 'ADD_SUPPLY',
  AddWarehouse = 'ADD_WAREHOUSE',
  AllCategoryOperations = 'ALL_CATEGORY_OPERATIONS',
  AllCustomerOperations = 'ALL_CUSTOMER_OPERATIONS',
  AllProductOperations = 'ALL_PRODUCT_OPERATIONS',
  AllSaleOperations = 'ALL_SALE_OPERATIONS',
  AllStaffOperations = 'ALL_STAFF_OPERATIONS',
  AllSupplyOperations = 'ALL_SUPPLY_OPERATIONS',
  AllWarehouseOperations = 'ALL_WAREHOUSE_OPERATIONS',
  DeleteCategory = 'DELETE_CATEGORY',
  DeleteCustomer = 'DELETE_CUSTOMER',
  DeleteProduct = 'DELETE_PRODUCT',
  DeleteSale = 'DELETE_SALE',
  DeleteStaff = 'DELETE_STAFF',
  DeleteSupply = 'DELETE_SUPPLY',
  DeleteWarehouse = 'DELETE_WAREHOUSE',
  InitializedSystem = 'INITIALIZED_SYSTEM',
  ListenAddCategory = 'LISTEN_ADD_CATEGORY',
  ListenAddProduct = 'LISTEN_ADD_PRODUCT',
  ListenAddSale = 'LISTEN_ADD_SALE',
  ListenAddStaff = 'LISTEN_ADD_STAFF',
  ListenAddSupply = 'LISTEN_ADD_SUPPLY',
  ListenAddWarehouse = 'LISTEN_ADD_WAREHOUSE',
  ListenDeleteCategory = 'LISTEN_DELETE_CATEGORY',
  ListenDeleteProduct = 'LISTEN_DELETE_PRODUCT',
  ListenDeleteSale = 'LISTEN_DELETE_SALE',
  ListenDeleteStaff = 'LISTEN_DELETE_STAFF',
  ListenDeleteSupply = 'LISTEN_DELETE_SUPPLY',
  ListenDeleteWarehouse = 'LISTEN_DELETE_WAREHOUSE',
  ListenEditCategory = 'LISTEN_EDIT_CATEGORY',
  ListenEditProduct = 'LISTEN_EDIT_PRODUCT',
  ListenEditSale = 'LISTEN_EDIT_SALE',
  ListenEditSupply = 'LISTEN_EDIT_SUPPLY',
  ListenEditWarehouse = 'LISTEN_EDIT_WAREHOUSE',
  ReadCategory = 'READ_CATEGORY',
  ReadCustomer = 'READ_CUSTOMER',
  ReadProduct = 'READ_PRODUCT',
  ReadSale = 'READ_SALE',
  ReadStaff = 'READ_STAFF',
  ReadSupply = 'READ_SUPPLY',
  ReadWarehouse = 'READ_WAREHOUSE',
  UpdateCategory = 'UPDATE_CATEGORY',
  UpdateCustomer = 'UPDATE_CUSTOMER',
  UpdateEnterprise = 'UPDATE_ENTERPRISE',
  UpdateProduct = 'UPDATE_PRODUCT',
  UpdateSale = 'UPDATE_SALE',
  UpdateStaff = 'UPDATE_STAFF',
  UpdateSupply = 'UPDATE_SUPPLY',
  UpdateWarehouse = 'UPDATE_WAREHOUSE'
}

export type Sale = {
  __typename?: 'Sale';
  balance?: Maybe<Scalars['Float']>;
  customer: Customer;
  customerID: Scalars['ID'];
  date: Scalars['String'];
  discount?: Maybe<Scalars['Float']>;
  paid: Scalars['Float'];
  products: Array<SaleProduct>;
  profit?: Maybe<SaleProfit>;
  saleID: Scalars['ID'];
  staff: Staff;
  staffID: Scalars['ID'];
  time: Scalars['String'];
  totalPrice: Scalars['Float'];
  totalQuantity: Scalars['Int'];
  warehouse?: Maybe<Warehouse>;
  warehouseID?: Maybe<Scalars['ID']>;
};

export type SaleAddPayload = {
  __typename?: 'SaleAddPayload';
  added?: Maybe<Scalars['Boolean']>;
  error?: Maybe<Scalars['String']>;
  newAdded?: Maybe<Sale>;
};

export type SaleAddSubscription = ISubscription & {
  __typename?: 'SaleAddSubscription';
  error?: Maybe<Error>;
  payload: SubscriptionPayload;
};

export type SaleDeletePayload = {
  __typename?: 'SaleDeletePayload';
  deleted: Scalars['Boolean'];
  error?: Maybe<Scalars['String']>;
};

export type SaleDeleteSubscription = ISubscription & {
  __typename?: 'SaleDeleteSubscription';
  error?: Maybe<Error>;
  payload: SubscriptionPayload;
};

export type SaleEditPayload = {
  __typename?: 'SaleEditPayload';
  edited?: Maybe<Scalars['Boolean']>;
  error?: Maybe<Scalars['String']>;
  newEdited?: Maybe<Sale>;
};

export type SaleEditSubscription = ISubscription & {
  __typename?: 'SaleEditSubscription';
  error?: Maybe<Error>;
  payload: SubscriptionPayload;
};

export type SalePayload = {
  __typename?: 'SalePayload';
  error?: Maybe<Scalars['String']>;
  sale?: Maybe<Sale>;
};

export type SaleProduct = IProduct & {
  __typename?: 'SaleProduct';
  description?: Maybe<Scalars['String']>;
  expirationDate?: Maybe<Scalars['String']>;
  expired?: Maybe<Scalars['Boolean']>;
  features?: Maybe<Array<Maybe<Feature>>>;
  inStock: Scalars['Boolean'];
  kind: Scalars['String'];
  name: Scalars['String'];
  productID: Scalars['ID'];
  quantity: Scalars['Int'];
  retailPrice: Scalars['Float'];
  subTotal: Scalars['Float'];
  warehouses?: Maybe<Array<Warehouse>>;
  wholesalePrice: Scalars['Float'];
};

export type SaleProfit = {
  __typename?: 'SaleProfit';
  percentage: Scalars['Float'];
  status: Scalars['String'];
};

export type SalesPayload = {
  __typename?: 'SalesPayload';
  error?: Maybe<Scalars['String']>;
  pagins?: Maybe<Pagins>;
  sales: Array<Sale>;
};

/** Sorting order in ascending or descending */
export enum Sort {
  Asc = 'asc',
  Desc = 'desc'
}

export type Staff = {
  __typename?: 'Staff';
  address?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  otherName?: Maybe<Scalars['String']>;
  password: Scalars['String'];
  phoneNumber?: Maybe<Scalars['String']>;
  picture?: Maybe<Feature>;
  role: StaffRole;
  staffID: Scalars['ID'];
  token: Scalars['String'];
  warehouse?: Maybe<Warehouse>;
};

export type StaffAddPayload = {
  __typename?: 'StaffAddPayload';
  added: Scalars['Boolean'];
  error?: Maybe<Scalars['String']>;
  newAdded?: Maybe<Staff>;
};

export type StaffAddSubscription = ISubscription & {
  __typename?: 'StaffAddSubscription';
  error?: Maybe<Error>;
  payload: SubscriptionPayload;
};

export type StaffDeletePayload = {
  __typename?: 'StaffDeletePayload';
  deleted: Scalars['Boolean'];
  error?: Maybe<Scalars['String']>;
};

export type StaffDeleteSubscription = ISubscription & {
  __typename?: 'StaffDeleteSubscription';
  error?: Maybe<Error>;
  payload: SubscriptionPayload;
};

export type StaffEditPayload = {
  __typename?: 'StaffEditPayload';
  edited: Scalars['Boolean'];
  error?: Maybe<Scalars['String']>;
  newEdited?: Maybe<Staff>;
};

export type StaffPayload = {
  __typename?: 'StaffPayload';
  error?: Maybe<Scalars['String']>;
  staff?: Maybe<Staff>;
};

/** Staff Roles previleges this includes Admin, Saller, Manager, Warehouse, Accountant */
export enum StaffRole {
  /** Accountant Role : Accountant staff has every previlege to ADD,READ,DELETE,EDIT except to delete a Admin/Manager staff. */
  Accountant = 'Accountant',
  /** Admin Role : Admin has every previlege to ADD,READ,DELETE,EDIT */
  Admin = 'Admin',
  /** Manage Role : Manager has every previlege to ADD,READ,DELETE,EDIT except can not make a sale */
  Manager = 'Manager',
  /** Saller Role : A saller has only the previlege to ADD,READ,EDIT a Sale only. */
  Saller = 'Saller',
  /** Warehouse Role : A warehouse staff has every previlege to ADD,READ,DELETE,EDIT on Warehouse only. */
  Warehouse = 'Warehouse'
}

export type StaffsPayload = {
  __typename?: 'StaffsPayload';
  error?: Maybe<Scalars['String']>;
  pagin?: Maybe<Pagins>;
  staffs: Array<Staff>;
};

export type Store = {
  __typename?: 'Store';
  _enterpriseInitialized: Scalars['Boolean'];
  _sysInitialized: Scalars['Boolean'];
  enterPrise?: Maybe<EnterprisePayload>;
  totalCustomers?: Maybe<StorePayload>;
  totalExpiredProducts?: Maybe<StorePayload>;
  totalProducts?: Maybe<StorePayload>;
  totalSales?: Maybe<StorePayload>;
  totalStaffs?: Maybe<StorePayload>;
  totalWarehouses?: Maybe<StorePayload>;
};

export type StorePayload = {
  __typename?: 'StorePayload';
  error?: Maybe<Scalars['String']>;
  result: Scalars['Int'];
};

export type StoreRealTime = {
  __typename?: 'StoreRealTime';
  /** get the total number of customers in a real time subscription.  */
  totalCustomers: Scalars['Int'];
  /** get the total number of products that expired in a real time subscription.  */
  totalExpiredProducts: Scalars['Int'];
  /** get the total number of products in a real time subscription.  */
  totalProducts: Scalars['Int'];
  /** get the total number of sales in a real time subscription.  */
  totalSales: Scalars['Int'];
  /** get the total number of staffs in a real time subscription.  */
  totalStaffs: Scalars['Int'];
  /** get the total number of warehouses in a real time subscription.  */
  totalWarehouses: Scalars['Int'];
};

export type Subscription = {
  __typename?: 'Subscription';
  /** subscription when a new category is added */
  categoryAddSubscription: CategoryAddSubscription;
  /** subscription when a category is deleted */
  categoryDeleteSubscription: CategoryDeleteSubscription;
  /** subscription when a category is edited */
  categoryEditSubscription: CategoryEditSubscription;
  /** subscription when a product is added */
  productAddSubscription: ProductAddSubscription;
  /** subscription when a product is deleted */
  productDeleteSubscription: ProductDeleteSubscription;
  /** subscription when a product is edited */
  productEditSubscription: ProductEditSubscription;
  /** subscription when a sale is make */
  saleAddSubscription: SaleAddSubscription;
  /** subscription when a sale is deleted */
  saleDeleteSubscription: SaleDeleteSubscription;
  /** subscription when a sale is edited */
  saleEditSubscription: SaleEditSubscription;
  /** subscription when a new staff is added */
  staffAddSubscription: SaleAddSubscription;
  /** subscription when a new staff is deleted */
  staffDeleteSubscription: SaleDeleteSubscription;
  /** subscription for a realtime store counts */
  storeRealTime: StoreRealTime;
  /** subscription when a supply is added */
  supplyAddSubscription: SupplyAddSubscription;
  /** subscription when a supply is deleted */
  supplyDeleteSubscription: SupplyDeleteSubscription;
  /** subscription when a supply is edited */
  supplyEditSubscription: SupplyEditSubscription;
  /** subscription when a new warehouse is added */
  warehouseAddSubscription: WarehouseAddSubscription;
  /** subscription when a warehouse is deleted */
  warehouseDeleteSubscription: WarehouseDeleteSubscription;
  /** subscription when a warehouse is edited */
  warehouseEditSubscription: WarehouseEditSubscription;
};

/** Subscription action type */
export enum SubscriptionActionType {
  Added = 'Added',
  Deleted = 'Deleted',
  Edited = 'Edited',
  Read = 'Read'
}

export type SubscriptionPayload = {
  __typename?: 'SubscriptionPayload';
  actionBy: Staff;
  actionResult: Type;
  actionType?: Maybe<SubscriptionActionType>;
  timestamp: Scalars['Date'];
};

export type Supply = {
  __typename?: 'Supply';
  date?: Maybe<Scalars['Date']>;
  productIDs?: Maybe<Array<Scalars['ID']>>;
  products?: Maybe<Array<Product>>;
  staff?: Maybe<Staff>;
  staffID: Scalars['ID'];
  supplyID: Scalars['ID'];
  totalPrice: Scalars['Float'];
  totalQuantity: Scalars['Int'];
};

export type SupplyAddPayload = {
  __typename?: 'SupplyAddPayload';
  added: Scalars['Boolean'];
  error?: Maybe<Scalars['String']>;
  newAdded?: Maybe<Supply>;
};

export type SupplyAddSubscription = ISubscription & {
  __typename?: 'SupplyAddSubscription';
  error?: Maybe<Error>;
  payload: SubscriptionPayload;
};

export type SupplyDeletePayload = {
  __typename?: 'SupplyDeletePayload';
  deleted: Scalars['Boolean'];
  error?: Maybe<Scalars['String']>;
};

export type SupplyDeleteSubscription = ISubscription & {
  __typename?: 'SupplyDeleteSubscription';
  error?: Maybe<Error>;
  payload: SubscriptionPayload;
};

export type SupplyEditPayload = {
  __typename?: 'SupplyEditPayload';
  edited: Scalars['Boolean'];
  error?: Maybe<Scalars['String']>;
  newEdited?: Maybe<Supply>;
};

export type SupplyEditSubscription = ISubscription & {
  __typename?: 'SupplyEditSubscription';
  error?: Maybe<Error>;
  payload: SubscriptionPayload;
};

export type SupplyPayload = {
  __typename?: 'SupplyPayload';
  error?: Maybe<Scalars['String']>;
  supply?: Maybe<Supply>;
};

export type SupplysPayload = {
  __typename?: 'SupplysPayload';
  error?: Maybe<Scalars['String']>;
  pagins?: Maybe<Pagins>;
  supplies?: Maybe<Array<Supply>>;
};

/** Representing either one among types */
export type Type = Category | Customer | Product | Sale | Staff | Store | Supply | Warehouse;

export type Warehouse = {
  __typename?: 'Warehouse';
  address: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  productIDs: Array<Scalars['ID']>;
  products: Array<Product>;
  staffIDs: Array<Scalars['ID']>;
  staffs: Array<Staff>;
  warehouseID: Scalars['ID'];
};

export type WarehouseAddPayload = {
  __typename?: 'WarehouseAddPayload';
  added: Scalars['Boolean'];
  error?: Maybe<Scalars['String']>;
  newAdded?: Maybe<Warehouse>;
};

export type WarehouseAddSubscription = ISubscription & {
  __typename?: 'WarehouseAddSubscription';
  error?: Maybe<Error>;
  payload: SubscriptionPayload;
};

export type WarehouseDeletePayload = {
  __typename?: 'WarehouseDeletePayload';
  deleted: Scalars['Boolean'];
  error?: Maybe<Scalars['String']>;
};

export type WarehouseDeleteSubscription = ISubscription & {
  __typename?: 'WarehouseDeleteSubscription';
  error?: Maybe<Error>;
  payload: SubscriptionPayload;
};

export type WarehouseEditPayload = {
  __typename?: 'WarehouseEditPayload';
  edited: Scalars['Boolean'];
  error?: Maybe<Scalars['String']>;
  newEdited?: Maybe<Warehouse>;
};

export type WarehouseEditSubscription = ISubscription & {
  __typename?: 'WarehouseEditSubscription';
  error?: Maybe<Error>;
  payload: SubscriptionPayload;
};

export type WarehousePayload = {
  __typename?: 'WarehousePayload';
  error?: Maybe<Scalars['String']>;
  warehouse?: Maybe<Warehouse>;
};

export type WarehousesPayload = {
  __typename?: 'WarehousesPayload';
  error?: Maybe<Scalars['String']>;
  warehouses: Array<Warehouse>;
};

export type AddOwnerInput = {
  about?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
  name: Scalars['String'];
  phoneNumber: Scalars['String'];
  picture?: InputMaybe<Scalars['String']>;
  socialAccounts?: InputMaybe<AddSocialAccountInput>;
  website?: InputMaybe<Scalars['String']>;
};

export type AddSaleProfitInput = {
  percentage: Scalars['Float'];
  status: Scalars['String'];
};

export type AddSocialAccountInput = {
  facebook?: InputMaybe<Scalars['String']>;
  instagram?: InputMaybe<Scalars['String']>;
  twitter?: InputMaybe<Scalars['String']>;
  youtube?: InputMaybe<Scalars['String']>;
};

export type CategoryAddInput = {
  name?: InputMaybe<Scalars['String']>;
};

export type CategoryEditInput = {
  newCategory: Scalars['String'];
  oldCategory: Scalars['String'];
};

export type CustomerAddInput = {
  address?: InputMaybe<Scalars['String']>;
  beneficiary?: InputMaybe<Scalars['Boolean']>;
  email?: InputMaybe<Scalars['String']>;
  metas?: InputMaybe<CustomerMetasInput>;
  name: Scalars['String'];
  phoneNumber?: InputMaybe<Scalars['String']>;
  saleIDs: Array<Scalars['ID']>;
  warehouseID?: InputMaybe<Scalars['ID']>;
};

export type CustomerDeleteInput = {
  customerID: Scalars['ID'];
  warehouseID?: InputMaybe<Scalars['ID']>;
};

export type CustomerEditInput = {
  address?: InputMaybe<Scalars['String']>;
  beneficiary?: InputMaybe<Scalars['Boolean']>;
  customerID: Scalars['ID'];
  dateOfBirth?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  metas?: InputMaybe<CustomerMetasInput>;
  name?: InputMaybe<Scalars['String']>;
  phoneNumber?: InputMaybe<Scalars['String']>;
  saleIDs?: InputMaybe<Array<Scalars['ID']>>;
  warehouseID?: InputMaybe<Scalars['ID']>;
};

export type CustomerMetasInput = {
  avatarURL?: InputMaybe<Scalars['String']>;
  dateOfBirth?: InputMaybe<Scalars['String']>;
  socialMedia?: InputMaybe<CustomerSocialMediaInput>;
};

export type CustomerSocialMediaInput = {
  facebook?: InputMaybe<Scalars['String']>;
  instagram?: InputMaybe<Scalars['String']>;
  twitter?: InputMaybe<Scalars['String']>;
};

export type EditFeature = {
  action: FeatureEditAction;
  addFeatureURI?: InputMaybe<Array<Scalars['String']>>;
  removeFeatureByName?: InputMaybe<Scalars['String']>;
};

export type EditOwnerInput = {
  about?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  phoneNumber?: InputMaybe<Scalars['String']>;
  picture?: InputMaybe<Scalars['String']>;
  socialAccounts?: InputMaybe<AddSocialAccountInput>;
  website?: InputMaybe<Scalars['String']>;
};

export type EnterpriseAddInput = {
  about?: InputMaybe<Scalars['String']>;
  address: Scalars['String'];
  contacts: Array<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  owners: Array<AddOwnerInput>;
  slogan?: InputMaybe<Scalars['String']>;
  socialAccounts?: InputMaybe<AddSocialAccountInput>;
  title?: InputMaybe<Scalars['String']>;
  website?: InputMaybe<Scalars['String']>;
};

export type EnterpriseEditInput = {
  about?: InputMaybe<Scalars['String']>;
  address?: InputMaybe<Scalars['String']>;
  contacts?: InputMaybe<Array<Scalars['String']>>;
  email?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  owners?: InputMaybe<Array<EditOwnerInput>>;
  slogan?: InputMaybe<Scalars['String']>;
  socialAccounts?: InputMaybe<AddSocialAccountInput>;
  title?: InputMaybe<Scalars['String']>;
  website?: InputMaybe<Scalars['String']>;
};

export type EnterprisePayload = {
  __typename?: 'enterprisePayload';
  error?: Maybe<Scalars['String']>;
  result?: Maybe<Enterprise>;
};

export type InitPayload = {
  __typename?: 'initPayload';
  _initialized: Scalars['Boolean'];
  error?: Maybe<Scalars['String']>;
};

/** Pagination inputs */
export type PaginInput = {
  /** Limit: maximum number of data to return */
  limit?: InputMaybe<Scalars['Int']>;
  /** PageIndex: page index  */
  pageIndex?: InputMaybe<Scalars['Int']>;
  /** Sort: sort the result in Asc (ascending) or Desc (descending) order */
  sort?: InputMaybe<Sort>;
};

export type ProductAddInput = {
  categoryID: Scalars['ID'];
  description?: InputMaybe<Scalars['String']>;
  expirationDate?: InputMaybe<Scalars['Date']>;
  featuresURI?: InputMaybe<Array<Scalars['String']>>;
  name: Scalars['String'];
  quantity: Scalars['Int'];
  retailPrice: Scalars['Float'];
  warehouseIDs?: InputMaybe<Array<Scalars['ID']>>;
  wholesalePrice: Scalars['Float'];
};

export type ProductEditInput = {
  categoryID?: InputMaybe<Scalars['ID']>;
  description?: InputMaybe<Scalars['String']>;
  editFeatures?: InputMaybe<EditFeature>;
  expirationDate?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  productID: Scalars['ID'];
  retailPrice?: InputMaybe<Scalars['Float']>;
  warehouseIDs?: InputMaybe<Array<Scalars['ID']>>;
  wholesalePrice?: InputMaybe<Scalars['Float']>;
};

export type SaleAddInput = {
  addCustomer?: InputMaybe<CustomerAddInput>;
  balance?: InputMaybe<Scalars['Float']>;
  customerID?: InputMaybe<Scalars['ID']>;
  date?: InputMaybe<Scalars['String']>;
  discount?: InputMaybe<Scalars['Float']>;
  paid?: InputMaybe<Scalars['Float']>;
  productMetas: Array<SaleProductMetaInput>;
  time?: InputMaybe<Scalars['String']>;
  warehouseID?: InputMaybe<Scalars['ID']>;
};

export type SaleEditInput = {
  addCustomer?: InputMaybe<CustomerAddInput>;
  balance?: InputMaybe<Scalars['Float']>;
  customerID?: InputMaybe<Scalars['ID']>;
  date?: InputMaybe<Scalars['String']>;
  discount?: InputMaybe<Scalars['Float']>;
  paid?: InputMaybe<Scalars['Float']>;
  productMetas?: InputMaybe<Array<SaleProductMetaInput>>;
  saleID: Scalars['ID'];
  time?: InputMaybe<Scalars['String']>;
  warehouseID?: InputMaybe<Scalars['ID']>;
};

export type SaleProductMetaInput = {
  productID: Scalars['ID'];
  quantity: Scalars['Int'];
};

export type SearchCustomerInput = {
  address?: InputMaybe<Scalars['String']>;
  beneficiaries?: InputMaybe<Scalars['Boolean']>;
  customerID?: InputMaybe<Scalars['ID']>;
  dateOfBirth?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type SearchProductInput = {
  categoryID?: InputMaybe<Scalars['ID']>;
  expirationDate?: InputMaybe<Scalars['String']>;
  expired?: InputMaybe<Scalars['Boolean']>;
  inStock?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  productID?: InputMaybe<Scalars['ID']>;
  quantity?: InputMaybe<Scalars['Int']>;
  retailPrice?: InputMaybe<Scalars['Float']>;
  warehouseID?: InputMaybe<Scalars['ID']>;
  wholesalePrice?: InputMaybe<Scalars['Float']>;
};

export type SearchSaleInput = {
  customerID?: InputMaybe<Scalars['ID']>;
  date?: InputMaybe<Scalars['String']>;
  paidPrice?: InputMaybe<Scalars['Float']>;
  productID?: InputMaybe<Scalars['ID']>;
  productName?: InputMaybe<Scalars['String']>;
  saleID?: InputMaybe<Scalars['ID']>;
  staffID?: InputMaybe<Scalars['ID']>;
  time?: InputMaybe<Scalars['String']>;
};

export type SearchStaffInput = {
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<StaffRole>;
  staffID?: InputMaybe<Scalars['ID']>;
  warehouseID?: InputMaybe<Scalars['ID']>;
};

export type SearchSupplyInput = {
  date?: InputMaybe<Scalars['String']>;
  staffID?: InputMaybe<Scalars['ID']>;
  supplyID?: InputMaybe<Scalars['ID']>;
  time?: InputMaybe<Scalars['String']>;
  warehouseID?: InputMaybe<Scalars['ID']>;
};

export type StaffAddInput = {
  address?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  featureURI?: InputMaybe<Scalars['String']>;
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  otherName?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
  phoneNumber: Scalars['String'];
  role: StaffRole;
  warehouseID?: InputMaybe<Scalars['ID']>;
};

export type StaffEditInput = {
  address?: InputMaybe<Scalars['String']>;
  editFeature?: InputMaybe<EditFeature>;
  email?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  otherName?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  phoneNumber?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<StaffRole>;
  staffID: Scalars['ID'];
  warehouseID?: InputMaybe<Scalars['ID']>;
};

export type SupplyAddInput = {
  productID: Scalars['ID'];
  quantity: Scalars['Int'];
  retailPrice: Scalars['Float'];
  wholesalePrice: Scalars['Float'];
};

export type SupplyDeleteInput = {
  supplyID: Scalars['ID'];
  warehouseID?: InputMaybe<Scalars['ID']>;
};

export type SupplyEditInput = {
  productID: Scalars['ID'];
  quantity?: InputMaybe<Scalars['Int']>;
  retailPrice?: InputMaybe<Scalars['Float']>;
  wholesalePrice?: InputMaybe<Scalars['Float']>;
};

export type WarehouseAddInput = {
  address: Scalars['String'];
  name: Scalars['String'];
  productIDs?: InputMaybe<Array<Scalars['ID']>>;
  staffIDs?: InputMaybe<Array<Scalars['ID']>>;
};

export type WarehouseEditInput = {
  address?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  productIDs?: InputMaybe<Array<Scalars['ID']>>;
  staffIDs?: InputMaybe<Array<Scalars['ID']>>;
  warehouseID: Scalars['ID'];
};

export type WarehouseSearchInput = {
  address?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  warehouseID?: InputMaybe<Scalars['ID']>;
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping of union types */
export type ResolversUnionTypes = ResolversObject<{
  Type: ( Category ) | ( Customer ) | ( Product ) | ( Sale ) | ( Staff ) | ( Store ) | ( Supply ) | ( Warehouse );
}>;

/** Mapping of union parent types */
export type ResolversUnionParentTypes = ResolversObject<{
  Type: ( Category ) | ( Customer ) | ( Product ) | ( Sale ) | ( Staff ) | ( Store ) | ( Supply ) | ( Warehouse );
}>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  AddWarehouseStaffPayload: ResolverTypeWrapper<AddWarehouseStaffPayload>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Category: ResolverTypeWrapper<Category>;
  CategoryAddPayload: ResolverTypeWrapper<CategoryAddPayload>;
  CategoryAddSubscription: ResolverTypeWrapper<CategoryAddSubscription>;
  CategoryDeletePayload: ResolverTypeWrapper<CategoryDeletePayload>;
  CategoryDeleteSubscription: ResolverTypeWrapper<CategoryDeleteSubscription>;
  CategoryEditPayload: ResolverTypeWrapper<CategoryEditPayload>;
  CategoryEditSubscription: ResolverTypeWrapper<CategoryEditSubscription>;
  CategoryPayload: ResolverTypeWrapper<CategoryPayload>;
  Customer: ResolverTypeWrapper<Customer>;
  CustomerAddPayload: ResolverTypeWrapper<CustomerAddPayload>;
  CustomerDeletePayload: ResolverTypeWrapper<CustomerDeletePayload>;
  CustomerEditPayload: ResolverTypeWrapper<CustomerEditPayload>;
  CustomerMetaData: ResolverTypeWrapper<CustomerMetaData>;
  CustomerPayload: ResolverTypeWrapper<CustomerPayload>;
  CustomerSocialMedia: ResolverTypeWrapper<CustomerSocialMedia>;
  CustomersPayload: ResolverTypeWrapper<CustomersPayload>;
  Date: ResolverTypeWrapper<Scalars['Date']>;
  Enterprise: ResolverTypeWrapper<Enterprise>;
  EnterpriseAddPayload: ResolverTypeWrapper<EnterpriseAddPayload>;
  EnterpriseEditPayload: ResolverTypeWrapper<EnterpriseEditPayload>;
  EnterpriseOwner: ResolverTypeWrapper<EnterpriseOwner>;
  EnterpriseSocialAccounts: ResolverTypeWrapper<EnterpriseSocialAccounts>;
  Error: ResolverTypeWrapper<Error>;
  Feature: ResolverTypeWrapper<Feature>;
  FeatureEditAction: FeatureEditAction;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  IProduct: ResolversTypes['Product'] | ResolversTypes['SaleProduct'];
  ISubscription: ResolversTypes['CategoryAddSubscription'] | ResolversTypes['CategoryDeleteSubscription'] | ResolversTypes['CategoryEditSubscription'] | ResolversTypes['ProductAddSubscription'] | ResolversTypes['ProductDeleteSubscription'] | ResolversTypes['ProductEditSubscription'] | ResolversTypes['SaleAddSubscription'] | ResolversTypes['SaleDeleteSubscription'] | ResolversTypes['SaleEditSubscription'] | ResolversTypes['StaffAddSubscription'] | ResolversTypes['StaffDeleteSubscription'] | ResolversTypes['SupplyAddSubscription'] | ResolversTypes['SupplyDeleteSubscription'] | ResolversTypes['SupplyEditSubscription'] | ResolversTypes['WarehouseAddSubscription'] | ResolversTypes['WarehouseDeleteSubscription'] | ResolversTypes['WarehouseEditSubscription'];
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Mutation: ResolverTypeWrapper<{}>;
  Object: ResolverTypeWrapper<Scalars['Object']>;
  Pagins: ResolverTypeWrapper<Pagins>;
  Product: ResolverTypeWrapper<Product>;
  ProductAddPayload: ResolverTypeWrapper<ProductAddPayload>;
  ProductAddSubscription: ResolverTypeWrapper<ProductAddSubscription>;
  ProductDeletePayload: ResolverTypeWrapper<ProductDeletePayload>;
  ProductDeleteSubscription: ResolverTypeWrapper<ProductDeleteSubscription>;
  ProductEditPayload: ResolverTypeWrapper<ProductEditPayload>;
  ProductEditSubscription: ResolverTypeWrapper<ProductEditSubscription>;
  ProductPayload: ResolverTypeWrapper<ProductPayload>;
  ProductsPayload: ResolverTypeWrapper<ProductsPayload>;
  Query: ResolverTypeWrapper<{}>;
  RolePrevileges: RolePrevileges;
  Sale: ResolverTypeWrapper<Sale>;
  SaleAddPayload: ResolverTypeWrapper<SaleAddPayload>;
  SaleAddSubscription: ResolverTypeWrapper<SaleAddSubscription>;
  SaleDeletePayload: ResolverTypeWrapper<SaleDeletePayload>;
  SaleDeleteSubscription: ResolverTypeWrapper<SaleDeleteSubscription>;
  SaleEditPayload: ResolverTypeWrapper<SaleEditPayload>;
  SaleEditSubscription: ResolverTypeWrapper<SaleEditSubscription>;
  SalePayload: ResolverTypeWrapper<SalePayload>;
  SaleProduct: ResolverTypeWrapper<SaleProduct>;
  SaleProfit: ResolverTypeWrapper<SaleProfit>;
  SalesPayload: ResolverTypeWrapper<SalesPayload>;
  Sort: Sort;
  Staff: ResolverTypeWrapper<Staff>;
  StaffAddPayload: ResolverTypeWrapper<StaffAddPayload>;
  StaffAddSubscription: ResolverTypeWrapper<StaffAddSubscription>;
  StaffDeletePayload: ResolverTypeWrapper<StaffDeletePayload>;
  StaffDeleteSubscription: ResolverTypeWrapper<StaffDeleteSubscription>;
  StaffEditPayload: ResolverTypeWrapper<StaffEditPayload>;
  StaffPayload: ResolverTypeWrapper<StaffPayload>;
  StaffRole: StaffRole;
  StaffsPayload: ResolverTypeWrapper<StaffsPayload>;
  Store: ResolverTypeWrapper<Store>;
  StorePayload: ResolverTypeWrapper<StorePayload>;
  StoreRealTime: ResolverTypeWrapper<StoreRealTime>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Subscription: ResolverTypeWrapper<{}>;
  SubscriptionActionType: SubscriptionActionType;
  SubscriptionPayload: ResolverTypeWrapper<Omit<SubscriptionPayload, 'actionResult'> & { actionResult: ResolversTypes['Type'] }>;
  Supply: ResolverTypeWrapper<Supply>;
  SupplyAddPayload: ResolverTypeWrapper<SupplyAddPayload>;
  SupplyAddSubscription: ResolverTypeWrapper<SupplyAddSubscription>;
  SupplyDeletePayload: ResolverTypeWrapper<SupplyDeletePayload>;
  SupplyDeleteSubscription: ResolverTypeWrapper<SupplyDeleteSubscription>;
  SupplyEditPayload: ResolverTypeWrapper<SupplyEditPayload>;
  SupplyEditSubscription: ResolverTypeWrapper<SupplyEditSubscription>;
  SupplyPayload: ResolverTypeWrapper<SupplyPayload>;
  SupplysPayload: ResolverTypeWrapper<SupplysPayload>;
  Type: ResolverTypeWrapper<ResolversUnionTypes['Type']>;
  Warehouse: ResolverTypeWrapper<Warehouse>;
  WarehouseAddPayload: ResolverTypeWrapper<WarehouseAddPayload>;
  WarehouseAddSubscription: ResolverTypeWrapper<WarehouseAddSubscription>;
  WarehouseDeletePayload: ResolverTypeWrapper<WarehouseDeletePayload>;
  WarehouseDeleteSubscription: ResolverTypeWrapper<WarehouseDeleteSubscription>;
  WarehouseEditPayload: ResolverTypeWrapper<WarehouseEditPayload>;
  WarehouseEditSubscription: ResolverTypeWrapper<WarehouseEditSubscription>;
  WarehousePayload: ResolverTypeWrapper<WarehousePayload>;
  WarehousesPayload: ResolverTypeWrapper<WarehousesPayload>;
  addOwnerInput: AddOwnerInput;
  addSaleProfitInput: AddSaleProfitInput;
  addSocialAccountInput: AddSocialAccountInput;
  categoryAddInput: CategoryAddInput;
  categoryEditInput: CategoryEditInput;
  customerAddInput: CustomerAddInput;
  customerDeleteInput: CustomerDeleteInput;
  customerEditInput: CustomerEditInput;
  customerMetasInput: CustomerMetasInput;
  customerSocialMediaInput: CustomerSocialMediaInput;
  editFeature: EditFeature;
  editOwnerInput: EditOwnerInput;
  enterpriseAddInput: EnterpriseAddInput;
  enterpriseEditInput: EnterpriseEditInput;
  enterprisePayload: ResolverTypeWrapper<EnterprisePayload>;
  initPayload: ResolverTypeWrapper<InitPayload>;
  paginInput: PaginInput;
  productAddInput: ProductAddInput;
  productEditInput: ProductEditInput;
  saleAddInput: SaleAddInput;
  saleEditInput: SaleEditInput;
  saleProductMetaInput: SaleProductMetaInput;
  searchCustomerInput: SearchCustomerInput;
  searchProductInput: SearchProductInput;
  searchSaleInput: SearchSaleInput;
  searchStaffInput: SearchStaffInput;
  searchSupplyInput: SearchSupplyInput;
  staffAddInput: StaffAddInput;
  staffEditInput: StaffEditInput;
  supplyAddInput: SupplyAddInput;
  supplyDeleteInput: SupplyDeleteInput;
  supplyEditInput: SupplyEditInput;
  warehouseAddInput: WarehouseAddInput;
  warehouseEditInput: WarehouseEditInput;
  warehouseSearchInput: WarehouseSearchInput;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  AddWarehouseStaffPayload: AddWarehouseStaffPayload;
  Boolean: Scalars['Boolean'];
  Category: Category;
  CategoryAddPayload: CategoryAddPayload;
  CategoryAddSubscription: CategoryAddSubscription;
  CategoryDeletePayload: CategoryDeletePayload;
  CategoryDeleteSubscription: CategoryDeleteSubscription;
  CategoryEditPayload: CategoryEditPayload;
  CategoryEditSubscription: CategoryEditSubscription;
  CategoryPayload: CategoryPayload;
  Customer: Customer;
  CustomerAddPayload: CustomerAddPayload;
  CustomerDeletePayload: CustomerDeletePayload;
  CustomerEditPayload: CustomerEditPayload;
  CustomerMetaData: CustomerMetaData;
  CustomerPayload: CustomerPayload;
  CustomerSocialMedia: CustomerSocialMedia;
  CustomersPayload: CustomersPayload;
  Date: Scalars['Date'];
  Enterprise: Enterprise;
  EnterpriseAddPayload: EnterpriseAddPayload;
  EnterpriseEditPayload: EnterpriseEditPayload;
  EnterpriseOwner: EnterpriseOwner;
  EnterpriseSocialAccounts: EnterpriseSocialAccounts;
  Error: Error;
  Feature: Feature;
  Float: Scalars['Float'];
  ID: Scalars['ID'];
  IProduct: ResolversParentTypes['Product'] | ResolversParentTypes['SaleProduct'];
  ISubscription: ResolversParentTypes['CategoryAddSubscription'] | ResolversParentTypes['CategoryDeleteSubscription'] | ResolversParentTypes['CategoryEditSubscription'] | ResolversParentTypes['ProductAddSubscription'] | ResolversParentTypes['ProductDeleteSubscription'] | ResolversParentTypes['ProductEditSubscription'] | ResolversParentTypes['SaleAddSubscription'] | ResolversParentTypes['SaleDeleteSubscription'] | ResolversParentTypes['SaleEditSubscription'] | ResolversParentTypes['StaffAddSubscription'] | ResolversParentTypes['StaffDeleteSubscription'] | ResolversParentTypes['SupplyAddSubscription'] | ResolversParentTypes['SupplyDeleteSubscription'] | ResolversParentTypes['SupplyEditSubscription'] | ResolversParentTypes['WarehouseAddSubscription'] | ResolversParentTypes['WarehouseDeleteSubscription'] | ResolversParentTypes['WarehouseEditSubscription'];
  Int: Scalars['Int'];
  Mutation: {};
  Object: Scalars['Object'];
  Pagins: Pagins;
  Product: Product;
  ProductAddPayload: ProductAddPayload;
  ProductAddSubscription: ProductAddSubscription;
  ProductDeletePayload: ProductDeletePayload;
  ProductDeleteSubscription: ProductDeleteSubscription;
  ProductEditPayload: ProductEditPayload;
  ProductEditSubscription: ProductEditSubscription;
  ProductPayload: ProductPayload;
  ProductsPayload: ProductsPayload;
  Query: {};
  Sale: Sale;
  SaleAddPayload: SaleAddPayload;
  SaleAddSubscription: SaleAddSubscription;
  SaleDeletePayload: SaleDeletePayload;
  SaleDeleteSubscription: SaleDeleteSubscription;
  SaleEditPayload: SaleEditPayload;
  SaleEditSubscription: SaleEditSubscription;
  SalePayload: SalePayload;
  SaleProduct: SaleProduct;
  SaleProfit: SaleProfit;
  SalesPayload: SalesPayload;
  Staff: Staff;
  StaffAddPayload: StaffAddPayload;
  StaffAddSubscription: StaffAddSubscription;
  StaffDeletePayload: StaffDeletePayload;
  StaffDeleteSubscription: StaffDeleteSubscription;
  StaffEditPayload: StaffEditPayload;
  StaffPayload: StaffPayload;
  StaffsPayload: StaffsPayload;
  Store: Store;
  StorePayload: StorePayload;
  StoreRealTime: StoreRealTime;
  String: Scalars['String'];
  Subscription: {};
  SubscriptionPayload: Omit<SubscriptionPayload, 'actionResult'> & { actionResult: ResolversParentTypes['Type'] };
  Supply: Supply;
  SupplyAddPayload: SupplyAddPayload;
  SupplyAddSubscription: SupplyAddSubscription;
  SupplyDeletePayload: SupplyDeletePayload;
  SupplyDeleteSubscription: SupplyDeleteSubscription;
  SupplyEditPayload: SupplyEditPayload;
  SupplyEditSubscription: SupplyEditSubscription;
  SupplyPayload: SupplyPayload;
  SupplysPayload: SupplysPayload;
  Type: ResolversUnionParentTypes['Type'];
  Warehouse: Warehouse;
  WarehouseAddPayload: WarehouseAddPayload;
  WarehouseAddSubscription: WarehouseAddSubscription;
  WarehouseDeletePayload: WarehouseDeletePayload;
  WarehouseDeleteSubscription: WarehouseDeleteSubscription;
  WarehouseEditPayload: WarehouseEditPayload;
  WarehouseEditSubscription: WarehouseEditSubscription;
  WarehousePayload: WarehousePayload;
  WarehousesPayload: WarehousesPayload;
  addOwnerInput: AddOwnerInput;
  addSaleProfitInput: AddSaleProfitInput;
  addSocialAccountInput: AddSocialAccountInput;
  categoryAddInput: CategoryAddInput;
  categoryEditInput: CategoryEditInput;
  customerAddInput: CustomerAddInput;
  customerDeleteInput: CustomerDeleteInput;
  customerEditInput: CustomerEditInput;
  customerMetasInput: CustomerMetasInput;
  customerSocialMediaInput: CustomerSocialMediaInput;
  editFeature: EditFeature;
  editOwnerInput: EditOwnerInput;
  enterpriseAddInput: EnterpriseAddInput;
  enterpriseEditInput: EnterpriseEditInput;
  enterprisePayload: EnterprisePayload;
  initPayload: InitPayload;
  paginInput: PaginInput;
  productAddInput: ProductAddInput;
  productEditInput: ProductEditInput;
  saleAddInput: SaleAddInput;
  saleEditInput: SaleEditInput;
  saleProductMetaInput: SaleProductMetaInput;
  searchCustomerInput: SearchCustomerInput;
  searchProductInput: SearchProductInput;
  searchSaleInput: SearchSaleInput;
  searchStaffInput: SearchStaffInput;
  searchSupplyInput: SearchSupplyInput;
  staffAddInput: StaffAddInput;
  staffEditInput: StaffEditInput;
  supplyAddInput: SupplyAddInput;
  supplyDeleteInput: SupplyDeleteInput;
  supplyEditInput: SupplyEditInput;
  warehouseAddInput: WarehouseAddInput;
  warehouseEditInput: WarehouseEditInput;
  warehouseSearchInput: WarehouseSearchInput;
}>;

export type AuthorizeRoleDirectiveArgs = {
  previlege?: Maybe<RolePrevileges>;
};

export type AuthorizeRoleDirectiveResolver<Result, Parent, ContextType = IResolverContext, Args = AuthorizeRoleDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type AddWarehouseStaffPayloadResolvers<ContextType = IResolverContext, ParentType extends ResolversParentTypes['AddWarehouseStaffPayload'] = ResolversParentTypes['AddWarehouseStaffPayload']> = ResolversObject<{
  added?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CategoryResolvers<ContextType = IResolverContext, ParentType extends ResolversParentTypes['Category'] = ResolversParentTypes['Category']> = ResolversObject<{
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CategoryAddPayloadResolvers<ContextType = IResolverContext, ParentType extends ResolversParentTypes['CategoryAddPayload'] = ResolversParentTypes['CategoryAddPayload']> = ResolversObject<{
  added?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  newAdded?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CategoryAddSubscriptionResolvers<ContextType = IResolverContext, ParentType extends ResolversParentTypes['CategoryAddSubscription'] = ResolversParentTypes['CategoryAddSubscription']> = ResolversObject<{
  error?: Resolver<Maybe<ResolversTypes['Error']>, ParentType, ContextType>;
  payload?: Resolver<ResolversTypes['SubscriptionPayload'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CategoryDeletePayloadResolvers<ContextType = IResolverContext, ParentType extends ResolversParentTypes['CategoryDeletePayload'] = ResolversParentTypes['CategoryDeletePayload']> = ResolversObject<{
  deleted?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CategoryDeleteSubscriptionResolvers<ContextType = IResolverContext, ParentType extends ResolversParentTypes['CategoryDeleteSubscription'] = ResolversParentTypes['CategoryDeleteSubscription']> = ResolversObject<{
  error?: Resolver<Maybe<ResolversTypes['Error']>, ParentType, ContextType>;
  payload?: Resolver<ResolversTypes['SubscriptionPayload'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CategoryEditPayloadResolvers<ContextType = IResolverContext, ParentType extends ResolversParentTypes['CategoryEditPayload'] = ResolversParentTypes['CategoryEditPayload']> = ResolversObject<{
  edited?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  newValue?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  oldValue?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CategoryEditSubscriptionResolvers<ContextType = IResolverContext, ParentType extends ResolversParentTypes['CategoryEditSubscription'] = ResolversParentTypes['CategoryEditSubscription']> = ResolversObject<{
  error?: Resolver<Maybe<ResolversTypes['Error']>, ParentType, ContextType>;
  payload?: Resolver<ResolversTypes['SubscriptionPayload'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CategoryPayloadResolvers<ContextType = IResolverContext, ParentType extends ResolversParentTypes['CategoryPayload'] = ResolversParentTypes['CategoryPayload']> = ResolversObject<{
  categories?: Resolver<Array<ResolversTypes['Category']>, ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  pagins?: Resolver<Maybe<ResolversTypes['Pagins']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CustomerResolvers<ContextType = IResolverContext, ParentType extends ResolversParentTypes['Customer'] = ResolversParentTypes['Customer']> = ResolversObject<{
  address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  beneficiary?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  customerID?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  metas?: Resolver<Maybe<ResolversTypes['CustomerMetaData']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  phoneNumber?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  purchases?: Resolver<Array<ResolversTypes['Sale']>, ParentType, ContextType>;
  warehouse?: Resolver<Maybe<ResolversTypes['Warehouse']>, ParentType, ContextType>;
  warehouseID?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CustomerAddPayloadResolvers<ContextType = IResolverContext, ParentType extends ResolversParentTypes['CustomerAddPayload'] = ResolversParentTypes['CustomerAddPayload']> = ResolversObject<{
  added?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  newAdded?: Resolver<Maybe<ResolversTypes['Customer']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CustomerDeletePayloadResolvers<ContextType = IResolverContext, ParentType extends ResolversParentTypes['CustomerDeletePayload'] = ResolversParentTypes['CustomerDeletePayload']> = ResolversObject<{
  deleted?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CustomerEditPayloadResolvers<ContextType = IResolverContext, ParentType extends ResolversParentTypes['CustomerEditPayload'] = ResolversParentTypes['CustomerEditPayload']> = ResolversObject<{
  edited?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  newEdited?: Resolver<Maybe<ResolversTypes['Customer']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CustomerMetaDataResolvers<ContextType = IResolverContext, ParentType extends ResolversParentTypes['CustomerMetaData'] = ResolversParentTypes['CustomerMetaData']> = ResolversObject<{
  avatarURL?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  dateOfBirth?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  socialMedia?: Resolver<Maybe<ResolversTypes['CustomerSocialMedia']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CustomerPayloadResolvers<ContextType = IResolverContext, ParentType extends ResolversParentTypes['CustomerPayload'] = ResolversParentTypes['CustomerPayload']> = ResolversObject<{
  customer?: Resolver<Maybe<ResolversTypes['Customer']>, ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CustomerSocialMediaResolvers<ContextType = IResolverContext, ParentType extends ResolversParentTypes['CustomerSocialMedia'] = ResolversParentTypes['CustomerSocialMedia']> = ResolversObject<{
  facebook?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  instagram?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  twitter?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CustomersPayloadResolvers<ContextType = IResolverContext, ParentType extends ResolversParentTypes['CustomersPayload'] = ResolversParentTypes['CustomersPayload']> = ResolversObject<{
  customers?: Resolver<Array<ResolversTypes['Customer']>, ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  pagins?: Resolver<Maybe<ResolversTypes['Pagins']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type EnterpriseResolvers<ContextType = IResolverContext, ParentType extends ResolversParentTypes['Enterprise'] = ResolversParentTypes['Enterprise']> = ResolversObject<{
  about?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  contacts?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  customers?: Resolver<Array<ResolversTypes['Customer']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  owners?: Resolver<Array<ResolversTypes['EnterpriseOwner']>, ParentType, ContextType>;
  products?: Resolver<Array<ResolversTypes['Product']>, ParentType, ContextType>;
  slogan?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  socialAccounts?: Resolver<Maybe<ResolversTypes['EnterpriseSocialAccounts']>, ParentType, ContextType>;
  staffs?: Resolver<Array<ResolversTypes['Staff']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  warehouses?: Resolver<Array<ResolversTypes['Warehouse']>, ParentType, ContextType>;
  website?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type EnterpriseAddPayloadResolvers<ContextType = IResolverContext, ParentType extends ResolversParentTypes['EnterpriseAddPayload'] = ResolversParentTypes['EnterpriseAddPayload']> = ResolversObject<{
  added?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  newAdded?: Resolver<Maybe<ResolversTypes['Enterprise']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type EnterpriseEditPayloadResolvers<ContextType = IResolverContext, ParentType extends ResolversParentTypes['EnterpriseEditPayload'] = ResolversParentTypes['EnterpriseEditPayload']> = ResolversObject<{
  edited?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  newEdited?: Resolver<Maybe<ResolversTypes['Enterprise']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type EnterpriseOwnerResolvers<ContextType = IResolverContext, ParentType extends ResolversParentTypes['EnterpriseOwner'] = ResolversParentTypes['EnterpriseOwner']> = ResolversObject<{
  about?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  phoneNumber?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  picture?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  socialAccounts?: Resolver<Maybe<ResolversTypes['EnterpriseSocialAccounts']>, ParentType, ContextType>;
  website?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type EnterpriseSocialAccountsResolvers<ContextType = IResolverContext, ParentType extends ResolversParentTypes['EnterpriseSocialAccounts'] = ResolversParentTypes['EnterpriseSocialAccounts']> = ResolversObject<{
  facebook?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  instagram?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  twitter?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  youtube?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ErrorResolvers<ContextType = IResolverContext, ParentType extends ResolversParentTypes['Error'] = ResolversParentTypes['Error']> = ResolversObject<{
  code?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type FeatureResolvers<ContextType = IResolverContext, ParentType extends ResolversParentTypes['Feature'] = ResolversParentTypes['Feature']> = ResolversObject<{
  extension?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  fileName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  filePath?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  size?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type IProductResolvers<ContextType = IResolverContext, ParentType extends ResolversParentTypes['IProduct'] = ResolversParentTypes['IProduct']> = ResolversObject<{
  __resolveType: TypeResolveFn<'Product' | 'SaleProduct', ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  expirationDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  expired?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  features?: Resolver<Maybe<Array<Maybe<ResolversTypes['Feature']>>>, ParentType, ContextType>;
  inStock?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  productID?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  quantity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  retailPrice?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  warehouses?: Resolver<Maybe<Array<ResolversTypes['Warehouse']>>, ParentType, ContextType>;
  wholesalePrice?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
}>;

export type ISubscriptionResolvers<ContextType = IResolverContext, ParentType extends ResolversParentTypes['ISubscription'] = ResolversParentTypes['ISubscription']> = ResolversObject<{
  __resolveType: TypeResolveFn<'CategoryAddSubscription' | 'CategoryDeleteSubscription' | 'CategoryEditSubscription' | 'ProductAddSubscription' | 'ProductDeleteSubscription' | 'ProductEditSubscription' | 'SaleAddSubscription' | 'SaleDeleteSubscription' | 'SaleEditSubscription' | 'StaffAddSubscription' | 'StaffDeleteSubscription' | 'SupplyAddSubscription' | 'SupplyDeleteSubscription' | 'SupplyEditSubscription' | 'WarehouseAddSubscription' | 'WarehouseDeleteSubscription' | 'WarehouseEditSubscription', ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['Error']>, ParentType, ContextType>;
  payload?: Resolver<ResolversTypes['SubscriptionPayload'], ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = IResolverContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  _initializeSys?: Resolver<ResolversTypes['initPayload'], ParentType, ContextType, RequireFields<Mutation_InitializeSysArgs, '_init'>>;
  categoryAdd?: Resolver<ResolversTypes['CategoryAddPayload'], ParentType, ContextType, RequireFields<MutationCategoryAddArgs, 'categoryAddInput'>>;
  categoryDelete?: Resolver<ResolversTypes['CategoryDeletePayload'], ParentType, ContextType, RequireFields<MutationCategoryDeleteArgs, 'category'>>;
  categoryEdit?: Resolver<ResolversTypes['CategoryEditPayload'], ParentType, ContextType, RequireFields<MutationCategoryEditArgs, 'categoryEditInput'>>;
  customerAdd?: Resolver<ResolversTypes['CustomerAddPayload'], ParentType, ContextType, RequireFields<MutationCustomerAddArgs, 'customerAddInput'>>;
  customerDelete?: Resolver<ResolversTypes['CustomerDeletePayload'], ParentType, ContextType, RequireFields<MutationCustomerDeleteArgs, 'customerDeleteInput'>>;
  customerEdit?: Resolver<ResolversTypes['CustomerEditPayload'], ParentType, ContextType, RequireFields<MutationCustomerEditArgs, 'customerEditInput'>>;
  enterpriseAdd?: Resolver<ResolversTypes['EnterpriseAddPayload'], ParentType, ContextType, RequireFields<MutationEnterpriseAddArgs, 'enterpriseAddInput'>>;
  enterpriseEdit?: Resolver<ResolversTypes['EnterpriseEditPayload'], ParentType, ContextType, RequireFields<MutationEnterpriseEditArgs, 'enterpriseEditInput'>>;
  makeSupply?: Resolver<ResolversTypes['SupplyAddPayload'], ParentType, ContextType, RequireFields<MutationMakeSupplyArgs, 'supplyAddInput'>>;
  productAdd?: Resolver<ResolversTypes['ProductAddPayload'], ParentType, ContextType, RequireFields<MutationProductAddArgs, 'productAddInput'>>;
  productDelete?: Resolver<ResolversTypes['ProductDeletePayload'], ParentType, ContextType, RequireFields<MutationProductDeleteArgs, 'productID'>>;
  productEdit?: Resolver<ResolversTypes['ProductEditPayload'], ParentType, ContextType, RequireFields<MutationProductEditArgs, 'productEditInput'>>;
  saleAdd?: Resolver<ResolversTypes['SaleAddPayload'], ParentType, ContextType, RequireFields<MutationSaleAddArgs, 'saleAddInput'>>;
  saleDelete?: Resolver<ResolversTypes['SaleDeletePayload'], ParentType, ContextType, RequireFields<MutationSaleDeleteArgs, 'saleID'>>;
  saleEdit?: Resolver<ResolversTypes['SaleEditPayload'], ParentType, ContextType, RequireFields<MutationSaleEditArgs, 'saleEditInput'>>;
  staffAdd?: Resolver<ResolversTypes['StaffAddPayload'], ParentType, ContextType, RequireFields<MutationStaffAddArgs, 'staffAddInput'>>;
  staffDelete?: Resolver<ResolversTypes['StaffDeletePayload'], ParentType, ContextType, RequireFields<MutationStaffDeleteArgs, 'staffID'>>;
  staffEdit?: Resolver<ResolversTypes['StaffEditPayload'], ParentType, ContextType, RequireFields<MutationStaffEditArgs, 'staffEditInput'>>;
  supplyDelete?: Resolver<ResolversTypes['SupplyDeletePayload'], ParentType, ContextType, RequireFields<MutationSupplyDeleteArgs, 'supplyDeleteInput'>>;
  supplyEdit?: Resolver<ResolversTypes['SupplyEditPayload'], ParentType, ContextType, RequireFields<MutationSupplyEditArgs, 'supplyEditInput' | 'supplyID'>>;
  warehouseAdd?: Resolver<ResolversTypes['WarehouseAddPayload'], ParentType, ContextType, RequireFields<MutationWarehouseAddArgs, 'warehouseAddInput'>>;
  warehouseDelete?: Resolver<ResolversTypes['WarehouseDeletePayload'], ParentType, ContextType, RequireFields<MutationWarehouseDeleteArgs, 'warehouseID'>>;
  warehouseEdit?: Resolver<ResolversTypes['WarehouseEditPayload'], ParentType, ContextType, RequireFields<MutationWarehouseEditArgs, 'warehouseEditInput'>>;
}>;

export interface ObjectScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Object'], any> {
  name: 'Object';
}

export type PaginsResolvers<ContextType = IResolverContext, ParentType extends ResolversParentTypes['Pagins'] = ResolversParentTypes['Pagins']> = ResolversObject<{
  currentPageIndex?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  nextPageIndex?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  sort?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  totalDocuments?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  totalPaginated?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ProductResolvers<ContextType = IResolverContext, ParentType extends ResolversParentTypes['Product'] = ResolversParentTypes['Product']> = ResolversObject<{
  category?: Resolver<ResolversTypes['Category'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  expirationDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  expired?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  features?: Resolver<Maybe<Array<Maybe<ResolversTypes['Feature']>>>, ParentType, ContextType>;
  inStock?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  productID?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  quantity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  retailPrice?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  warehouses?: Resolver<Maybe<Array<ResolversTypes['Warehouse']>>, ParentType, ContextType>;
  wholesalePrice?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ProductAddPayloadResolvers<ContextType = IResolverContext, ParentType extends ResolversParentTypes['ProductAddPayload'] = ResolversParentTypes['ProductAddPayload']> = ResolversObject<{
  added?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  newAdded?: Resolver<Maybe<ResolversTypes['Product']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ProductAddSubscriptionResolvers<ContextType = IResolverContext, ParentType extends ResolversParentTypes['ProductAddSubscription'] = ResolversParentTypes['ProductAddSubscription']> = ResolversObject<{
  error?: Resolver<Maybe<ResolversTypes['Error']>, ParentType, ContextType>;
  payload?: Resolver<ResolversTypes['SubscriptionPayload'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ProductDeletePayloadResolvers<ContextType = IResolverContext, ParentType extends ResolversParentTypes['ProductDeletePayload'] = ResolversParentTypes['ProductDeletePayload']> = ResolversObject<{
  deleted?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ProductDeleteSubscriptionResolvers<ContextType = IResolverContext, ParentType extends ResolversParentTypes['ProductDeleteSubscription'] = ResolversParentTypes['ProductDeleteSubscription']> = ResolversObject<{
  error?: Resolver<Maybe<ResolversTypes['Error']>, ParentType, ContextType>;
  payload?: Resolver<ResolversTypes['SubscriptionPayload'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ProductEditPayloadResolvers<ContextType = IResolverContext, ParentType extends ResolversParentTypes['ProductEditPayload'] = ResolversParentTypes['ProductEditPayload']> = ResolversObject<{
  edited?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  newEdited?: Resolver<Maybe<ResolversTypes['Product']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ProductEditSubscriptionResolvers<ContextType = IResolverContext, ParentType extends ResolversParentTypes['ProductEditSubscription'] = ResolversParentTypes['ProductEditSubscription']> = ResolversObject<{
  error?: Resolver<Maybe<ResolversTypes['Error']>, ParentType, ContextType>;
  payload?: Resolver<ResolversTypes['SubscriptionPayload'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ProductPayloadResolvers<ContextType = IResolverContext, ParentType extends ResolversParentTypes['ProductPayload'] = ResolversParentTypes['ProductPayload']> = ResolversObject<{
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  product?: Resolver<Maybe<ResolversTypes['Product']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ProductsPayloadResolvers<ContextType = IResolverContext, ParentType extends ResolversParentTypes['ProductsPayload'] = ResolversParentTypes['ProductsPayload']> = ResolversObject<{
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  pagins?: Resolver<Maybe<ResolversTypes['Pagins']>, ParentType, ContextType>;
  products?: Resolver<Array<ResolversTypes['Product']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = IResolverContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  categories?: Resolver<ResolversTypes['CategoryPayload'], ParentType, ContextType, Partial<QueryCategoriesArgs>>;
  customer?: Resolver<ResolversTypes['CustomerPayload'], ParentType, ContextType, RequireFields<QueryCustomerArgs, 'searchTerm'>>;
  customers?: Resolver<ResolversTypes['CustomersPayload'], ParentType, ContextType, Partial<QueryCustomersArgs>>;
  product?: Resolver<ResolversTypes['ProductPayload'], ParentType, ContextType, RequireFields<QueryProductArgs, 'searchTerm'>>;
  products?: Resolver<ResolversTypes['ProductsPayload'], ParentType, ContextType, Partial<QueryProductsArgs>>;
  sale?: Resolver<ResolversTypes['SalePayload'], ParentType, ContextType, RequireFields<QuerySaleArgs, 'searchTerm'>>;
  sales?: Resolver<ResolversTypes['SalesPayload'], ParentType, ContextType, Partial<QuerySalesArgs>>;
  staff?: Resolver<ResolversTypes['StaffPayload'], ParentType, ContextType, RequireFields<QueryStaffArgs, 'searchTerm'>>;
  staffs?: Resolver<ResolversTypes['StaffsPayload'], ParentType, ContextType, Partial<QueryStaffsArgs>>;
  store?: Resolver<ResolversTypes['Store'], ParentType, ContextType>;
  supplies?: Resolver<ResolversTypes['SupplysPayload'], ParentType, ContextType, Partial<QuerySuppliesArgs>>;
  supply?: Resolver<ResolversTypes['SupplyPayload'], ParentType, ContextType, RequireFields<QuerySupplyArgs, 'searchTerm'>>;
  warehouse?: Resolver<ResolversTypes['WarehousePayload'], ParentType, ContextType, RequireFields<QueryWarehouseArgs, 'searchTerm'>>;
  warehouses?: Resolver<ResolversTypes['WarehousesPayload'], ParentType, ContextType, Partial<QueryWarehousesArgs>>;
}>;

export type SaleResolvers<ContextType = IResolverContext, ParentType extends ResolversParentTypes['Sale'] = ResolversParentTypes['Sale']> = ResolversObject<{
  balance?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  customer?: Resolver<ResolversTypes['Customer'], ParentType, ContextType>;
  customerID?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  date?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  discount?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  paid?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  products?: Resolver<Array<ResolversTypes['SaleProduct']>, ParentType, ContextType>;
  profit?: Resolver<Maybe<ResolversTypes['SaleProfit']>, ParentType, ContextType>;
  saleID?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  staff?: Resolver<ResolversTypes['Staff'], ParentType, ContextType>;
  staffID?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  time?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  totalPrice?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  totalQuantity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  warehouse?: Resolver<Maybe<ResolversTypes['Warehouse']>, ParentType, ContextType>;
  warehouseID?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SaleAddPayloadResolvers<ContextType = IResolverContext, ParentType extends ResolversParentTypes['SaleAddPayload'] = ResolversParentTypes['SaleAddPayload']> = ResolversObject<{
  added?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  newAdded?: Resolver<Maybe<ResolversTypes['Sale']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SaleAddSubscriptionResolvers<ContextType = IResolverContext, ParentType extends ResolversParentTypes['SaleAddSubscription'] = ResolversParentTypes['SaleAddSubscription']> = ResolversObject<{
  error?: Resolver<Maybe<ResolversTypes['Error']>, ParentType, ContextType>;
  payload?: Resolver<ResolversTypes['SubscriptionPayload'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SaleDeletePayloadResolvers<ContextType = IResolverContext, ParentType extends ResolversParentTypes['SaleDeletePayload'] = ResolversParentTypes['SaleDeletePayload']> = ResolversObject<{
  deleted?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SaleDeleteSubscriptionResolvers<ContextType = IResolverContext, ParentType extends ResolversParentTypes['SaleDeleteSubscription'] = ResolversParentTypes['SaleDeleteSubscription']> = ResolversObject<{
  error?: Resolver<Maybe<ResolversTypes['Error']>, ParentType, ContextType>;
  payload?: Resolver<ResolversTypes['SubscriptionPayload'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SaleEditPayloadResolvers<ContextType = IResolverContext, ParentType extends ResolversParentTypes['SaleEditPayload'] = ResolversParentTypes['SaleEditPayload']> = ResolversObject<{
  edited?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  newEdited?: Resolver<Maybe<ResolversTypes['Sale']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SaleEditSubscriptionResolvers<ContextType = IResolverContext, ParentType extends ResolversParentTypes['SaleEditSubscription'] = ResolversParentTypes['SaleEditSubscription']> = ResolversObject<{
  error?: Resolver<Maybe<ResolversTypes['Error']>, ParentType, ContextType>;
  payload?: Resolver<ResolversTypes['SubscriptionPayload'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SalePayloadResolvers<ContextType = IResolverContext, ParentType extends ResolversParentTypes['SalePayload'] = ResolversParentTypes['SalePayload']> = ResolversObject<{
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sale?: Resolver<Maybe<ResolversTypes['Sale']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SaleProductResolvers<ContextType = IResolverContext, ParentType extends ResolversParentTypes['SaleProduct'] = ResolversParentTypes['SaleProduct']> = ResolversObject<{
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  expirationDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  expired?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  features?: Resolver<Maybe<Array<Maybe<ResolversTypes['Feature']>>>, ParentType, ContextType>;
  inStock?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  kind?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  productID?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  quantity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  retailPrice?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  subTotal?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  warehouses?: Resolver<Maybe<Array<ResolversTypes['Warehouse']>>, ParentType, ContextType>;
  wholesalePrice?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SaleProfitResolvers<ContextType = IResolverContext, ParentType extends ResolversParentTypes['SaleProfit'] = ResolversParentTypes['SaleProfit']> = ResolversObject<{
  percentage?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SalesPayloadResolvers<ContextType = IResolverContext, ParentType extends ResolversParentTypes['SalesPayload'] = ResolversParentTypes['SalesPayload']> = ResolversObject<{
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  pagins?: Resolver<Maybe<ResolversTypes['Pagins']>, ParentType, ContextType>;
  sales?: Resolver<Array<ResolversTypes['Sale']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type StaffResolvers<ContextType = IResolverContext, ParentType extends ResolversParentTypes['Staff'] = ResolversParentTypes['Staff']> = ResolversObject<{
  address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  otherName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  password?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  phoneNumber?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  picture?: Resolver<Maybe<ResolversTypes['Feature']>, ParentType, ContextType>;
  role?: Resolver<ResolversTypes['StaffRole'], ParentType, ContextType>;
  staffID?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  warehouse?: Resolver<Maybe<ResolversTypes['Warehouse']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type StaffAddPayloadResolvers<ContextType = IResolverContext, ParentType extends ResolversParentTypes['StaffAddPayload'] = ResolversParentTypes['StaffAddPayload']> = ResolversObject<{
  added?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  newAdded?: Resolver<Maybe<ResolversTypes['Staff']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type StaffAddSubscriptionResolvers<ContextType = IResolverContext, ParentType extends ResolversParentTypes['StaffAddSubscription'] = ResolversParentTypes['StaffAddSubscription']> = ResolversObject<{
  error?: Resolver<Maybe<ResolversTypes['Error']>, ParentType, ContextType>;
  payload?: Resolver<ResolversTypes['SubscriptionPayload'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type StaffDeletePayloadResolvers<ContextType = IResolverContext, ParentType extends ResolversParentTypes['StaffDeletePayload'] = ResolversParentTypes['StaffDeletePayload']> = ResolversObject<{
  deleted?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type StaffDeleteSubscriptionResolvers<ContextType = IResolverContext, ParentType extends ResolversParentTypes['StaffDeleteSubscription'] = ResolversParentTypes['StaffDeleteSubscription']> = ResolversObject<{
  error?: Resolver<Maybe<ResolversTypes['Error']>, ParentType, ContextType>;
  payload?: Resolver<ResolversTypes['SubscriptionPayload'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type StaffEditPayloadResolvers<ContextType = IResolverContext, ParentType extends ResolversParentTypes['StaffEditPayload'] = ResolversParentTypes['StaffEditPayload']> = ResolversObject<{
  edited?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  newEdited?: Resolver<Maybe<ResolversTypes['Staff']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type StaffPayloadResolvers<ContextType = IResolverContext, ParentType extends ResolversParentTypes['StaffPayload'] = ResolversParentTypes['StaffPayload']> = ResolversObject<{
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  staff?: Resolver<Maybe<ResolversTypes['Staff']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type StaffsPayloadResolvers<ContextType = IResolverContext, ParentType extends ResolversParentTypes['StaffsPayload'] = ResolversParentTypes['StaffsPayload']> = ResolversObject<{
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  pagin?: Resolver<Maybe<ResolversTypes['Pagins']>, ParentType, ContextType>;
  staffs?: Resolver<Array<ResolversTypes['Staff']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type StoreResolvers<ContextType = IResolverContext, ParentType extends ResolversParentTypes['Store'] = ResolversParentTypes['Store']> = ResolversObject<{
  _enterpriseInitialized?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  _sysInitialized?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  enterPrise?: Resolver<Maybe<ResolversTypes['enterprisePayload']>, ParentType, ContextType>;
  totalCustomers?: Resolver<Maybe<ResolversTypes['StorePayload']>, ParentType, ContextType>;
  totalExpiredProducts?: Resolver<Maybe<ResolversTypes['StorePayload']>, ParentType, ContextType>;
  totalProducts?: Resolver<Maybe<ResolversTypes['StorePayload']>, ParentType, ContextType>;
  totalSales?: Resolver<Maybe<ResolversTypes['StorePayload']>, ParentType, ContextType>;
  totalStaffs?: Resolver<Maybe<ResolversTypes['StorePayload']>, ParentType, ContextType>;
  totalWarehouses?: Resolver<Maybe<ResolversTypes['StorePayload']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type StorePayloadResolvers<ContextType = IResolverContext, ParentType extends ResolversParentTypes['StorePayload'] = ResolversParentTypes['StorePayload']> = ResolversObject<{
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  result?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type StoreRealTimeResolvers<ContextType = IResolverContext, ParentType extends ResolversParentTypes['StoreRealTime'] = ResolversParentTypes['StoreRealTime']> = ResolversObject<{
  totalCustomers?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalExpiredProducts?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalProducts?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalSales?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalStaffs?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalWarehouses?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SubscriptionResolvers<ContextType = IResolverContext, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = ResolversObject<{
  categoryAddSubscription?: SubscriptionResolver<ResolversTypes['CategoryAddSubscription'], "categoryAddSubscription", ParentType, ContextType>;
  categoryDeleteSubscription?: SubscriptionResolver<ResolversTypes['CategoryDeleteSubscription'], "categoryDeleteSubscription", ParentType, ContextType>;
  categoryEditSubscription?: SubscriptionResolver<ResolversTypes['CategoryEditSubscription'], "categoryEditSubscription", ParentType, ContextType>;
  productAddSubscription?: SubscriptionResolver<ResolversTypes['ProductAddSubscription'], "productAddSubscription", ParentType, ContextType>;
  productDeleteSubscription?: SubscriptionResolver<ResolversTypes['ProductDeleteSubscription'], "productDeleteSubscription", ParentType, ContextType>;
  productEditSubscription?: SubscriptionResolver<ResolversTypes['ProductEditSubscription'], "productEditSubscription", ParentType, ContextType>;
  saleAddSubscription?: SubscriptionResolver<ResolversTypes['SaleAddSubscription'], "saleAddSubscription", ParentType, ContextType>;
  saleDeleteSubscription?: SubscriptionResolver<ResolversTypes['SaleDeleteSubscription'], "saleDeleteSubscription", ParentType, ContextType>;
  saleEditSubscription?: SubscriptionResolver<ResolversTypes['SaleEditSubscription'], "saleEditSubscription", ParentType, ContextType>;
  staffAddSubscription?: SubscriptionResolver<ResolversTypes['SaleAddSubscription'], "staffAddSubscription", ParentType, ContextType>;
  staffDeleteSubscription?: SubscriptionResolver<ResolversTypes['SaleDeleteSubscription'], "staffDeleteSubscription", ParentType, ContextType>;
  storeRealTime?: SubscriptionResolver<ResolversTypes['StoreRealTime'], "storeRealTime", ParentType, ContextType>;
  supplyAddSubscription?: SubscriptionResolver<ResolversTypes['SupplyAddSubscription'], "supplyAddSubscription", ParentType, ContextType>;
  supplyDeleteSubscription?: SubscriptionResolver<ResolversTypes['SupplyDeleteSubscription'], "supplyDeleteSubscription", ParentType, ContextType>;
  supplyEditSubscription?: SubscriptionResolver<ResolversTypes['SupplyEditSubscription'], "supplyEditSubscription", ParentType, ContextType>;
  warehouseAddSubscription?: SubscriptionResolver<ResolversTypes['WarehouseAddSubscription'], "warehouseAddSubscription", ParentType, ContextType>;
  warehouseDeleteSubscription?: SubscriptionResolver<ResolversTypes['WarehouseDeleteSubscription'], "warehouseDeleteSubscription", ParentType, ContextType>;
  warehouseEditSubscription?: SubscriptionResolver<ResolversTypes['WarehouseEditSubscription'], "warehouseEditSubscription", ParentType, ContextType>;
}>;

export type SubscriptionPayloadResolvers<ContextType = IResolverContext, ParentType extends ResolversParentTypes['SubscriptionPayload'] = ResolversParentTypes['SubscriptionPayload']> = ResolversObject<{
  actionBy?: Resolver<ResolversTypes['Staff'], ParentType, ContextType>;
  actionResult?: Resolver<ResolversTypes['Type'], ParentType, ContextType>;
  actionType?: Resolver<Maybe<ResolversTypes['SubscriptionActionType']>, ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SupplyResolvers<ContextType = IResolverContext, ParentType extends ResolversParentTypes['Supply'] = ResolversParentTypes['Supply']> = ResolversObject<{
  date?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  productIDs?: Resolver<Maybe<Array<ResolversTypes['ID']>>, ParentType, ContextType>;
  products?: Resolver<Maybe<Array<ResolversTypes['Product']>>, ParentType, ContextType>;
  staff?: Resolver<Maybe<ResolversTypes['Staff']>, ParentType, ContextType>;
  staffID?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  supplyID?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  totalPrice?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  totalQuantity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SupplyAddPayloadResolvers<ContextType = IResolverContext, ParentType extends ResolversParentTypes['SupplyAddPayload'] = ResolversParentTypes['SupplyAddPayload']> = ResolversObject<{
  added?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  newAdded?: Resolver<Maybe<ResolversTypes['Supply']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SupplyAddSubscriptionResolvers<ContextType = IResolverContext, ParentType extends ResolversParentTypes['SupplyAddSubscription'] = ResolversParentTypes['SupplyAddSubscription']> = ResolversObject<{
  error?: Resolver<Maybe<ResolversTypes['Error']>, ParentType, ContextType>;
  payload?: Resolver<ResolversTypes['SubscriptionPayload'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SupplyDeletePayloadResolvers<ContextType = IResolverContext, ParentType extends ResolversParentTypes['SupplyDeletePayload'] = ResolversParentTypes['SupplyDeletePayload']> = ResolversObject<{
  deleted?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SupplyDeleteSubscriptionResolvers<ContextType = IResolverContext, ParentType extends ResolversParentTypes['SupplyDeleteSubscription'] = ResolversParentTypes['SupplyDeleteSubscription']> = ResolversObject<{
  error?: Resolver<Maybe<ResolversTypes['Error']>, ParentType, ContextType>;
  payload?: Resolver<ResolversTypes['SubscriptionPayload'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SupplyEditPayloadResolvers<ContextType = IResolverContext, ParentType extends ResolversParentTypes['SupplyEditPayload'] = ResolversParentTypes['SupplyEditPayload']> = ResolversObject<{
  edited?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  newEdited?: Resolver<Maybe<ResolversTypes['Supply']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SupplyEditSubscriptionResolvers<ContextType = IResolverContext, ParentType extends ResolversParentTypes['SupplyEditSubscription'] = ResolversParentTypes['SupplyEditSubscription']> = ResolversObject<{
  error?: Resolver<Maybe<ResolversTypes['Error']>, ParentType, ContextType>;
  payload?: Resolver<ResolversTypes['SubscriptionPayload'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SupplyPayloadResolvers<ContextType = IResolverContext, ParentType extends ResolversParentTypes['SupplyPayload'] = ResolversParentTypes['SupplyPayload']> = ResolversObject<{
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  supply?: Resolver<Maybe<ResolversTypes['Supply']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SupplysPayloadResolvers<ContextType = IResolverContext, ParentType extends ResolversParentTypes['SupplysPayload'] = ResolversParentTypes['SupplysPayload']> = ResolversObject<{
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  pagins?: Resolver<Maybe<ResolversTypes['Pagins']>, ParentType, ContextType>;
  supplies?: Resolver<Maybe<Array<ResolversTypes['Supply']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TypeResolvers<ContextType = IResolverContext, ParentType extends ResolversParentTypes['Type'] = ResolversParentTypes['Type']> = ResolversObject<{
  __resolveType: TypeResolveFn<'Category' | 'Customer' | 'Product' | 'Sale' | 'Staff' | 'Store' | 'Supply' | 'Warehouse', ParentType, ContextType>;
}>;

export type WarehouseResolvers<ContextType = IResolverContext, ParentType extends ResolversParentTypes['Warehouse'] = ResolversParentTypes['Warehouse']> = ResolversObject<{
  address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  productIDs?: Resolver<Array<ResolversTypes['ID']>, ParentType, ContextType>;
  products?: Resolver<Array<ResolversTypes['Product']>, ParentType, ContextType>;
  staffIDs?: Resolver<Array<ResolversTypes['ID']>, ParentType, ContextType>;
  staffs?: Resolver<Array<ResolversTypes['Staff']>, ParentType, ContextType>;
  warehouseID?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type WarehouseAddPayloadResolvers<ContextType = IResolverContext, ParentType extends ResolversParentTypes['WarehouseAddPayload'] = ResolversParentTypes['WarehouseAddPayload']> = ResolversObject<{
  added?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  newAdded?: Resolver<Maybe<ResolversTypes['Warehouse']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type WarehouseAddSubscriptionResolvers<ContextType = IResolverContext, ParentType extends ResolversParentTypes['WarehouseAddSubscription'] = ResolversParentTypes['WarehouseAddSubscription']> = ResolversObject<{
  error?: Resolver<Maybe<ResolversTypes['Error']>, ParentType, ContextType>;
  payload?: Resolver<ResolversTypes['SubscriptionPayload'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type WarehouseDeletePayloadResolvers<ContextType = IResolverContext, ParentType extends ResolversParentTypes['WarehouseDeletePayload'] = ResolversParentTypes['WarehouseDeletePayload']> = ResolversObject<{
  deleted?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type WarehouseDeleteSubscriptionResolvers<ContextType = IResolverContext, ParentType extends ResolversParentTypes['WarehouseDeleteSubscription'] = ResolversParentTypes['WarehouseDeleteSubscription']> = ResolversObject<{
  error?: Resolver<Maybe<ResolversTypes['Error']>, ParentType, ContextType>;
  payload?: Resolver<ResolversTypes['SubscriptionPayload'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type WarehouseEditPayloadResolvers<ContextType = IResolverContext, ParentType extends ResolversParentTypes['WarehouseEditPayload'] = ResolversParentTypes['WarehouseEditPayload']> = ResolversObject<{
  edited?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  newEdited?: Resolver<Maybe<ResolversTypes['Warehouse']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type WarehouseEditSubscriptionResolvers<ContextType = IResolverContext, ParentType extends ResolversParentTypes['WarehouseEditSubscription'] = ResolversParentTypes['WarehouseEditSubscription']> = ResolversObject<{
  error?: Resolver<Maybe<ResolversTypes['Error']>, ParentType, ContextType>;
  payload?: Resolver<ResolversTypes['SubscriptionPayload'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type WarehousePayloadResolvers<ContextType = IResolverContext, ParentType extends ResolversParentTypes['WarehousePayload'] = ResolversParentTypes['WarehousePayload']> = ResolversObject<{
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  warehouse?: Resolver<Maybe<ResolversTypes['Warehouse']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type WarehousesPayloadResolvers<ContextType = IResolverContext, ParentType extends ResolversParentTypes['WarehousesPayload'] = ResolversParentTypes['WarehousesPayload']> = ResolversObject<{
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  warehouses?: Resolver<Array<ResolversTypes['Warehouse']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type EnterprisePayloadResolvers<ContextType = IResolverContext, ParentType extends ResolversParentTypes['enterprisePayload'] = ResolversParentTypes['enterprisePayload']> = ResolversObject<{
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  result?: Resolver<Maybe<ResolversTypes['Enterprise']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type InitPayloadResolvers<ContextType = IResolverContext, ParentType extends ResolversParentTypes['initPayload'] = ResolversParentTypes['initPayload']> = ResolversObject<{
  _initialized?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = IResolverContext> = ResolversObject<{
  AddWarehouseStaffPayload?: AddWarehouseStaffPayloadResolvers<ContextType>;
  Category?: CategoryResolvers<ContextType>;
  CategoryAddPayload?: CategoryAddPayloadResolvers<ContextType>;
  CategoryAddSubscription?: CategoryAddSubscriptionResolvers<ContextType>;
  CategoryDeletePayload?: CategoryDeletePayloadResolvers<ContextType>;
  CategoryDeleteSubscription?: CategoryDeleteSubscriptionResolvers<ContextType>;
  CategoryEditPayload?: CategoryEditPayloadResolvers<ContextType>;
  CategoryEditSubscription?: CategoryEditSubscriptionResolvers<ContextType>;
  CategoryPayload?: CategoryPayloadResolvers<ContextType>;
  Customer?: CustomerResolvers<ContextType>;
  CustomerAddPayload?: CustomerAddPayloadResolvers<ContextType>;
  CustomerDeletePayload?: CustomerDeletePayloadResolvers<ContextType>;
  CustomerEditPayload?: CustomerEditPayloadResolvers<ContextType>;
  CustomerMetaData?: CustomerMetaDataResolvers<ContextType>;
  CustomerPayload?: CustomerPayloadResolvers<ContextType>;
  CustomerSocialMedia?: CustomerSocialMediaResolvers<ContextType>;
  CustomersPayload?: CustomersPayloadResolvers<ContextType>;
  Date?: GraphQLScalarType;
  Enterprise?: EnterpriseResolvers<ContextType>;
  EnterpriseAddPayload?: EnterpriseAddPayloadResolvers<ContextType>;
  EnterpriseEditPayload?: EnterpriseEditPayloadResolvers<ContextType>;
  EnterpriseOwner?: EnterpriseOwnerResolvers<ContextType>;
  EnterpriseSocialAccounts?: EnterpriseSocialAccountsResolvers<ContextType>;
  Error?: ErrorResolvers<ContextType>;
  Feature?: FeatureResolvers<ContextType>;
  IProduct?: IProductResolvers<ContextType>;
  ISubscription?: ISubscriptionResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Object?: GraphQLScalarType;
  Pagins?: PaginsResolvers<ContextType>;
  Product?: ProductResolvers<ContextType>;
  ProductAddPayload?: ProductAddPayloadResolvers<ContextType>;
  ProductAddSubscription?: ProductAddSubscriptionResolvers<ContextType>;
  ProductDeletePayload?: ProductDeletePayloadResolvers<ContextType>;
  ProductDeleteSubscription?: ProductDeleteSubscriptionResolvers<ContextType>;
  ProductEditPayload?: ProductEditPayloadResolvers<ContextType>;
  ProductEditSubscription?: ProductEditSubscriptionResolvers<ContextType>;
  ProductPayload?: ProductPayloadResolvers<ContextType>;
  ProductsPayload?: ProductsPayloadResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Sale?: SaleResolvers<ContextType>;
  SaleAddPayload?: SaleAddPayloadResolvers<ContextType>;
  SaleAddSubscription?: SaleAddSubscriptionResolvers<ContextType>;
  SaleDeletePayload?: SaleDeletePayloadResolvers<ContextType>;
  SaleDeleteSubscription?: SaleDeleteSubscriptionResolvers<ContextType>;
  SaleEditPayload?: SaleEditPayloadResolvers<ContextType>;
  SaleEditSubscription?: SaleEditSubscriptionResolvers<ContextType>;
  SalePayload?: SalePayloadResolvers<ContextType>;
  SaleProduct?: SaleProductResolvers<ContextType>;
  SaleProfit?: SaleProfitResolvers<ContextType>;
  SalesPayload?: SalesPayloadResolvers<ContextType>;
  Staff?: StaffResolvers<ContextType>;
  StaffAddPayload?: StaffAddPayloadResolvers<ContextType>;
  StaffAddSubscription?: StaffAddSubscriptionResolvers<ContextType>;
  StaffDeletePayload?: StaffDeletePayloadResolvers<ContextType>;
  StaffDeleteSubscription?: StaffDeleteSubscriptionResolvers<ContextType>;
  StaffEditPayload?: StaffEditPayloadResolvers<ContextType>;
  StaffPayload?: StaffPayloadResolvers<ContextType>;
  StaffsPayload?: StaffsPayloadResolvers<ContextType>;
  Store?: StoreResolvers<ContextType>;
  StorePayload?: StorePayloadResolvers<ContextType>;
  StoreRealTime?: StoreRealTimeResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  SubscriptionPayload?: SubscriptionPayloadResolvers<ContextType>;
  Supply?: SupplyResolvers<ContextType>;
  SupplyAddPayload?: SupplyAddPayloadResolvers<ContextType>;
  SupplyAddSubscription?: SupplyAddSubscriptionResolvers<ContextType>;
  SupplyDeletePayload?: SupplyDeletePayloadResolvers<ContextType>;
  SupplyDeleteSubscription?: SupplyDeleteSubscriptionResolvers<ContextType>;
  SupplyEditPayload?: SupplyEditPayloadResolvers<ContextType>;
  SupplyEditSubscription?: SupplyEditSubscriptionResolvers<ContextType>;
  SupplyPayload?: SupplyPayloadResolvers<ContextType>;
  SupplysPayload?: SupplysPayloadResolvers<ContextType>;
  Type?: TypeResolvers<ContextType>;
  Warehouse?: WarehouseResolvers<ContextType>;
  WarehouseAddPayload?: WarehouseAddPayloadResolvers<ContextType>;
  WarehouseAddSubscription?: WarehouseAddSubscriptionResolvers<ContextType>;
  WarehouseDeletePayload?: WarehouseDeletePayloadResolvers<ContextType>;
  WarehouseDeleteSubscription?: WarehouseDeleteSubscriptionResolvers<ContextType>;
  WarehouseEditPayload?: WarehouseEditPayloadResolvers<ContextType>;
  WarehouseEditSubscription?: WarehouseEditSubscriptionResolvers<ContextType>;
  WarehousePayload?: WarehousePayloadResolvers<ContextType>;
  WarehousesPayload?: WarehousesPayloadResolvers<ContextType>;
  enterprisePayload?: EnterprisePayloadResolvers<ContextType>;
  initPayload?: InitPayloadResolvers<ContextType>;
}>;

export type DirectiveResolvers<ContextType = IResolverContext> = ResolversObject<{
  authorizeRole?: AuthorizeRoleDirectiveResolver<any, any, ContextType>;
}>;

import { buildSchema } from 'graphql';

const Directives = `#graphql
  directive @authorizeRole(previlege: RolePrevileges ) on OBJECT | FIELD_DEFINITION  | SUBSCRIPTION
`;

const Scalars = `#graphql
  scalar Date
  scalar Object
`;

const Unions = `#graphql
  "Representing either one among types"
  union Type = Product | Staff | Category | Warehouse | Sale | Customer | Supply | Store
`;

const Interfaces = `#graphql
  interface ISubscription {
    error: Error,
    payload: SubscriptionPayload!
  }
  interface IProduct {
    productID: ID!
    name: String!
    expired: Boolean
    quantity: Int!
    expirationDate: String
    wholesalePrice: Float!
    retailPrice: Float!
    features: [Feature]
    description: String
    warehouses: [Warehouse!]
  }
`;

const Enums = `#graphql
  "Sorting order in ascending or descending"
  enum Sort {
    asc
    desc
  }

   "Staff Roles previleges this includes Admin, Saller, Manager, Warehouse, Accountant"
   enum StaffRole {
      "Admin Role : Admin has every previlege to ADD,READ,DELETE,EDIT"
      Admin
      "Saller Role : A saller has only the previlege to ADD,READ,EDIT a Sale only."
      Saller
      "Manage Role : Manager has every previlege to ADD,READ,DELETE,EDIT except can not make a sale"
      Manager
      "Warehouse Role : A warehouse staff has every previlege to ADD,READ,DELETE,EDIT on Warehouse only."
      Warehouse
      "Accountant Role : Accountant staff has every previlege to ADD,READ,DELETE,EDIT except to delete a Admin/Manager staff."
      Accountant
   }

   enum RolePrevileges {
      #STAFF
      ALL_STAFF_OPERATIONS,
      ADD_STAFF,
      READ_STAFF,
      UPDATE_STAFF,
      DELETE_STAFF,
      #PRODUCT
      ALL_PRODUCT_OPERATIONS,
      ADD_PRODUCT,
      READ_PRODUCT,
      UPDATE_PRODUCT,
      DELETE_PRODUCT,
      #CATEGORY
      ALL_CATEGORY_OPERATIONS,
      ADD_CATEGORY,
      READ_CATEGORY,
      UPDATE_CATEGORY,
      DELETE_CATEGORY,
      #CUSTOMER
      ALL_CUSTOMER_OPERATIONS,
      ADD_CUSTOMER,
      READ_CUSTOMER,
      UPDATE_CUSTOMER,
      DELETE_CUSTOMER,
      #SALE
      ALL_SALE_OPERATIONS,
      ADD_SALE,
      READ_SALE,
      UPDATE_SALE,
      DELETE_SALE,
      #WAREHOUSE
      ALL_WAREHOUSE_OPERATIONS,
      ADD_WAREHOUSE,
      READ_WAREHOUSE,
      UPDATE_WAREHOUSE,
      DELETE_WAREHOUSE,
      # SUPPLY
      ALL_SUPPLY_OPERATIONS,
      ADD_SUPPLY,
      READ_SUPPLY,
      UPDATE_SUPPLY,
      DELETE_SUPPLY,
      ######### SUBSCRIPTIONS
      # SALES
      LISTEN_ADD_SALE,
      LISTEN_EDIT_SALE,
      LISTEN_DELETE_SALE,
      #PRODUCT
      LISTEN_ADD_PRODUCT,
      LISTEN_EDIT_PRODUCT,
      LISTEN_DELETE_PRODUCT,
      #STAFF
      LISTEN_ADD_STAFF,
      LISTEN_DELETE_STAFF,
      #SUPPLY
      LISTEN_ADD_SUPPLY,
      LISTEN_EDIT_SUPPLY,
      LISTEN_DELETE_SUPPLY,
      #CATEGORY
      LISTEN_ADD_CATEGORY,
      LISTEN_EDIT_CATEGORY,
      LISTEN_DELETE_CATEGORY,
      #WAREHOUSE
      LISTEN_ADD_WAREHOUSE,
      LISTEN_EDIT_WAREHOUSE,
      LISTEN_DELETE_WAREHOUSE,
      #########END SUBSCRIPTION
      # ENTERPRISE
      ADD_ENTERPRISE,
      UPDATE_ENTERPRISE,
      # SYSTEM
      INITIALIZED_SYSTEM,
    }

   "Subscription action type"
   enum SubscriptionActionType {
      Added,
      Edited,
      Deleted,
      Read
    }
`;

const Commons = `#graphql
   
   "Pagination inputs"
   input paginInput {
      "Limit: maximum number of data to return"
      limit: Int
      "Sort: sort the result in Asc (ascending) or Desc (descending) order"
      sort: Sort
      "PageIndex: page index "
      pageIndex: Int
   }
   type Pagins {
      sort: String
      totalPaginated: Int
      totalDocuments: Int
      nextPageIndex: Int
      currentPageIndex: Int
   }
   type Error {
      "message: describing the error message."
      message: String!,
      "status: describing the status of error, i.e INVALID_ARGUMENt, UNAUTHROIZED"
      status: String!,
      "code: representing error code, i.e 401,404"
      code: Int!,
      "success: determine whether the operation successful"
      success: Boolean!
   }

   type SubscriptionPayload {
      timestamp: Date!,
      actionBy: Staff!,
      actionResult: Type!,
      actionType: SubscriptionActionType,
      # __typeName: String! #return the type name and use it in utype to differenciate each return type
    }
`;

const Feature = `#graphql 
   type Feature {
      size: Int
      url: String
      fileName: String
      filePath: String
      extension: String
   }
   enum FeatureEditAction {
      ADD
      REMOVE
   }
   input editFeature {
      action: FeatureEditAction!
      addFeatureURI: [String!]
      removeFeatureByName: String
   }
`;

const Staff = `#graphql
type Staff{
  staffID: ID!
  firstName: String!
  lastName: String!
  otherName: String
  picture: Feature
  email: String
  phoneNumber: String
  role: StaffRole!
  address: String
  password: String!
  token: String!
  warehouse: Warehouse
}
type StaffPayload {
  error: String
  staff: Staff
}
type StaffsPayload {
  error: String
  staffs: [Staff!]!
  pagin: Pagins
}
type StaffAddPayload {
  error: String
  added: Boolean!
  newAdded: Staff
}
type StaffEditPayload {
  error: String
  edited: Boolean!
  newEdited: Staff
}
type StaffDeletePayload {
  error: String
  deleted: Boolean!
}
type StaffAddSubscription implements ISubscription {
  error: Error
  payload: SubscriptionPayload!
}
type StaffDeleteSubscription implements ISubscription {
  error: Error
  payload: SubscriptionPayload!
}
input staffAddInput {
  firstName: String!
  lastName: String!
  otherName: String
  featureURI: String
  email: String
  role: StaffRole!
  address: String
  phoneNumber: String!
  password: String!
  warehouseID: ID
}
input staffEditInput {
  staffID: ID!
  firstName: String
  lastName: String
  otherName: String
  email: String
  role: StaffRole
  address: String
  phoneNumber: String
  password: String
  warehouseID: ID
  editFeature: editFeature
}
input searchStaffInput {
  staffID: ID
  firstName: String
  lastName: String
  warehouseID: ID
  role: StaffRole
}
`;

const Product = `#graphql
type Product implements IProduct {
  productID: ID!
  name: String!
  inStock: Boolean!
  expired: Boolean
  quantity: Int!
  category: Category!
  expirationDate: String
  wholesalePrice: Float!
  retailPrice: Float!
  features: [Feature]
  description: String
  warehouses: [Warehouse!]
}
type ProductPayload {
  error: String
  product: Product
}
type ProductsPayload {
  error: String
  pagins: Pagins
  products: [Product!]!
}
type ProductAddPayload {
  error: String
  added: Boolean
  newAdded: Product
}
type ProductEditPayload {
  error: String
  edited: Boolean!
  newEdited: Product
}
type ProductDeletePayload {
  error: String
  deleted: Boolean!
}

type ProductAddSubscription implements ISubscription {
  error: Error
  payload: SubscriptionPayload!
}
type ProductEditSubscription implements ISubscription {
  error: Error
  payload: SubscriptionPayload!
}
type ProductDeleteSubscription implements ISubscription {
  error: Error
  payload: SubscriptionPayload!
}

input productAddInput {
  name: String!
  quantity: Int!
  expirationDate: Date
  warehouseIDs: [ID!]
  categoryID: ID!
  retailPrice: Float!
  wholesalePrice: Float!
  featuresURI: [String!]
  description: String
}

input productEditInput {
  productID: ID!
  name: String
  expirationDate: String
  warehouseIDs: [ID!]
  categoryID: ID
  retailPrice: Float
  wholesalePrice: Float
  description: String
  editFeatures: editFeature
}

input searchProductInput {
  productID: ID
  name: String
  quantity: Int
  expirationDate: String
  warehouseID: ID
  expired: Boolean
  inStock: Boolean
  categoryID: ID
  retailPrice: Float
  wholesalePrice: Float
}
`;

const Category = `#graphql
type Category {
  name: String!,
}
type CategoryPayload {
  error: String,
  pagins: Pagins,
  categories: [Category!]!
}
type CategoryAddPayload {
  error: String,
  added: Boolean!,
  newAdded: String
}
type CategoryEditPayload {
  error: String,
  edited: Boolean!,
  newValue: String,
  oldValue: String!
}
type CategoryDeletePayload {
  error: String,
  deleted: Boolean!
}
type CategoryAddSubscription implements ISubscription {
  error: Error,
  payload: SubscriptionPayload!
}
type CategoryEditSubscription implements ISubscription {
  error: Error,
  payload: SubscriptionPayload!
}
type CategoryDeleteSubscription implements ISubscription {
  error: Error,
  payload: SubscriptionPayload!
}
input categoryAddInput {
  name: String
}
input categoryEditInput {
  oldCategory: String!,
  newCategory: String!
}
`;

const Warehouse = `#graphql
type Warehouse {
  warehouseID: ID!
  name: String
  address: String!
  staffIDs: [ID!]!
  productIDs: [ID!]!
  staffs: [Staff!]!
  products: [Product!]!
}
type WarehousePayload {
  error: String
  warehouse: Warehouse
}
type WarehousesPayload {
  error: String
  warehouses: [Warehouse!]!
}
type WarehouseAddPayload {
  error: String
  added: Boolean!
  newAdded: Warehouse
}
type WarehouseEditPayload {
  error: String
  edited: Boolean!
  newEdited: Warehouse
}
type WarehouseDeletePayload {
  error: String
  deleted: Boolean!
}
type AddWarehouseStaffPayload {
  error: String
  added: Boolean!
}
type WarehouseAddSubscription implements ISubscription {
  error: Error
  payload: SubscriptionPayload!
}
type WarehouseEditSubscription implements ISubscription {
  error: Error
  payload: SubscriptionPayload!
}
type WarehouseDeleteSubscription implements ISubscription {
  error: Error
  payload: SubscriptionPayload!
}
input warehouseAddInput {
  name: String!
  address: String!
  staffIDs: [ID!]
  productIDs: [ID!]
}
input warehouseEditInput {
  warehouseID: ID!
  name: String
  address: String
  staffIDs: [ID!]
  productIDs: [ID!]
}
input warehouseSearchInput {
  warehouseID: ID
  name: String
  address: String
}
`;

const Sale = `#graphql
type Sale {
  saleID: ID!,
  staffID: ID!,
  customerID: ID!,
  warehouseID: ID,
  date: String!,
  time: String!,
  discount: Float,
  profit: SaleProfit,
  paid: Float!,
  balance: Float,
  totalPrice: Float!,
  totalQuantity: Int!,
  staff: Staff!,
  customer: Customer!,
  warehouse: Warehouse,
  products: [SaleProduct!]!
}
type SaleProduct implements IProduct {
  productID: ID!,
  name: String!,
  features: [Feature],
  expired: Boolean,
  quantity: Int!,
  kind: String!,
  subTotal: Float!,
  expirationDate: String,
  wholesalePrice: Float!,
  retailPrice: Float!,
  description: String,
  warehouses: [Warehouse!]
}
type SaleProfit {
  percentage: Float!,
  status: String!
}
type SalePayload {
  error: String,
  sale: Sale
}
type SalesPayload {
  error: String,
  sales: [Sale!]!,
  pagins: Pagins
}
type SaleAddPayload {
  error: String,
  added: Boolean,
  newAdded: Sale
}
type SaleEditPayload {
  error: String,
  edited: Boolean,
  newEdited: Sale
}
type SaleDeletePayload {
  error: String,
  deleted: Boolean!
}
type SaleAddSubscription implements ISubscription {
  error: Error,
  payload: SubscriptionPayload!
}
type SaleEditSubscription implements ISubscription {
  error: Error,
  payload: SubscriptionPayload!
}
type SaleDeleteSubscription implements ISubscription {
  error: Error,
  payload: SubscriptionPayload!
}
input saleProductMetaInput {
  productID: ID!,
  quantity: Int!
}
input addSaleProfitInput {
  percentage: Float!,
  status: String!
}
input saleAddInput {
  date: String,
  time: String,
  paid: Float,
  discount: Float,
  balance: Float,
  customerID: ID,
  warehouseID: ID,
  productMetas: [saleProductMetaInput!]!,
  addCustomer: customerAddInput
}
input saleEditInput {
  saleID: ID!,
  date: String,
  time: String,
  paid: Float,
  balance: Float,
  discount: Float,
  customerID: ID,
  warehouseID: ID,
  addCustomer: customerAddInput
  productMetas: [saleProductMetaInput!]
}
input searchSaleInput {
  saleID: ID,
  date: String,
  time: String,
  staffID: ID,
  productID: ID,
  customerID: ID,
  productName: String,
  paidPrice: Float
}
`;

const Customer = `#graphql
type Customer {
  customerID: ID!,
  warehouseID: ID,
  name: String!,
  email: String,
  address: String,
  phoneNumber: String,
  beneficiary: Boolean,
  purchases: [Sale!]!,
  warehouse: Warehouse,
  metas: CustomerMetaData
}
type CustomerSocialMedia {
  facebook: String,
  twitter: String,
  instagram: String
}
type CustomerMetaData {
  avatarURL: String,
  dateOfBirth: String,
  socialMedia: CustomerSocialMedia
}
type CustomerAddPayload {
  error: String,
  added: Boolean,
  newAdded: Customer
}
type CustomerEditPayload {
  error: String,
  edited: Boolean,
  newEdited: Customer
}
type CustomerDeletePayload {
  error: String,
  deleted: Boolean!
}
type CustomerPayload {
  error: String,
  customer: Customer
}
type CustomersPayload {
  error: String,
  customers: [Customer!]!,
  pagins: Pagins
}
input searchCustomerInput {
  name: String,
  customerID: ID,
  email: String,
  address: String,
  dateOfBirth: String,
  beneficiaries: Boolean
}
input customerSocialMediaInput {
  facebook: String,
  twitter: String,
  instagram: String
}
input customerMetasInput {
  avatarURL: String,
  dateOfBirth: String,
  socialMedia: customerSocialMediaInput
}
input customerAddInput {
  name: String!,
  email: String,
  address: String,
  phoneNumber: String,
  beneficiary: Boolean,
  saleIDs: [ID!]!,
  metas: customerMetasInput,
  warehouseID: ID
}
input customerEditInput {
  customerID: ID!,
  warehouseID: ID,
  name: String,
  email: String,
  address: String,
  phoneNumber: String,
  dateOfBirth: String,
  beneficiary: Boolean,
  saleIDs: [ID!],
  metas: customerMetasInput
}
input customerDeleteInput {
  customerID: ID!,
  warehouseID: ID
}
`;

const Supply = `#graphql
type Supply {
  supplyID: ID!,
  staffID: ID!,
  staff: Staff,
  productIDs: [ID!],
  products: [Product!],
  totalQuantity: Int!,
  totalPrice: Float!,
  date: Date
}
type SupplyAddPayload {
  error: String,
  added: Boolean!,
  newAdded: Supply
}
type SupplyEditPayload {
  error: String,
  edited: Boolean!,
  newEdited: Supply
}
type SupplyDeletePayload {
  error: String,
  deleted: Boolean!
}
type SupplyPayload {
  error: String,
  supply: Supply
}
type SupplysPayload {
  error: String,
  supplies: [Supply!],
  pagins: Pagins
}
type SupplyAddSubscription implements ISubscription {
  error: Error,
  payload: SubscriptionPayload!
}
type SupplyEditSubscription implements ISubscription {
  error: Error,
  payload: SubscriptionPayload!
}
type SupplyDeleteSubscription implements ISubscription {
  error: Error,
  payload: SubscriptionPayload!
}
input supplyAddInput {
  productID: ID!,
  quantity: Int!,
  retailPrice: Float!,
  wholesalePrice: Float!
}
input supplyEditInput {
  productID: ID!,
  quantity: Int,
  retailPrice: Float,
  wholesalePrice: Float
}
input supplyDeleteInput {
  supplyID: ID!,
  warehouseID: ID,
}
input searchSupplyInput {
  supplyID: ID
  date: String
  time: String
  staffID: ID
  warehouseID: ID
}
`;

const Store = `#graphql

type StorePayload {
  error: String
  result: Int!
}

type Store {
  totalSales: StorePayload @authorizeRole(previlege: READ_SALE),
  totalStaffs: StorePayload @authorizeRole(previlege: READ_STAFF),
  totalProducts: StorePayload @authorizeRole(previlege: READ_PRODUCT),
  totalCustomers: StorePayload @authorizeRole(previlege: READ_CUSTOMER),
  totalWarehouses: StorePayload @authorizeRole(previlege: READ_WAREHOUSE),
  totalExpiredProducts: StorePayload @authorizeRole(previlege: READ_PRODUCT),
  enterPrise: enterprisePayload,
  _enterpriseInitialized: Boolean!,
  _sysInitialized: Boolean!,
}

type StoreRealTime {
  "get the total number of sales in a real time subscription. "
  totalSales: Int!,
  "get the total number of staffs in a real time subscription. "
  totalStaffs: Int!,
  "get the total number of products in a real time subscription. "
  totalProducts: Int!,
  "get the total number of customers in a real time subscription. "
  totalCustomers: Int!,
  "get the total number of warehouses in a real time subscription. "
  totalWarehouses: Int!,
  "get the total number of products that expired in a real time subscription. "
  totalExpiredProducts: Int!,
}
`;

const Enterprice = `#graphql
type EnterpriseSocialAccounts {
  facebook: String
  twitter: String
  youtube: String
  instagram: String
}
type EnterpriseOwner {
  name: String!
  email: String
  about: String
  picture: String
  phoneNumber: String
  website: String
  socialAccounts: EnterpriseSocialAccounts
}
type Enterprise {
  name: String!
  slogan: String
  title: String
  address: String
  about: String
  contacts: [String!]!
  website: String
  email: String
  staffs: [Staff!]!
  products: [Product!]!
  customers: [Customer!]!
  warehouses: [Warehouse!]!
  owners: [EnterpriseOwner!]!
  socialAccounts: EnterpriseSocialAccounts
}

input addSocialAccountInput {
  facebook: String
  twitter: String
  youtube: String
  instagram: String
}

input addOwnerInput {
  name: String!
  email: String!
  about: String
  picture: String
  phoneNumber: String!
  website: String
  socialAccounts: addSocialAccountInput
}
input editOwnerInput {
  name: String
  email: String
  about: String
  picture: String
  phoneNumber: String
  website: String
  socialAccounts: addSocialAccountInput
}

input enterpriseAddInput {
  name: String!
  slogan: String
  title: String
  address: String!
  about: String
  contacts: [String!]!
  website: String
  email: String
  owners: [addOwnerInput!]!
  socialAccounts: addSocialAccountInput
}

input enterpriseEditInput {
  name: String
  title: String
  slogan: String
  about: String
  email: String
  address: String
  website: String
  contacts: [String!]
  owners: [editOwnerInput!]
  socialAccounts: addSocialAccountInput
}
type enterprisePayload {
  error: String
  result: Enterprise
}
type EnterpriseAddPayload {
  error: String
  added: Boolean!
  newAdded: Enterprise
}
type EnterpriseEditPayload {
  error: String
  edited: Boolean!
  newEdited: Enterprise
}
type initPayload {
  error: String
  _initialized: Boolean!
}
`;

const Query = `#graphql

  type Query {
  ################################## STAFF ##########################################
    staff(searchTerm: searchStaffInput!): StaffPayload! @authorizeRole(previlege: READ_STAFF)
    staffs(searchTerm: searchStaffInput, pagin: paginInput): StaffsPayload! @authorizeRole(previlege: READ_STAFF)

    ################################## PRODUCT #########################################
    product(searchTerm: searchProductInput!): ProductPayload! @authorizeRole(previlege: READ_PRODUCT)
    products(
      searchTerm: searchProductInput
      pagin: paginInput
    ): ProductsPayload! @authorizeRole(previlege: READ_PRODUCT)

    ################################## CATEGORY ########################################
    categories(pagin: paginInput): CategoryPayload! 

    ################################## WAREHOUSE #######################################
    warehouse(searchTerm: warehouseSearchInput!): WarehousePayload! @authorizeRole(previlege: READ_WAREHOUSE)
    warehouses(
      searchTerm: warehouseSearchInput
      pagin: paginInput
    ): WarehousesPayload! @authorizeRole(previlege: READ_WAREHOUSE)

    ################################## SALE ############################################
    sale(searchTerm: searchSaleInput!): SalePayload! @authorizeRole(previlege: READ_SALE)
    sales(searchTerm: searchSaleInput, pagin: paginInput): SalesPayload! @authorizeRole(previlege: READ_SALE)

    ################################## CUSTOMER ########################################
    customer(searchTerm: searchCustomerInput!): CustomerPayload! @authorizeRole(previlege: READ_CUSTOMER)
    customers(
      searchTerm: searchCustomerInput
      pagin: paginInput
    ): CustomersPayload! @authorizeRole(previlege: READ_CUSTOMER)

    ################################## PURCHASE ########################################
    supply(searchTerm: searchSupplyInput!): SupplyPayload! @authorizeRole(previlege: READ_SUPPLY)
    supplies(searchTerm: searchSupplyInput, pagin: paginInput): SupplysPayload! @authorizeRole(previlege: READ_SUPPLY)

    ################################## STORE ########################################### 
    store: Store!
  }
`;

const Mutation = `#graphql
  type Mutation {
      ################################## STAFF ###########################################
      staffDelete(staffID: ID!): StaffDeletePayload! @authorizeRole(previlege: DELETE_STAFF)
      staffAdd(staffAddInput: staffAddInput!): StaffAddPayload! @authorizeRole(previlege: ADD_STAFF)
      staffEdit(staffEditInput: staffEditInput!): StaffEditPayload! @authorizeRole(previlege: UPDATE_STAFF)

      ################################## PRODUCT ########################################
      productAdd(productAddInput: productAddInput!): ProductAddPayload! @authorizeRole(previlege: ADD_PRODUCT)
      productEdit(productEditInput: productEditInput!): ProductEditPayload! @authorizeRole(previlege: UPDATE_PRODUCT)
      productDelete(productID: ID!, warehouseID: ID): ProductDeletePayload! @authorizeRole(previlege: DELETE_PRODUCT)

      ################################## CATEGORY ########################################
      categoryDelete(category: String!): CategoryDeletePayload! @authorizeRole(previlege: DELETE_CATEGORY)
      categoryAdd(categoryAddInput: categoryAddInput!): CategoryAddPayload! @authorizeRole(previlege: ADD_CATEGORY)
      categoryEdit(categoryEditInput: categoryEditInput!): CategoryEditPayload! @authorizeRole(previlege: UPDATE_CATEGORY)

      ################################## WAREHOUSE #######################################
      warehouseDelete(warehouseID: ID!): WarehouseDeletePayload! @authorizeRole(previlege: DELETE_WAREHOUSE)
      warehouseAdd(warehouseAddInput: warehouseAddInput!): WarehouseAddPayload! @authorizeRole(previlege: ADD_WAREHOUSE)
      warehouseEdit(warehouseEditInput: warehouseEditInput!): WarehouseEditPayload! @authorizeRole(previlege: UPDATE_WAREHOUSE)

      ################################## SALE ############################################
      saleAdd(saleAddInput: saleAddInput!): SaleAddPayload! @authorizeRole(previlege: ADD_SALE)
      saleEdit(saleEditInput: saleEditInput!): SaleEditPayload! @authorizeRole(previlege: UPDATE_SALE)
      saleDelete(saleID: ID!, warehouseID: ID): SaleDeletePayload! @authorizeRole(previlege: DELETE_SALE)

      ################################## CUSTOMER #########################################
      customerAdd(customerAddInput: customerAddInput!): CustomerAddPayload! @authorizeRole(previlege: ADD_CUSTOMER)
      customerDelete(customerDeleteInput: customerDeleteInput!): CustomerDeletePayload! @authorizeRole(previlege: DELETE_CUSTOMER)
      customerEdit(customerEditInput: customerEditInput!): CustomerEditPayload! @authorizeRole(previlege: UPDATE_CUSTOMER)

      ################################# PURCHASE ##########################################
      makeSupply(
        supplyAddInput: [supplyAddInput!]!
        warehouseID: ID
      ): SupplyAddPayload! @authorizeRole(previlege: ADD_SUPPLY)
      supplyEdit(
        supplyID: ID!
        supplyEditInput: [supplyEditInput!]!
        warehouseID: ID
      ): SupplyEditPayload! @authorizeRole(previlege: UPDATE_SUPPLY)
      supplyDelete(supplyDeleteInput: supplyDeleteInput!): SupplyDeletePayload! @authorizeRole(previlege: DELETE_SUPPLY)

      ################################# ENTERPRISE ########################################
      enterpriseAdd(enterpriseAddInput: enterpriseAddInput!): EnterpriseAddPayload! @authorizeRole(previlege: ADD_ENTERPRISE)
      enterpriseEdit(
        enterpriseEditInput: enterpriseEditInput!
      ): EnterpriseEditPayload! @authorizeRole(previlege: UPDATE_ENTERPRISE)
      _initializeSys(_init: Boolean!): initPayload! @authorizeRole(previlege: INITIALIZED_SYSTEM)
  }
`;

const Subscription = `#graphql
  type Subscription {
    "subscription when a sale is make"
    saleAddSubscription: SaleAddSubscription! @authorizeRole(previlege: LISTEN_ADD_SALE)
    "subscription when a sale is edited"
    saleEditSubscription: SaleEditSubscription!  @authorizeRole(previlege: LISTEN_EDIT_SALE)
    "subscription when a sale is deleted"
    saleDeleteSubscription: SaleDeleteSubscription!  @authorizeRole(previlege: LISTEN_DELETE_SALE)

    "subscription when a product is added"
    productAddSubscription: ProductAddSubscription! @authorizeRole(previlege: LISTEN_ADD_PRODUCT)
    "subscription when a product is edited"
    productEditSubscription: ProductEditSubscription! @authorizeRole(previlege: LISTEN_EDIT_PRODUCT)
    "subscription when a product is deleted"
    productDeleteSubscription: ProductDeleteSubscription! @authorizeRole(previlege: LISTEN_DELETE_PRODUCT)

    "subscription when a new staff is added"
    staffAddSubscription: SaleAddSubscription! @authorizeRole(previlege: LISTEN_ADD_STAFF)
    "subscription when a new staff is deleted"
    staffDeleteSubscription: SaleDeleteSubscription! @authorizeRole(previlege: LISTEN_DELETE_STAFF)

    "subscription when a supply is added"
    supplyAddSubscription: SupplyAddSubscription! @authorizeRole(previlege: LISTEN_ADD_SUPPLY)
    "subscription when a supply is edited"
    supplyEditSubscription: SupplyEditSubscription! @authorizeRole(previlege: LISTEN_EDIT_SUPPLY)
    "subscription when a supply is deleted"
    supplyDeleteSubscription: SupplyDeleteSubscription! @authorizeRole(previlege: LISTEN_DELETE_SUPPLY)

    "subscription when a new category is added"
    categoryAddSubscription: CategoryAddSubscription! @authorizeRole(previlege: LISTEN_ADD_CATEGORY)
    "subscription when a category is edited"
    categoryEditSubscription: CategoryEditSubscription! @authorizeRole(previlege: LISTEN_EDIT_CATEGORY)
    "subscription when a category is deleted"
    categoryDeleteSubscription: CategoryDeleteSubscription! @authorizeRole(previlege: LISTEN_DELETE_CATEGORY)

    "subscription when a new warehouse is added"
    warehouseAddSubscription: WarehouseAddSubscription! @authorizeRole(previlege: LISTEN_ADD_WAREHOUSE)
    "subscription when a warehouse is edited"
    warehouseEditSubscription: WarehouseEditSubscription! @authorizeRole(previlege: LISTEN_EDIT_WAREHOUSE)
    "subscription when a warehouse is deleted"
    warehouseDeleteSubscription: WarehouseDeleteSubscription! @authorizeRole(previlege: LISTEN_DELETE_WAREHOUSE)

    "subscription for a realtime store counts"
    storeRealTime: StoreRealTime!
    #"subscription to alarm for an expired product, watch any product at a realtime for it expiration date"
  }
`;

const schemas = `
  ${Directives}
  ${Scalars}
  ${Unions}
  ${Enums}
  ${Interfaces}
  ${Commons}
  ${Enterprice}
  ${Warehouse}
  ${Category}
  ${Customer}
  ${Feature}
  ${Product}
  ${Supply}
  ${Staff}
  ${Store}
  ${Sale}
  ${Query}
  ${Mutation}
  ${Subscription}
`;

export const typeDefs = buildSchema(schemas);

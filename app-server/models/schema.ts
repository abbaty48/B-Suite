import { gql } from 'apollo-server-express';

const typeDef = gql(
  `
   ####################################  ENUMS  ###################################
   enum StaffRole {
      Admin
      Saller
      Manager
      Warehouse
      Accountant
   }
   ##################################### GLOBAL ###################################
   type Timestamps {
      createdAt: String!
      updatedAt: String!
      currentTime: Int
   }

   input paginInput {
      limit: Int
      sort: String
      pageIndex: Int
   }
   type Pagins {
      sort: String
      totalPaginated: Int 
      totalDocuments: Int
      nextPageIndex: Int
      currentPageIndex: Int
   }

   ################################# FEATURES ######################################
   type Feature {
      size: Int,
      url: String,
      fileName: String,
      filePath: String,
      extension: String,
   }
   enum FeatureEditAction {
      ADD,
      REMOVE
   }
   input editFeature {
      action: FeatureEditAction!,
      addFeatureURI: [String!],
      removeFeatureByName: String
   }
   ################################# STAFF ######################################
   type Staff {
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
   type AddStaffPayload {
      error: String
      added: Boolean!
      newAdded: Staff
   }
   type EditStaffPayload {
      error: String
      edited: Boolean!
      newEdited: Staff
   }
   type DeleteStaffPayload {
      error: String
      deleted: Boolean!
   }
   input addStaffInput {
      firstName: String!,
      lastName: String!,
      otherName: String,
      featureURI: String,
      email: String,
      role: StaffRole!, 
      address: String, 
      phoneNumber: String!,
      password: String!, 
      warehouseID: ID
   }
   input editStaffInput {
      staffID: ID!, 
      firstName: String, 
      lastName: String, 
      otherName: String,
      email: String, 
      role: StaffRole, 
      address: String, 
      phoneNumber: String,
      password: String, 
      warehouseID: ID
      editFeature: editFeature, 
   }
    input searchStaffInput {
      staffID: ID
      firstName: String
      lastName: String
      warehouseID: ID
   }
   ################################## PRODUCT ###################################
   type Product {
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
      products: [Product!]!
      pagins: Pagins
   }
   type AddProductPayload {
      error: String
      added: Boolean
      newAdded: Product
   }
   type EditProductPayload {
      error: String
      edited: Boolean!
      newEdited: Product
   }
   type DeleteProductPayload {
      error: String
      deleted: Boolean!
   }
    input addProductInput {
      name: String!
      quantity: Int!
      expirationDate: String
      warehouseIDs: [ID!]
      categoryID: ID!
      retailPrice: Float!
      wholesalePrice: Float!
      featuresURI: [String!]
      description: String
   }

   input editProductInput {
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
   ##################################### CATEGORY #####################################
   type Category {
      name: String!
   }
   type AddCategoryPayload {
      error: String
      added: Boolean!
      newAdded: String
   }
   type EditCategoryPayload {
      error: String
      edited: Boolean!
      newValue: String
      oldValue: String!
   }
   type DeleteCategoryPayload {
      error: String
      deleted: Boolean!
   }
   input addCategoryInput {
      name: String
   }
   input editCategoryInput {
      oldCategory: String!
      newCategory: String!
   }
   type categoryPayload {
      error: String
   }
   ################################### WAREHOUSE ######################################
   type Warehouse {
      warehouseID: ID!,
      name: String,
      address: String!,
      staffIDs: [ID!]!,
      productIDs: [ID!]!,
      staffs: [Staff!]!,
      products: [Product!]!,
   }
   type WarehousePayload {
      error: String,
      warehouse: Warehouse
   }
   type WarehousesPayload {
      error: String,
      warehouses: [Warehouse!]!
   }
   type AddWarehousePayload {
      error: String,
      added: Boolean!,
      newAdded: Warehouse,
   }
   type EditWarehousePayload {
      error: String,
      edited: Boolean!,
      newEdited: Warehouse
   }
   type DeleteWarehousePayload {
      error: String,
      deleted: Boolean!,
   }
   type AddWarehouseStaffPayload {
      error: String,
      added: Boolean!,
   }
  
   input addWarehouseInput {
      name: String!,
      address: String!,
      staffIDs: [ID!],
      productIDs: [ID!],
   }
   input editWarehouseInput {
      warehouseID: ID!,
      name: String,
      address: String,
      staffIDs: [ID!],
      productIDs: [ID!],
   }
   input warehouseSearchInput {
      warehouseID: ID,
      name: String,
      address: String,
   }
   ############################# SALE #######################################
   type Sale {
      saleID: ID!
      staffID: ID!
      customerID: ID!
      warehouseID: ID
      date: String!
      time: String!
      kind: String!
      discount: Float
      profit: SaleProfit
      paid: Float!
      balance: Float!
      totalPrice: Float!
      totalQuantity: Int!
      staff: Staff!
      customer: Customer!
      warehouse: Warehouse
      products: [SaleProduct!]!
   }
   type SaleProduct {
      productID: ID!
      name: String!
      images: [String]
      inStock: Boolean!
      expired: Boolean
      quantity: Int!
      kind: String!
      subTotal: Float!
      category: Category!
      expirationDate: String
      wholesalePrice: Float!
      retailPrice: Float!
      description: String
      warehouse: Warehouse
   }
   type SaleProfit {
      percentage: Float!
      status: String!
   }
   type SalePayload {
      error: String
      sale: Sale
   }
   type SalesPayload {
      error: String
      sales: [Sale!]!
      pagins: Pagins
   }
   type AddSalePayload {
      error: String
      added: Boolean
      newAdded: Sale
   }
   type EditSalePayload {
      error: String
      edited: Boolean
      newEdited: Sale
   }
   type DeleteSalePayload {
      error: String
      deleted: Boolean!
   }
     input saleProductMetaInput {
      productID: ID!
      quantity: Int!
   }
   input addSaleProfitInput {
      percentage: Float!
      status: String!
   }
   input addSaleInput {
      date: String,
      time: String,
      paid: Float,
      discount: Float,
      balance: Float
      customerID: ID
      warehouseID: ID,
      productMetas: [saleProductMetaInput!]!
      addCustomer: addCustomerInput
   }
   input editSaleInput {
      saleID: ID!
      date: String,
      time: String,
      paid: Float,
      balance: Float
      discount: Float,
      customerID: ID!
      warehouseID: ID,
      productMetas: [saleProductMetaInput!]
   }
   input searchSaleInput {
      saleID: ID
      date: String
      time: String
      staffID: ID 
      productID: ID
      customerID: ID
      productName: String
      paidPrice: Float
   }
   #################################### CUSTOMER #############################################
   type Customer {
      customerID: ID!,
      warehouseID: ID,
      name: String!,
      email: String,
      address: String,
      phoneNumber: String,
      beneficiary: Boolean,
      supplys: [Sale!]!,
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
   type AddCustomerPayload {
      error: String,
      added: Boolean,
      newAdded: Customer
   }
   type EditCustomerPayload {
      error: String,
      edited: Boolean,
      newEdited: Customer
   }
   type DeleteCustomerPayload {
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
      instagram: String,
   }
   input customerMetasInput {
      avatarURL: String,
      dateOfBirth: String,
      socialMedia: customerSocialMediaInput
   }
   input addCustomerInput {
      name: String!,
      email: String,
      address: String,
      phoneNumber: String,
      beneficiary: Boolean,
      saleIDs: [ID!]!,
      metas: customerMetasInput,
      warehouseID: ID
   }
   input editCustomerInput {
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
   ###################################### SUPPLY ##########################################
   type Supply {
      supplyID: ID!,
      staffID: ID!,
      staff: Staff,
      productIDs: [ID!],
      products: [Product!]!,
      totalQuantity: Int!,
      totalPrice: Float!,
      date: String,
      timestamps: Timestamps
   }
   type AddSupplyPayload {
      error: String,
      added: Boolean!,
      newAdded: Supply,
   }
   type EditSupplyPayload {
      error: String,
      edited: Boolean!,
      newEdited: Supply,
   }
   type DeleteSupplyPayload {
      error: String,
      deleted: Boolean!,
   }
   type SupplyPayload {
      error: String,
      supply: Supply,
   }
   type SupplysPayload {
      error: String,
      supplies: [Supply!],
      pagins: Pagins
   }
   input addSupplyInput {
      productID: ID!,
      quantity: Int!,
      retailPrice: Float!,
      wholesalePrice: Float!,
   }
   input editSupplyInput {
      productID: ID!,
      quantity: Int,
      retailPrice: Float,
      wholesalePrice: Float,
      warehouseID: ID
   }
   input searchSupplyInput {
      supplyID: ID,
      date: String,
      time: String,
      staffID: ID,
      warehouseID : ID
   }

   #################################### STORE #########################################
   type StorePayload {
      error: String
      result: Int!
   }

   type Store {
      totalSales: StorePayload,
      totalStaffs: StorePayload,
      totalProducts: StorePayload,
      totalCustomers: StorePayload,
      totalWarehouses: StorePayload,
      totalExpiredProducts: StorePayload,
      enterPrise: enterPrisePayload,
      _sysInitialized: Boolean!
      _enterpriseInitialized: Boolean!
   }

   ######################################## ENTERPRISE ########################################

   type EnterpriseSocialAccounts {
      facebook: String,
      twitter: String,
      youtube: String,
      instagram: String
   }
   type EnterpriseOwner {
      name: String!,
      email: String,
      about: String,
      picture: String,
      phoneNumber: String,
      website: String,
      socialAccounts: EnterpriseSocialAccounts
   }
   type Enterprise {
      name: String!,
      slogan: String,
      title: String,
      address: String,
      about: String,
      contacts: [String!]!,
      website: String,
      email: String,
      staffs: [Staff!]!,
      products: [Product!]!,
      customers: [Customer!]!,
      warehouses: [Warehouse!]!,
      owners: [EnterpriseOwner!]!,
      socialAccounts: EnterpriseSocialAccounts
   }

   input addSocialAccountInput {
      facebook: String,
      twitter: String,
      youtube: String,
      instagram: String
   }

   input addOwnerInput {
      name: String!,
      email: String!,
      about: String,
      picture: String,
      phoneNumber: String!,
      website: String,
      socialAccounts: addSocialAccountInput
   }
   input editOwnerInput {
      name: String,
      email: String,
      about: String,
      picture: String,
      phoneNumber: String,
      website: String,
      socialAccounts: addSocialAccountInput
   }

   input addEnterpriseInput {
      name: String!,
      slogan: String,
      title: String,
      address: String!,
      about: String,
      contacts: [String!]!,
      website: String,
      email: String,
      owners: [addOwnerInput!]!,
      socialAccounts: addSocialAccountInput
   }

   input editEnterpriseInput {
      name: String,
      title: String,
      slogan: String,
      about: String,
      email: String,
      address: String,
      website: String,
      contacts: [String!],
      owners: [editOwnerInput!],
      socialAccounts: addSocialAccountInput
   }
   type enterPrisePayload {
      error: String,
      result: Enterprise
   }
   type addEnterprisePayload {
      error: String,
      added: Boolean!,
      newAdded: Enterprise
   }
   type editEnterprisePayload {
      error: String,
      edited: Boolean!,
      newEdited: Enterprise
   }
   type initPayload {
      error: String,
      _initialized: Boolean!
   }

   ##################################### QUERIES ########################################
   type Query {
      ################################## STAFF ##########################################
      staff(searchFilter: searchStaffInput!): StaffPayload!
      staffs(searchFilter: searchStaffInput, pagin: paginInput) : StaffsPayload!
      
      ################################## PRODUCT #########################################
      product(searchFilter: searchProductInput!): ProductPayload!
      products(searchFilter: searchProductInput, pagin: paginInput): ProductsPayload!

      ################################## CATEGORY ########################################
      categories: [Category!]!

      ################################## WAREHOUSE #######################################
      warehouse(searchFilter: warehouseSearchInput!): WarehousePayload!
      warehouses(searchFilter: warehouseSearchInput, pagin: paginInput): WarehousesPayload!

      ################################## SALE ############################################
      sale(searchFilter: searchSaleInput!): SalePayload!
      sales(searchFilter: searchSaleInput, pagin: paginInput): SalesPayload!

      ################################## CUSTOMER ########################################
      customer(searchFilter: searchCustomerInput!): CustomerPayload!
      customers(searchFilter: searchCustomerInput, pagin: paginInput): CustomersPayload!

      ################################## PURCHASE ########################################
      supply(searchFilter: searchSupplyInput!): SupplyPayload!
      supplies(searchFilter: searchSupplyInput, pagin: paginInput): SupplysPayload!

      ################################## STORE ###########################################
      store: Store!
   }
   ######################################## MUTATONS #####################################
   type Mutation {

      ################################## STAFF ###########################################
      addStaff(addStaffInput: addStaffInput!): AddStaffPayload!
      editStaff(editStaffInput: editStaffInput!): EditStaffPayload!
      deleteStaff(staffID: ID!): DeleteStaffPayload!

      ################################## PRODUCT #########################################
      addProduct(addProductInput: addProductInput!): AddProductPayload!
      editProduct(editProductInput: editProductInput!): EditProductPayload!
      deleteProduct(productID: ID!, warehouseID: ID): DeleteProductPayload!

      ################################## CATEGORY ########################################
      addCategory(addCategoryInput: addCategoryInput!): AddCategoryPayload!
      editCategory(editCategoryInput: editCategoryInput!): EditCategoryPayload!
      deleteCategory(category: String!): DeleteCategoryPayload!
      
      ################################## WAREHOUSE #######################################
      addWarehouse(addWarehouseInput: addWarehouseInput!): AddWarehousePayload!
      editWarehouse(editWarehouseInput: editWarehouseInput!): EditWarehousePayload!
      deleteWarehouse(warehouseID: ID!): DeleteWarehousePayload!
      
      ################################## SALE ############################################
      addSale(addSaleInput: addSaleInput!): AddSalePayload!
      editSale(editSaleInput: editSaleInput!): EditSalePayload!
      deleteSale(saleID: ID!, warehouseID: ID): DeleteSalePayload!
      
      ################################## CUSTOMER #########################################
      addCustomer(addCustomerInput: addCustomerInput!) : AddCustomerPayload!
      editCustomer(editCustomerInput: editCustomerInput!) : EditCustomerPayload!
      deleteCustomer(customerID: ID!, warehouseID: ID) : DeleteCustomerPayload!

      ################################# PURCHASE ##########################################
      makeSupply(addSupplyInput: [addSupplyInput!]!, warehouseID: ID) : AddSupplyPayload!
      editSupply(supplyID: ID!, editSupplyInput: [editSupplyInput!]!, warehouseID: ID) : EditSupplyPayload!
      deleteSupply(supplyID: ID!, warehouseID: ID) : DeleteSupplyPayload!

      ################################# ENTERPRISE ########################################
      addEnterprise(addEnterpriseInput: addEnterpriseInput!): addEnterprisePayload!
      editEnterprise(editEnterpriseInput: editEnterpriseInput!): editEnterprisePayload!
      _initializeSys(_init: Boolean!): initPayload!
   }
   ########################################### SUBSCRIBE ###################################
   # -- subscription when a sale is make
   # -- subscription when a sale is edited
   # -- subscription when a sale is deleted
  
   # -- subscription when a product is added
   # -- subscription when a product is edited
   # -- subscription when a product is deleted
  
   # -- subscription when a new staff is added
   # -- subscription when a new staff is deleted

   # -- subscription when a supply is added
   # -- subscription when a supply is edited
   # -- subscription when a supply is deleted
   # -- subscription when a supply is deleted

   # -- subscription when a supply is deleted
`
);

export default typeDef;

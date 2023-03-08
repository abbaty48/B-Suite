import { gql } from 'apollo-server-express';

const typeDef = gql(`

   #######  ENUMS  #######
   enum StaffRole {
      Admin
      Saller
      Manager
      Warehouse
      Accountant
   }

   ####### INPUTS #######

   input filterInput {
      limit: Int
      pageIndex: Int
      sort: String
   }

   input searchStaffInput {
      staffID: ID
      firstName: String
      lastName: String
      warehouseID: ID
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

   input addProductInput {
      name: String!
      quantity: Int!
      expirationDate: String
      warehouseID: ID
      categoryID: ID!
      retailPrice: Float!
      wholesalePrice: Float!
      images: [String!]
      description: String
   }

   input editProductInput {
      productID: ID!
      name: String
      quantity: Int
      expirationDate: String
      warehouseID: ID
      categoryID: ID
      retailPrice: Float
      wholesalePrice: Float
      images: [String!]
      description: String
   }

   input addStaffInput {
      firstName: String!,
      lastName: String!,
      otherName: String,
      passport: String,
      email: String,
      role: StaffRole!, 
      address: String, 
      phoneNumber: String,
      password: String!, 
      warehouseID: ID
   }

   input editStaffInput {
      staffID: ID!, 
      firstName: String, 
      lastName: String, 
      otherName: String,
      passport: String, 
      email: String, 
      role: StaffRole, 
      address: String, 
      phoneNumber: String,
      password: String, 
      warehouseID: ID
   }

   input categoryInput {
      name: String
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
      profit: addSaleProfitInput
      totalPrice: Float,
      customerID: ID!
      warehouseID: ID,
      productMetas: [saleProductMetaInput!]!
   }

   input editSaleInput {
      saleID: ID!
      date: String,
      time: String,
      paid: Float,
      balance: Float
      discount: Float,
      profit: addSaleProfitInput
      totalPrice: Float,
      customerID: ID!
      warehouseID: ID,
      productMetas: [saleProductMetaInput!]
   }
   

   ####### PAYLOADS ######
   type categoryPayload {
      error: String
   }
   ####### TYPES ########

   ## Filter
   type Filters {
      sort: String
      totalFilter: Int 
      totalDocuments: Int
      nextPageIndex: Int
      currentPageIndex: Int
   }

   ## STAFF
   type Staff {
      staffID: ID!
      firstName: String!
      lastName: String!
      otherName: String
      passport: String
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
      filters: Filters
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
   ## TYPE
   type Product {
      productID: ID!
      name: String!
      images: [String]
      inStock: Boolean!
      expired: Boolean
      quantity: Int!
      category: Category!
      expirationDate: String
      wholesalePrice: Float!
      retailPrice: Float!
      description: String
      warehouse: Warehouse
   }
   type ProductPayload {
      error: String
      product: Product
   }
   type ProductsPayload {
         error: String
         products: [Product!]!
         filters: Filters
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
   ## CATEGORY
   type Category {
      name: String!
   }
   type AddCategoryPayload {
      error: String
      added: Boolean!
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
   ## WAREHOUSE
   type Warehouse {
      warehouseID: ID!
      name: String
      address: String!
      staffs: [Staff!]!
      products: [Product!]!
   }
   ### WAREHOUSE PAYLOADS
   type AddWarehousePayload {
      error: String
      added: Boolean!
      newAdded: Warehouse
   }
   type EditWarehousePayload {
      error: String
      edited: Boolean!
   }
   type DeleteWarehousePayload {
      error: String
      deleted: Boolean!
   }
   type AddWarehouseStaffPayload {
      error: String
      added: Boolean!
   }
   ## SALE
   type Sale {
      saleID: ID!
      date: String!
      time: String!
      discount: Float
      profit: SaleProfit
      paid: Float!
      balance: Float!
      totalPrice: Float!
      staff: Staff!
      staffID: ID!
      products: [Product!]!
      productIDs: [String]
      customer: Customer!,
      customerID: ID!
      warehouse: Warehouse
      warehouseID: ID
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
      filters: Filters
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
   ## 
   type Query {
      ##STAFF
      staff(searchFilter: searchStaffInput!): StaffPayload
      staffs(searchFilter: searchStaffInput, filters: filterInput) : StaffsPayload
      ##PRODUCT
      product(searchFilter: searchProductInput!): ProductPayload
      products(searchFilter: searchProductInput, filters: filterInput): ProductsPayload
      ##CATEGORY
      categories: [Category!]!
      ##WAREHOUSE
      warehouses: [Warehouse!]!
      ##SALE
      sale(searchFilter: searchSaleInput!): SalePayload
      sales(searchFilter: searchSaleInput, filters: filterInput): SalesPayload
   }
   type Mutation {
      ###STAFF
      addStaff(inputs: addStaffInput!): AddStaffPayload
      editStaff(inputs: editStaffInput!): EditStaffPayload
      deleteStaff(staffID: ID!): DeleteStaffPayload
      ###PRODUCT
      addProduct(addProductInput: addProductInput!): AddProductPayload
      editProduct(editProductInput: editProductInput!): EditProductPayload
      deleteProduct(productID: ID!, warehouseID: ID): DeleteProductPayload
      ###CATEGORY
      addCategory(category: String!): AddCategoryPayload
      editCategory(oldCategory: String!, newCategory: String!): EditCategoryPayload
      deleteCategory(category: String!): DeleteCategoryPayload
      ###WAREHOUSE
      addWarehouse(name: String, address: String!, staffs: [addStaffInput!], products: [addProductInput!]): AddWarehousePayload
      editWarehouse(warehouseID: ID!, name: String, address: String, staffs: [editStaffInput!], products: [addProductInput!]): EditWarehousePayload
      deleteWarehouse(warehouseID: ID!): DeleteWarehousePayload
      ###SALE
      addSale(addSaleInput: addSaleInput!): AddSalePayload
      editSale(editSaleInput: editSaleInput!): EditSalePayload
      deleteSale(saleID: ID!, warehouseID: ID): DeleteSalePayload
   }
`);

export default typeDef;

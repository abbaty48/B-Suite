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

   ####### PAYLOADS ######
   type categoryPayload {
      error: String
   }
   ####### TYPES ########

   ## Filter
   type Filters {
      total: Int
      sort: String
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
   ## 
   type Query {
      ##STAFF
      staff(searchFilter: searchStaffInput!): StaffPayload
      staffs(searchFilter: searchStaffInput, filters: filterInput) : StaffsPayload
      ##PRODUCT
      product(searchFilter: searchProductInput): ProductPayload
      products(searchFilter: searchProductInput, filters: filterInput): ProductsPayload
      ##CATEGORY
      categories: [Category!]!
      ##WAREHOUSE
      warehouses: [Warehouse!]!
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
   }
`);

export default typeDef;

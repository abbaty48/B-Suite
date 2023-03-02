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
      #products: [Product!]!
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
      staff(searchFilter: searchStaffInput!): StaffPayload
      staffs(searchFilter: searchStaffInput, filters: filterInput) : StaffsPayload
      categories: [Category!]!
      warehouses: [Warehouse!]!
   }
   type Mutation {
      ###STAFF
      addStaff(firstName: String!,lastName: String!,
         otherName: String,passport: String,email: String,
         role: StaffRole!, address: String, phoneNumber: String,
         password: String!, warehouseID: ID): AddStaffPayload
      editStaff(staffID: ID!, firstName: String, lastName: String, otherName: String,
         passport: String, email: String, role: StaffRole, address: String, phoneNumber: String,
         password: String, warehouseID: ID): EditStaffPayload
      deleteStaff(staffID: ID!): DeleteStaffPayload
      ###CATEGORY
      addCategory(category: String!): AddCategoryPayload
      editCategory(oldCategory: String!, newCategory: String!): EditCategoryPayload
      deleteCategory(category: String!): DeleteCategoryPayload
      ###WAREHOUSE
      addWarehouse(warehouseID: ID!, name: String, address: String!, staffs: [Staff], products: [Product]): AddWarehousePayload
      editWarehouse(warehouseID: ID!, name: String, address: String, staffs: [Staff!], products: [Product!]): EditWarehousePayload
      deleteWarehouse(warehouseID: ID!): DeleteWarehousePayload

   }
`);

export default typeDef;

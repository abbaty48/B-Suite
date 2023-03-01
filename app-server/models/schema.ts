import { gql } from 'apollo-server-express';

const typeDef = gql(`
   ####### INPUTS #######
   input categoryInput {
      name: String
   }

   ####### PAYLOADS ######
   type categoryPayload {
      error: String
   }
   ####### TYPES ########

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
      categories: [Category!]!
      warehouses: [Warehouse!]!
   }
   type Mutation {
      addCategory(category: String!): AddCategoryPayload
      editCategory(oldCategory: String!, newCategory: String!): EditCategoryPayload
      deleteCategory(category: String!): DeleteCategoryPayload

      addWarehouse(warehouseID: ID!, name: String, address: String!, staffs: [Staff], products: [Product]): AddWarehousePayload
      editWarehouse(warehouseID: ID!, name: String, address: String, staffs: [Staff!], products: [Product!]): EditWarehousePayload
      deleteWarehouse(warehouseID: ID!): DeleteWarehousePayload
   }
`);

export default typeDef;

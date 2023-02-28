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
   type Category {
      name: String!
   }
   type Query {
      categories: [Category!]!
   }
   type Mutation {
      addCategory(category: String!): AddCategoryPayload
      editCategory(oldCategory: String!, newCategory: String!): EditCategoryPayload
      deleteCategory(category: String!): DeleteCategoryPayload
   }
   #type Subscription {}
`);

export default typeDef;

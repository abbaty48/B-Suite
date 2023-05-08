import { gql } from '@apollo/client';

export const GET_WAREHOUSE = gql`
   enum Sort {asc | desc}
   query GETWAREHOUSE($name: String, $address: String, $warehouseID: ID) {
      warehouse(searchTerm: {name: $name, address: $address, warehouseID: $warehouseID}){
            error,
            warehouse {
            name,
            address,
            products {
               productID,
               name,
               category{name},
               inStock,
              features{
                url,fileName
              }
               quantity,
               retailPrice,
               wholesalePrice
            },
            staffs {
               firstName,
               lastName,
               role
            }
         }
      }
}`;

export const GET_WAREHOUSES = gql`
  query GETWAREHOUSES(
    $name: String
    $address: String
    $warehouseID: ID
    $pageIndex: Int
    $limit: Int
    $sort: Sort
  ) {
    warehouses(
      searchTerm: { name: $name, address: $address, warehouseID: $warehouseID }
      pagin: { pageIndex: $pageIndex, limit: $limit, sort: $sort }
    ) {
      error
      warehouses {
        name
        address
        products {
          productID
          name
          category {
            name
          }
          inStock
          quantity
          retailPrice
          wholesalePrice
        }
        staffs {
          firstName
          lastName
          role
        }
      }
    }
  }
`;

export const ADD_WAREHOUSE = gql`
  mutation ADDWAREHOUSE(
    $name: String!
    $address: String!
    $staffIDs: [ID!]
    $productIDs: [ID!]
  ) {
    warehouseAdd(
      warehouseAddInput: {
        name: $name
        address: $address
        staffIDs: $staffIDs
        productIDs: $productIDs
      }
    ) {
      error
      added
      newAdded {
        name
        address
      }
    }
  }
`;

export const EDIT_WAREHOUSE = gql`
  mutation EDITWAREHOUSE(
    $warehouseID: ID!
    $name: String
    $address: String
    $productIDs: [ID!]
    $staffIDs: [ID!]
  ) {
    warehouseEdit(
      warehouseEditInput: {
        warehouseID: $warehouseID
        name: $name
        address: $address
        productIDs: $productIDs
        staffIDs: $staffIDs
      }
    ) {
      error
      edited
      newEdited {
        name
        address
      }
    }
  }
`;

export const DELETE_WAREHOUSE = gql`
  mutation DELETEWAREHOUSE($warehouseID: ID!) {
    warehouseDelete(warehouseID: $warehouseID) {
      error
      deleted
    }
  }
`;

export const ON_ADD_WAREHOUSE_SUBSCRIPTION = gql`
  subscription ON_ADD_WAREHOUSE_SUBSCRIPTION {
    warehouseAddSubscription {
      error {
        message
        status
        code
        success
      }
      payload {
        timestamp
        actionType
        actionBy {
          firstName
          lastName
          role
          phoneNumber
          picture {
            url
            fileName
          }
        }
        actionResult {
          ... on Warehouse {
            name
            address
          }
        }
      }
    }
  }
`;

export const ON_EDIT_WAREHOUSE_SUBSCRIPTION = gql`
  subscription ON_EDIT_WAREHOUSE_SUBSCRIPTION {
    warehouseEditSubscription {
      error {
        message
        status
        code
        success
      }
      payload {
        timestamp
        actionType
        actionBy {
          firstName
          lastName
          role
          phoneNumber
          picture {
            url
            fileName
          }
        }
        actionResult {
          ... on Warehouse {
            name
            address
          }
        }
      }
    }
  }
`;

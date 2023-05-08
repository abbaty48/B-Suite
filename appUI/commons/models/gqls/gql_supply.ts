import { gql } from '@apollo/client';

export const GET_SUPPLY = gql`
  query GETSUPPLY(
    $supplyID: ID
    $staffID: ID
    $date: String
    $time: String
    $warehouseID: ID
  ) {
    supply(
      searchTerm: {
        supplyID: $supplyID
        staffID: $staffID
        date: $date
        time: $time
        warehouseID: $warehouseID
      }
    ) {
      error
      supply {
        supplyID
        date
        products {
          name
        }
        staff {
          firstName
          lastName
          role
        }
        totalPrice
        totalQuantity
      }
    }
  }
`;

export const GET_SUPPLIES = gql`

enum Sort {asc | desc}

query GETSUPPLIES($supplyID: ID, $staffID: ID, $date: String, $time: String, $warehouseID: ID, $pageIndex: Int, $limit: Int, $sort: Sort) {
  supplies(searchTerm: {supplyID: $supplyID, staffID: $staffID, date: $date, time: $time, warehouseID: $warehouseID}, 
            pagin: {pageIndex: $pageIndex, limit: $limit, sort: $sort}){
        error,
        supplies {
          supplyID,
          date,
          products {
            name
          },
          staff {
            firstName,
            lastName,
            role
          },
          totalPrice,
          totalQuantity
        }
  }
}
`;

export const ADD_SUPPLY = gql`
  mutation ADDSUPPLY(
    $productID: ID!
    $quantity: Int!
    $retailPrice: Float!
    $wholesalePrice: Float!
  ) {
    makeSupply(
      supplyAddInput: {
        productID: $productID
        quantity: $quantity
        retailPrice: $retailPrice
        wholesalePrice: $wholesalePrice
      }
    ) {
      error
      added
      newAdded {
        supplyID
        date
        products {
          name
          quantity
          retailPrice
          wholesalePrice
          category {
            name
          }
        }
        totalPrice
        totalQuantity
      }
    }
  }
`;

export const DELETE_SUPPLY = gql`
  mutation DELETESUPPLY($supplyID: ID!, $warehouseID: ID) {
    supplyDelete(
      supplyDeleteInput: { supplyID: $supplyID, warehouseID: $warehouseID }
    ) {
      error
      deleted
    }
  }
`;

export const EDIT_SUPPLY = gql`
  input editSupplyInput {
    productID: ID!
    quantity: Int
    retailPrice: Float
    wholesalePrice: Float
  }

  mutation EDITSUPPLY($supplyID: ID!, $supplyEditInputs: [editSupplyInput!]!) {
    supplyEdit(supplyID: $supplyID, supplyEditInput: $supplyEditInputs) {
      error
      edited
      newEdited {
        supplyID
        date
        products {
          name
          quantity
          retailPrice
          wholesalePrice
          category {
            name
          }
        }
        totalPrice
        totalQuantity
      }
    }
  }
`;

export const ON_ADD_SUPPLY_SUBSCRIPTION = gql`
  subscription ON_ADD_SUPPLY_SUBSCRIPTION {
    supplyAddSubscription {
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
        }
        actionResult {
          ... on Supply {
            staffID
            date
            products {
              name
              quantity
              retailPrice
              wholesalePrice
            }
            totalPrice
            totalQuantity
          }
        }
      }
    }
  }
`;

export const ON_EDIT_SUPPLY_SUBSCRIPTION = gql`
  subscription ON_EDIT_SUPPLY_SUBSCRIPTION {
    supplyEditSubscription {
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
        }
        actionResult {
          ... on Supply {
            staffID
            date
            products {
              name
              quantity
              retailPrice
              wholesalePrice
            }
            totalPrice
            totalQuantity
          }
        }
      }
    }
  }
`;

export const ON_DELETE_SUPPLY_SUBSCRIPTION = gql`
  subscription ON_DELETE_SUPPLY_SUBSCRIPTION {
    supplyDeleteSubscription {
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
        }
        actionResult {
          ... on Supply {
            staffID
            date
            products {
              name
              quantity
              retailPrice
              wholesalePrice
            }
            totalPrice
            totalQuantity
          }
        }
      }
    }
  }
`;

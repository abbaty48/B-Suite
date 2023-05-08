import { gql } from '@apollo/client';

export const ADD_SALE = gql`
  input saleProductMetaInput {
    productID: ID!
    quantity: Int!
  }

  input customerSocialMediaInput {
    facebook: String
    twitter: String
    instagram: String
  }

  input customerMetasInput {
    avatarURL: String
    dateOfBirth: String
    socialMedia: customerSocialMediaInput
  }

  input addCustomerInput {
    name: String!
    email: String
    address: String
    phoneNumber: String
    beneficiary: Boolean
    saleIDs: [ID!]!
    metas: customerMetasInput
    warehouseID: ID
  }

  mutation ADDSALE(
    $warehouseID: ID
    $balance: Float
    $discount: Float
    $time: String
    $date: String
    $paid: Float!
    $customerID: ID
    $productMetas: [saleProductMetaInput!]!
    $addCustomer: [addCustomerInput!]
  ) {
    saleAdd(
      saleAddInput: {
        paid: $paid
        date: $date
        time: $time
        balance: $balance
        discount: $discount
        productMetas: $productMetas
        addCustomer: $addCustomer
        customerID: $customerID
        warehouseID: $warehouseID
      }
    ) {
      added
      error
      newAdded {
        date
        discount
        paid
        balance
        profit {
          percentage
          status
        }
        totalPrice
        totalQuantity
        products {
          kind
          inStock
          quantity
          retailPrice
          wholesalePrice
          subTotal
        }
        customer {
          name
          address
        }
      }
    }
  }
`;

export const DELETE_SALE = gql`
  mutation DELETESALE($saleID: ID!, $warehouseID: ID) {
    saleDelete(saleID: $saleID, warehouseID: $warehouseID) {
      error
      deleted
    }
  }
`;

export const EDIT_SALE = gql`
  input saleProductMetaInput {
    productID: ID!
    quantity: Int!
  }

  mutation EDITSALE(
    $saleID: ID!
    $warehouseID: ID
    $balance: Float
    $discount: Float
    $time: String
    $date: String
    $paid: Float!
    $customerID: ID
    $productMetas: [saleProductMetaInput!]!
  ) {
    saleEdit(
      saleEditInput: {
        saleID: $saleID
        time: $time
        date: $date
        paid: $paid
        balance: $balance
        discount: $discount
        customerID: $customerID
        warehouseID: $warehouseID
        productMetas: $productMetas
      }
    ) {
      edited
      error
      newEdited {
        date
        discount
        paid
        balance
        profit {
          percentage
          status
        }
        totalPrice
        totalQuantity
        products {
          kind
          inStock
          quantity
          retailPrice
          wholesalePrice
          subTotal
        }
        customer {
          name
          address
        }
      }
    }
  }
`;

export const ON_SALE_ADD_SUBSCRIPTION = gql`
  subscription ON_SALE_ADD_SUBSCRIPTION {
    saleAddSubscription {
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
          ... on Sale {
            profit {
              percentage
              status
            }
            products {
              name
              expired
              kind
              quantity
              subTotal
              retailPrice
              wholesalePrice
              features {
                url
              }
            }
            customer {
              name
              address
            }
          }
        }
      }
    }
  }
`;

export const ON_SALE_EDIT_SUBSCRIPTION = gql`
  subscription ON_SALE_EDIT_SUBSCRIPTION {
    saleEditSubscription {
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
          ... on Sale {
            profit {
              percentage
              status
            }
            products {
              name
              expired
              kind
              quantity
              subTotal
              retailPrice
              wholesalePrice
              features {
                url
              }
            }
            customer {
              name
              address
            }
          }
        }
      }
    }
  }
`;

export const ON_SALE_DELETE_SUBSCRIPTION = gql`
  subscription ON_SALE_DELETE_SUBSCRIPTION {
    saleDeleteSubscription {
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
          ... on Sale {
            profit {
              percentage
              status
            }
            products {
              name
              expired
              kind
              quantity
              subTotal
              retailPrice
              wholesalePrice
              features {
                url
              }
            }
          }
        }
      }
    }
  }
`;

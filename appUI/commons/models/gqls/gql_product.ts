import { gql } from '@apollo/client';

export const GET_PRODUCT = gql`
  query GETPRODUCT(
    $name: String
    $productID: ID
    $categoryID: ID
    $warehouseID: ID
    $expirationDate: String
    $expired: Boolean
    $inStock: Boolean
    $quantity: Int
    $retailPrice: Float
    $wholesalePrice: Float
  ) {
    product(
      searchTerm: {
        name: $name
        productID: $productID
        categoryID: $categoryID
        warehouseID: $warehouseID
        expirationDate: $expirationDate
        expired: $expired
        inStock: $inStock
        quantity: $quantity
        retailPrice: $retailPrice
        wholesalePrice: $wholesalePrice
      }
    ) {
      error
      product {
        productID
        name
        quantity
        inStock
        expired
        retailPrice
        wholesalePrice
        category {
          name
        }
        features {
          url
          fileName
        }
        description
      }
    }
  }
`;

export const GET_PRODUCTS = gql`
  query GETPRODUCTS(
    $name: String
    $productID: ID
    $categoryID: ID
    $warehouseID: ID
    $expirationDate: String
    $expired: Boolean
    $inStock: Boolean
    $quantity: Int
    $retailPrice: Float
    $wholesalePrice: Float
    $pageIndex: Int
    $sort: Sort
    $limit: Int
  ) {
    products(
      searchTerm: {
        name: $name
        productID: $productID
        categoryID: $categoryID
        warehouseID: $warehouseID
        expirationDate: $expirationDate
        expired: $expired
        inStock: $inStock
        quantity: $quantity
        retailPrice: $retailPrice
        wholesalePrice: $wholesalePrice
      }
      pagin: { pageIndex: $pageIndex, limit: $limit, sort: $sort }
    ) {
      error
      products {
        productID
        name
        quantity
        inStock
        expired
        category {
          name
        }
        retailPrice
        wholesalePrice
        features {
          url
          fileName
        }
        description
      }
    }
  }
`;

export const PRODUCT_ADD = gql`
  mutation ADD_PRODUCT(
    $name: String!
    $quantity: Int!
    $retailPrice: Float!
    $wholesalePrice: Float!
    $categoryID: ID!
    $expirationDate: Date
    $featuresURI: [String!]
    $warehouseIDs: [String!]
    $description: String
  ) {
    productAdd(
      productAddInput: {
        name: $name
        quantity: $quantity
        categoryID: $categoryID
        retailPrice: $retailPrice
        wholesalePrice: $wholesalePrice
        expirationDate: $expirationDate
        featuresURI: $featuresURI
        description: $description
        warehouseIDs: $warehouseIDs
      }
    ) {
      error
      added
      newAdded {
        productID
        name
        quantity
        retailPrice
        wholesalePrice
        category {
          name
        }
        expired
        features {
          url
          fileName
        }
      }
    }
  }
`;

export const PRODUCT_EDIT = gql`
  # FeatureEditAction = ADD or REMOVE
  enum FeatureEditAction {
    ADD
    REMOVE
  }
  # editFeature input
  input editFeature {
    action: FeatureEditAction!
    addFeatureURI: [String!]
    removeFeatureByName: String
  }
  # productEdit mutation
  mutation EDIT_PRODUCT(
    $productID: ID!
    $name: String
    $retailPrice: Float
    $wholesalePrice: Float
    $categoryID: ID
    $expirationDate: String
    $editFeatures: editFeature
    $warehouseIDs: [ID!]
    $description: String
  ) {
    productEdit(
      productEditInput: {
        productID: $productID
        name: $name
        categoryID: $categoryID
        retailPrice: $retailPrice
        wholesalePrice: $wholesalePrice
        expirationDate: $expirationDate
        editFeatures: $editFeatures
        description: $description
        warehouseIDs: $warehouseIDs
      }
    ) {
      error
      edited
      newEdited {
        productID
        name
        quantity
        retailPrice
        wholesalePrice
        category {
          name
        }
        expired
        expirationDate
        inStock
        features {
          url
          fileName
        }
        description
      }
    }
  }
`;

export const PRODUCT_DELETE = gql`
  mutation DELETE_PRODUCT($productID: ID!, $warehouseID: ID) {
    productDelete(productID: $productID, warehouseID: $warehouseID) {
      error
      deleted
    }
  }
`;

export const ON_PRODUCT_ADD_SUBSCRIPTION = gql`
  subscription PRODUCT_ADD_SUBSCRIPTION {
    productAddSubscription {
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
          staffID
          firstName
          lastName
          picture {
            url
          }
          phoneNumber
          role
          address
          warehouse {
            name
            address
          }
        }
        actionResult {
          ... on Product {
            productID
            name
            retailPrice
            wholesalePrice
            quantity
            category {
              name
            }
            features {
              size
              url
              fileName
              filePath
              extension
            }
          }
        }
      }
    }
  }
`;

export const ON_PRODUCT_EDIT_SUBSCRIPTION = gql`
  subscription PRODUCT_EDIT_SUBSCRIPTION {
    productEditSubscription {
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
          staffID
          firstName
          lastName
          picture {
            url
          }
          phoneNumber
          role
          address
          warehouse {
            name
            address
          }
        }
        actionResult {
          ... on Product {
            productID
            name
            retailPrice
            wholesalePrice
            quantity
            category {
              name
            }
            features {
              size
              url
              fileName
              filePath
              extension
            }
          }
        }
      }
    }
  }
`;

export const ON_PRODUCT_DELETE_SUBSCRIPTION = gql`
    subscription PRODUCT_DELETE_SUBSCRIPTION {
        productDeleteSubscription {
            error {
            message
            status
            code
            success
            }
            payload {
            timestamp,
            actionType,
            actionBy {
            staffID
            firstName
            lastName
            picture {
            url
            }
            phoneNumber
            role
            address
            warehouse {
            name
            address
            }
        } ,
            actionResult {
                ... on Product {
                productID
                name
                retailPrice
                wholesalePrice
                quantity,
                features {
                    size
                    url
                    fileName
                    filePath
                    extension
                } 
                }
            }
            }
        }
    }
`;

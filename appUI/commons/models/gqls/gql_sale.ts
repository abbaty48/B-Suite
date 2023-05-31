import { gql } from '@apollo/client';

export const GET_SALE = gql`
  query GETSALE(
    $searchBySaleID: ID
    $searchByCustomerID: ID
    $searchByDate: String
    $searchByTime: String
    $searchByProductName: String
    $searchByProductID: ID
  ) {
    sale(
      searchTerm: {
        saleID: $searchBySaleID
        customerID: $searchByCustomerID
        date: $searchByDate
        time: $searchByTime
        productName: $searchByProductName
        productID: $searchByProductID
      }
    ) {
      error
      sale {
        saleID
        date
        time
        balance
        discount
        paid
        totalPrice
        totalQuantity
        profit {
          percentage
          status
        }
        products {
          productID
          name
          kind
          quantity
          subTotal
          retailPrice
          wholesalePrice
          features {
            url
          }
        }
        staff {
          staffID
          firstName
          lastName
          role
          picture {
            url
          }
        }
      }
    }
  }
`;

export const GET_SALES = gql`
  query GETSALES(
    $searchBySaleID: ID
    $searchByCustomerID: ID
    $searchByDate: String
    $searchByTime: String
    $searchByProductName: String
    $searchByProductID: ID
  ) {
    sales(
      searchTerm: {
        saleID: $searchBySaleID
        customerID: $searchByCustomerID
        date: $searchByDate
        time: $searchByTime
        productName: $searchByProductName
        productID: $searchByProductID
      }
    ) {
      error
      sales {
        saleID
        date
        time
        balance
        discount
        paid
        totalPrice
        totalQuantity
        profit {
          percentage
          status
        }
        products {
          productID
          name
          kind
          quantity
          subTotal
          retailPrice
          wholesalePrice
          features {
            url
          }
        }
        staff {
          staffID
          firstName
          lastName
          role
          picture {
            url
          }
        }
      }
      pagins {
        sort
        totalPaginated
        totalDocuments
        nextPageIndex
        currentPageIndex
      }
    }
  }
`;

export const ADD_SALE = gql`
  mutation ADDSALE(
    $warehouseID: ID
    $balance: Float
    $discount: Float
    $time: String
    $date: String
    $paid: Float!
    $customerID: ID
    $productMetas: [saleProductMetaInput!]!
    $addCustomer: customerAddInput
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
          quantity
          retailPrice
          wholesalePrice
          subTotal
        }
        staff {
          firstName
          lastName
          role
          phoneNumber
          picture {
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
          quantity
          retailPrice
          wholesalePrice
          subTotal
        }
        staff {
          firstName
          lastName
          role
          phoneNumber
          picture {
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
`;

export const SALESTATS = gql`
  query SALESTATS(
    $filterByDate: String
    $filterByDateRange: salesStatsFilterByRangeInputs
    $sortBy: Object
    $groupByField: Object
    $groupByDate: Boolean
    $groupByMonths: Boolean
    $groupByWeek: Boolean
    $groupByYears: Boolean
    $groupByYearsAndMonths: Boolean
    $groupByYearsAndMonthsAndWeeks: Boolean
  ) {
    salesStats(
      terms: {
        filterByDate: $filterByDate
        filterByDateRange: $filterByDateRange
        sortBy: $sortBy
        groupByField: $groupByField
        groupByDate: $groupByDate
        groupByMonths: $groupByMonths
        groupByWeek: $groupByWeek
        groupByYears: $groupByYears
        groupByYearsAndMonths: $groupByYearsAndMonths
        groupByYearsAndMonthsAndWeeks: $groupByYearsAndMonthsAndWeeks
      }
    ) {
      counts
      average
      sum
      sales {
        saleID
        date
        time
        balance
        discount
        paid
        totalPrice
        totalQuantity
        profit {
          percentage
          status
        }
        products {
          productID
          name
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
              quantity
              retailPrice
              wholesalePrice
              subTotal
            }
            staff {
              firstName
              lastName
              role
              phoneNumber
              picture {
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
              quantity
              retailPrice
              wholesalePrice
              subTotal
            }
            staff {
              firstName
              lastName
              role
              phoneNumber
              picture {
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
              quantity
              retailPrice
              wholesalePrice
              subTotal
            }
            staff {
              firstName
              lastName
              role
              phoneNumber
              picture {
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

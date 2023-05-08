import { gql } from '@apollo/client';

export const GET_STAFF = gql`
  enum StaffRole {
    Admin
    Saller
    Manager
    Accountant
    warehouse
  }
  query GETSTAFF(
    $staffID: ID
    $firstName: String
    $lastName: String
    $role: StaffRole
    $warehouseID: ID
  ) {
    staff(
      searchTerm: {
        staffID: $staffID
        firstName: $firstName
        lastName: $lastName
        role: $role
        warehouseID: $warehouseID
      }
    ) {
      error
      staff {
        staffID
        firstName
        lastName
        otherName
        phoneNumber
        role
        address
        picture {
          url
          fileName
        }
        warehouse {
          name
        }
      }
    }
  }
`;

export const GET_STAFFS = gql`
  enum StaffRole {
    Admin
    Saller
    Manager
    Accountant
    warehouse
  }

  enum Sort {
    asc
    desc
  }

  query GETSTAFF(
    $staffID: ID
    $firstName: String
    $lastName: String
    $role: StaffRole
    $warehouseID: ID
    $pageIndex: Int
    $limit: Int
    $sort: Sort
  ) {
    staffs(
      searchTerm: {
        staffID: $staffID
        firstName: $firstName
        lastName: $lastName
        role: $role
        warehouseID: $warehouseID
      }
      pagin: { pageIndex: $pageIndex, limit: $limit, sort: $sort }
    ) {
      error
      staffs {
        staffID
        firstName
        lastName
        otherName
        phoneNumber
        role
        address
        picture {
          url
          fileName
        }
        warehouse {
          name
        }
      }
      pagin {
        totalPaginated
        totalDocuments
        nextPageIndex
        currentPageIndex
      }
    }
  }
`;

export const ADD_STAFF = gql`
  enum StaffRole {
    Admin
    Saller
    Manager
    Accountant
    warehouse
  }
  mutation ADDSTAFF(
    $firstName: String!
    $lastName: String!
    $phoneNumber: String!
    $password: String!
    $role: StaffRole!
    $otherName: String
    $email: String
    $featureURI: String
    $address: String
    $warehouseID: ID
  ) {
    staffAdd(
      staffAddInput: {
        firstName: $firstName
        lastName: $lastName
        role: $role
        password: $password
        phoneNumber: $phoneNumber
        otherName: $otherName
        email: $email
        featureURI: $featureURI
        address: $address
        warehouseID: $warehouseID
      }
    ) {
      error
      added
      newAdded {
        staffID
        firstName
        lastName
        otherName
        role
        picture {
          url
          fileName
        }
        email
        phoneNumber
        address
      }
    }
  }
`;

export const DELETE_STAFF = gql`
  mutation DELETESTAFF($staffID: ID!) {
    staffDelete(staffID: $staffID) {
      error
      deleted
    }
  }
`;

export const ON_STAFF_DELETE_SUBSCRIPTION = gql`
  subscription ON_STAFF_DELETE_SUBSCRIPTION {
    staffDeleteSubscription {
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
          role
          picture {
            url
            fileName
          }
          phoneNumber
          address
        }
        actionResult {
          ... on Staff {
            firstName
            lastName
            phoneNumber
            phoneNumber
            picture {
              url
              fileName
            }
            role
          }
        }
      }
    }
  }
`;

export const ON_ADD_STAFF_SUBSCRIPTION = gql`
  subscription ON_ADD_STAFF_SUBSCRIPTION {
    staffAddSubscription {
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
            fileName
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
          ... on Staff {
            staffID
            firstName
            lastName
            phoneNumber
            picture {
              url
              fileName
            }
            role
          }
        }
      }
    }
  }
`;

import { gql } from '@apollo/client';

export const GET_STORE = gql`
  query GET_STORE {
    store {
      totalSales {
        error
        result
      }
      totalStaffs {
        error
        result
      }
      totalProducts {
        error
        result
      }
      totalCustomers {
        error
        result
      }
      totalWarehouses {
        error
        result
      }
      totalExpiredProducts {
        error
        result
      }
      enterPrise {
        error
        result {
          name
          slogan
          title
          address
          about
          contacts
          website
          email
        }
      }
      _sysInitialized
      _enterpriseInitialized
    }
  }
`;

export const INITIALIZE_SYSTEM = gql`
  mutation INITIALIZESYSTEM($initialize: Boolean!) {
    _initializeSys(_init: $initialize) {
      error
      _initialized
    }
  }
`;

export const ADD_ENTERPRISE = gql`
  input addSocialAccountInput {
    facebook: String
    twitter: String
    youtube: String
    instagram: String
  }

  input addOwnerInput {
    name: String!
    email: String!
    about: String
    picture: String
    phoneNumber: String!
    website: String
    socialAccounts: addSocialAccountInput
  }

  mutation ADD_ENTERPRISE(
    $name: String!
    $address: String!
    $contacts: [String!]!
    $title: String
    $slogan: String
    $website: String
    $email: String
    $about: String
    $owners: [addOwnerInput!]!
    $socialAccounts: addSocialAccountInput
  ) {
    enterpriseAdd(
      enterpriseAddInput: {
        name: $name
        address: $address
        contacts: $contacts
        title: $title
        slogan: $slogan
        website: $website
        email: $email
        about: $about
        owners: $owners
        socialAccounts: $socialAccounts
      }
    ) {
      error
      added
      newAdded {
        name
        slogan
        title
        address
        about
        contacts
        website
        email
        owners {
          name
          email
          about
          picture
          phoneNumber
          website
        }
        socialAccounts {
          facebook
          twitter
          youtube
          instagram
        }
      }
    }
  }
`;

export const EDIT_ENTERPRISE = gql`
  input addSocialAccountInput {
    facebook: String
    twitter: String
    youtube: String
    instagram: String
  }

  input editOwnerInput {
    name: String
    email: String
    about: String
    picture: String
    phoneNumber: String
    website: String
    socialAccounts: addSocialAccountInput
  }

  mutation EDIT_ENTERPRISE(
    $name: String
    $address: String
    $contacts: [String!]
    $title: String
    $slogan: String
    $website: String
    $email: String
    $about: String
    $owners: [editOwnerInput!]
    $socialAccounts: addSocialAccountInput
  ) {
    enterpriseEdit(
      enterpriseEditInput: {
        name: $name
        address: $address
        contacts: $contacts
        title: $title
        slogan: $slogan
        website: $website
        email: $email
        about: $about
        owners: $owners
        socialAccounts: $socialAccounts
      }
    ) {
      error
      edited
      newEdited {
        name
        slogan
        title
        address
        about
        contacts
        website
        email
        owners {
          name
          email
          about
          picture
          phoneNumber
          website
        }
        socialAccounts {
          facebook
          twitter
          youtube
          instagram
        }
      }
    }
  }
`;

export const ON_STORE_SUBSCRIPTION = gql`
  subscription ON_STORE_SUBSCRIPTION {
    storeRealTime {
      totalCustomers
      totalExpiredProducts
      totalProducts
      totalSales
      totalStaffs
      totalWarehouses
    }
  }
`;

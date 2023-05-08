import { gql } from '@apollo/client';

export const ADD_CUSTOMER = gql`
   mutation ADDCUSTOMER {
      input customerMetasInput {
         avatarURL: String,
         dateOfBirth: String,
         socialMedia: customerSocialMediaInput
      }
      mutation ADDCUSTOMER($name: String!, $address: String, $beneficiary: Boolean,
                        $email: String, $phoneNumber: String, $warehouseID: ID, $metas: customerMetasInput) {
      customerAdd(customerAddInput: {
         name: $name,
         address: $address,
         beneficiary: $beneficiary,
         email: $email,
         phoneNumber: $phoneNumber,
         warehouseID: $warehouseID,
         metas: $metas
      } ){
         added,
         error,
         newAdded {
            customerID,
            name,
            address,
            beneficiary,
            email,
            phoneNumber,
            metas {
            avatarURL,
            dateOfBirth,
            socialMedia {
               facebook,
               instagram,
               twitter
            }
            },
         }
      }
      }
   }
`;

export const EDIT_CUSTOMER = gql`
  input customerMetasInput {
    avatarURL: String
    dateOfBirth: String
    socialMedia: customerSocialMediaInput
  }
  mutation EDITCUSTOMER(
    $customerID: ID!
    $name: String
    $address: String
    $beneficiary: Boolean
    $email: String
    $phoneNumber: String
    $warehouseID: ID
    $metas: customerMetasInput
  ) {
    customerEdit(
      customerEditInput: {
        customerID: $customerID
        name: $name
        address: $address
        beneficiary: $beneficiary
        email: $email
        phoneNumber: $phoneNumber
        warehouseID: $warehouseID
        metas: $metas
      }
    ) {
      error
      edited
      newEdited {
        customerID
        name
        address
        beneficiary
        email
        phoneNumber
        metas {
          avatarURL
          dateOfBirth
          socialMedia {
            facebook
            instagram
            twitter
          }
        }
      }
    }
  }
`;

export const DELETE_CUSTOMER = gql`
  mutation DELETECUSTOMER($customerID: ID!, $warehouseID: ID) {
    customerDelete(
      customerDeleteInput: {
        customerID: $customerID
        warehouseID: $warehouseID
      }
    ) {
      error
      deleted
    }
  }
`;

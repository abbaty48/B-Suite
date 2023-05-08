import { gql } from '@apollo/client';

export const GET_CATEGORIES = gql`
  query GET_CATEGORIES($pageIndex: Int, $limit: Int, $sort: Sort) {
    categories(pagin: { pageIndex: $pageIndex, sort: $sort, limit: $limit }) {
      error
      categories {
        name
      }
      pagins {
        sort
        totalDocuments
        nextPageIndex
        currentPageIndex
      }
    }
  }
`;

export const EDIT_CATEGORY = gql`
  mutation EDIT_CATEGORY($oldCategoryName: String!, $newCategoryName: String!) {
    categoryEdit(
      categoryEditInput: {
        oldCategory: $oldCategoryName,
        newCategory: $newCategoryName
      }
    ) {
      error
      edited
      newValue
    }
  }
`;

export const DELETE_CATEGORY = gql`
  mutation DELETE_CATEGORY($categoryName: String!) {
    categoryDelete(category: $categoryName) {
      error
      deleted
    }
  }
`;

export const ON_CATEGORY_ADD_SUBSCRIPTION = gql`
   subscription ON_CATEGORY_ADD_SUBSCRIPTION {
      categoryAddSubscription {
            error {
            code,
            message,
            status,
            success
            },
            payload {
            timestamp,
            actionType,
            actionBy {
               firstName,
               lastName,
               role,
            },
            actionResult {
               ... on Category {
                  name
               },
            },
         },
      }
   }
`;

export const ON_CATEGORY_EDIT_SUBSCRIPTION = gql`
  subscription ON_CATEGORY_EDIT_SUBSCRIPTION {
    categoryEditSubscription {
      error {
        code
        message
        status
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
          ... on Category {
            name
          }
        }
      }
    }
  }
`;

export const ON_CATEGORY_DELETE_SUBSCRIPTION = gql`
  subscription ON_CATEGORY_DELETE_SUBSCRIPTION {
    categoryDeleteSubscription {
      error {
        code
        message
        status
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
          ... on Category {
            name
          }
        }
      }
    }
  }
`;

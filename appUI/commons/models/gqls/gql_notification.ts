import { gql } from '@apollo/client';

export const GET_NOTIFICATIONS = gql`
  query GETNOTIFICATIONS(
    $searchById: ID
    $searchByTitle: String
    $searchByDate: String
    $searchByTime: String
    $searchByStatus: NotificationStatus
    $searchByType: NotificationType
    $pageIndex: Int
    $paginLimit: Int
    $pageSort: Sort
  ) {
    notifications(
      searchTerm: {
        id: $searchById
        title: $searchByTitle
        date: $searchByDate
        time: $searchByTime
        type: $searchByType
        status: $searchByStatus
      }
      pagin: { pageIndex: $pageIndex, limit: $paginLimit, sort: $pageSort }
    ) {
      error
      notifications {
        id
        type
        title
        status
        dateTime
        description
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

export const NOTIFICATION_ADD = gql`
  mutation NOTIFICATIONADD(
    $title: String!
    $dateTime: Date!
    $type: NotificationType!
    $status: NotificationStatus!
    $description: String!
  ) {
    notificationAdd(
      notificationAddInput: {
        title: $title
        type: $type
        status: $status
        dateTime: $dateTime
        description: $description
      }
    ) {
      added
      error
      newAdded {
        id
        title
        type
        status
        dateTime
        description
      }
    }
  }
`;

export const NOTIFICATION_DELETE = gql`
  mutation NOTIFICATIONDELETE($notificationID: ID!) {
    notificationDelete(id: $notificationID) {
      error
      deleted
    }
  }
`;

export const NOTIFICATION_CLEAR = gql`
  mutation NOTIFICATIONCLEAR(
    $deleteById: ID
    $deleteByTitle: String
    $deleteByDate: String
    $deleteByTime: String
    $deleteByType: NotificationType
    $deleteByStatus: NotificationStatus
  ) {
    notificationClear(
      deleteTerm: {
        id: $deleteById
        title: $deleteByTitle
        date: $deleteByDate
        time: $deleteByTime
        type: $deleteByType
        status: $deleteByStatus
      }
    ) {
      error
      deleted
    }
  }
`;

export const NOTIFICATION_MARKASREAD = gql`
  mutation MARKASREAD($notificationID: ID!) {
    notificationAsRead(id: $notificationID) {
      error
      marked
    }
  }
`;
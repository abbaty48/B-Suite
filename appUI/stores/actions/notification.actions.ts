type NotificationActions =
  | {
      type: 'SET_TOTAL_READ_NOTIFICATIONS';
      payload: number;
    }
  | {
      type: 'SET_TOTAL_UNREAD_NOTIFICATIONS';
      payload: number;
    }
  | {
      type: 'SET_LOADING';
      payload: boolean;
    }
  | {
      type: 'SET_NEWNOTIFICATION';
      payload: boolean;
    };

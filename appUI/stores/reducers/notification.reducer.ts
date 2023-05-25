import { INotificationStates } from '@ui-stores/states/notification.states';

export const NotificationReducer = (
  states: INotificationStates,
  actions: NotificationActions
): INotificationStates => {
  const { type, payload } = actions;

  switch (type) {
    case 'SET_TOTAL_READ_NOTIFICATIONS':
      return {
        ...states,
        totalReadNotifications: payload,
      };
    case 'SET_TOTAL_UNREAD_NOTIFICATIONS':
      return { ...states, totalUnreadNotifications: payload };
    case 'SET_LOADING':
      return { ...states, isLoading: payload };
    case 'SET_NEWNOTIFICATION':
      return { ...states, newNotification: payload };
    default:
      return states;
  }
};

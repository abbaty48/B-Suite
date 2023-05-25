export interface INotificationStates {
  isLoading: boolean;
  newNotification: boolean;
  totalReadNotifications: number;
  totalUnreadNotifications: number;
}

export const INotificationInitialStates: INotificationStates = {
  isLoading: true,
  newNotification: false,
  totalReadNotifications: 0,
  totalUnreadNotifications: 0,
};

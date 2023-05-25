import { NotificationContext } from "@/appUI/providers/notificationProvider";
import { Notifications } from '@ui-components/notification/notifications'
import { Badge, Popover, Button } from "antd";
import { useContext } from "react";

// Notification Button
export const NotificationButton = () => {

   const { notificationStates } = useContext(NotificationContext);

   const title = notificationStates.totalUnreadNotifications ?
      `${notificationStates.totalUnreadNotifications} unread notifications.` : 'Notifications';

   return notificationStates.isLoading || notificationStates.newNotification ? (
      <Badge dot={true} status="processing">
         <i className="--icon --icon-comment-alt"></i>
      </Badge>) : (
      <Popover content={<Notifications />} trigger={["click"]}>
         <Badge count={notificationStates.totalUnreadNotifications} size="small">
            <Button type="text" icon={<i className="--icon --icon-comment-alt"></i>} title={title} />
         </Badge>
      </Popover>
   )
}
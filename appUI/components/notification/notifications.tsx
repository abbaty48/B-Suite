import { NotificationStatus } from "@/appServer/src/models/@types/resolver_types"
import { Notification } from '@ui-components/notification/notification'
import { Tabs, Space } from "antd"

// NOTIFICATIONS
export const Notifications = () => {

   return (
      <div className="--notifications-panel overflow-hidden w-[350px]">
         <Tabs type="card" size="small" items={[
            {
               key: 'todays',
               label: <Space direction="horizontal">
                  <i className={'--icon --icon-calendar-light-#1'}></i>
                  <span>Today</span>
               </Space>,
               animated: true,
               children: <Notification type={{ date: Date.now().toString() }} />
            },
            {
               key: 'all',
               label: <Space direction="horizontal">
                  <i className={'--icon --icon-asterisk'}></i>
                  <span>All</span>
               </Space>,
               animated: true,
               children: <Notification />
            }, {
               key: 'unread',
               label: <Space direction="horizontal">
                  <i className={'--icon --icon-unsubscribe'}></i>
                  <span>Unview</span>
               </Space>,
               animated: true,
               children: <Notification type={{ status: NotificationStatus.UnRead }} />
            }
         ]} />
      </div>
   )
}

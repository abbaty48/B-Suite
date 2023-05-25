import { INotification, NotificationType, NotificationStatus } from "@/appServer/src/models/@types/resolver_types"
import { NOTIFICATION_MARKASREAD } from "@/appUI/commons/models/gqls/gql_notification"
import { NotificationContext } from "@/appUI/providers/notificationProvider"
import { theme, Collapse, Button, Space, Tag } from "antd"
import { DateTransfomer } from "@/appUI/commons/helpers"
import { useMutation } from "@apollo/client"
import { useContext } from "react"

// NOTIFICATION ITEM
export const NotificationItem = (props: INotification) => {
   const { id, title, type, status, dateTime, description } = props

   const { token } = theme.useToken()

   const { _apolloClient, removeNotification, fetchNotifications } = useContext(NotificationContext)

   const [markAsRead] = useMutation(NOTIFICATION_MARKASREAD, { client: _apolloClient })

   const getNotificationStyle = (): React.CSSProperties => {
      switch (type) {
         case NotificationType.Info: return { backgroundColor: token.colorInfoBg, color: token.colorInfoText, width: '100%', maxHeight: 200, overflow: 'hidden', textOverflow: 'ellipsis' };
         case NotificationType.Error: return { backgroundColor: token.colorErrorBg, color: token.colorErrorText, width: '100%', maxHeight: 200, overflow: 'hidden', textOverflow: 'ellipsis' };
         case NotificationType.Success: return { backgroundColor: token.colorSuccessBg, color: token.colorSuccessText, width: '100%', maxHeight: 200, overflow: 'hidden', textOverflow: 'ellipsis' }
      }
   }

   const onCollapsed = (keys: string[]) => {
      // mark the notificaiton as readed
      setTimeout(() => {
         const _key = keys[0]
         if (_key && status != NotificationStatus.Read) {
            markAsRead({ variables: { notificationID: _key } }).then(() => {
               fetchNotifications()
            }) // end then
         } // end if
      }, 2000);
   } // end onCollaped

   return (
      <Collapse onChange={onCollapsed}>
         <Collapse.Panel key={id} header={<strong>{title}</strong>} extra={
            <Button type="text" icon={<i className={'--icon --icon-trash'}></i>}
               onClick={() => removeNotification({ variables: { notificationID: id } })} />
         } collapsible="header" className="hover:animate-fadeOut"
            children={
               <Space direction="vertical" size={'large'} style={getNotificationStyle()}>
                  <p>{description}</p>
                  <Space direction="horizontal" >
                     {/* Type and Status */}
                     <Space direction="horizontal">
                        <Tag color={type}>{type}</Tag>
                     </Space>
                     {/* Date and Time */}
                     <Space direction="horizontal">
                        <span>{DateTransfomer.exploidDate(dateTime)}</span>
                        <span>{DateTransfomer.exploidTime(dateTime)}</span>
                     </Space>
                  </Space>
               </Space>
            } />
      </Collapse>
   )
}
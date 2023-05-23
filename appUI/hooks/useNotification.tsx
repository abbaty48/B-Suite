import { GET_NOTIFICATIONS, NOTIFICATION_ADD, NOTIFICATION_CLEAR, NOTIFICATION_DELETE, NOTIFICATION_MARKASREAD } from "@ui-commons/models/gqls/gql_notification"
import { INotification, NotificationStatus, NotificationType, NotificationsPayload, Sort } from "@/appServer/src/models/@types/resolver_types"
import { ApolloClient, HttpLink, InMemoryCache, useLazyQuery, useMutation, useQuery } from "@apollo/client"
import { Badge, Button, Space, Tabs, theme, List, Spin, Popover, Collapse, Tag } from "antd"
import React, { useCallback, useContext, useEffect, useMemo, useState } from "react"
import { DateTransfomer, currentUser } from "@ui-commons/helpers"
import { AppContext } from "@ui-stores/contexts/app"

// ApolloClient
const _apolloClient = new ApolloClient({
   cache: new InMemoryCache(),
   link: new HttpLink({
      uri: 'http://localhost:3001/v1/notification',
      headers: {
         'content-type': 'application/json',
         'authorization': `Bearer ${currentUser?.token}`
      }
   })
}) // end new ApolloClient

export const useNotification = () => {
   const { state, dispatch } = useContext(AppContext)
   const [states, setStates] = useState({
      isLoading: true,
      isNewArraived: false,
      notificationCount: 0,
      readNotificationCount: 0,
      unReadNotificationCount: 0,
   })

   const onError = () => {
      setStates(({ ...states, isLoading: false }))
   }

   const onCompleted = () => {
      fetchNotifications()
   }

   const [addNotification] = useMutation(NOTIFICATION_ADD, { client: _apolloClient, onCompleted: onCompleted, onError: onError })
   const [clearNotifications] = useMutation(NOTIFICATION_CLEAR, { client: _apolloClient, onCompleted: onCompleted, onError: onError })
   const [removeNotification] = useMutation(NOTIFICATION_DELETE, { client: _apolloClient, onCompleted: onCompleted, onError: onError })
   const [getNotifications, { data: _data_notifications }] = useLazyQuery(GET_NOTIFICATIONS, { client: _apolloClient, onError: onError })

   const fetchNotifications = useCallback(() => {
      getNotifications()
      // console.log('#1')
      if (_data_notifications) {
         // console.log('#2')
         const _results = _data_notifications?.notifications as NotificationsPayload
         setStates(({
            ...states,
            isLoading: false,
            // filter out readNoticiations
            readNotificationCount: _results?.notifications?.filter(n => n.status === NotificationStatus.Read).length,
            // filter out unreadNotifications
            unReadNotificationCount: _results?.notifications?.filter(n => n.status === NotificationStatus.UnRead).length,
         }));
      }
   }, [_data_notifications])

   useMemo(() => fetchNotifications(), [fetchNotifications])
   /** */
   const NotificationItem = (props: INotification) => {
      const { id, title, type, status, dateTime, description } = props

      const { token } = theme.useToken()

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
         const _key = keys[0]
         if (_key && status != NotificationStatus.Read) {
            markAsRead({ variables: { notificationID: _key } })
         }
      }

      return (
         <Collapse onChange={onCollapsed}>
            <Collapse.Panel key={id} header={<strong>{title}</strong>} extra={
               <Button type="text" icon={<i className={'--icon --icon-trash'}></i>} onClick={() => removeNotification({ variables: { notificationID: id }, onCompleted: onCompleted })} />
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
   /** */
   const NotificationsList = () => {

      const AllNotifications = () => {
         const [states, setStates] = useState({
            isFetching: true,
            pageIndex: 0,
            limit: 10,
            sort: Sort.Desc
         })

         const { loading, data, error } = useQuery(GET_NOTIFICATIONS, {
            client: _apolloClient, variables: {
               pageIndex: states.pageIndex,
               paginLimit: states.limit,
               pageSort: states.sort
            }
         })

         return (
            <Spin spinning={loading} size="small" indicator={<i className="--icon --icon-spin1 --spin"></i>}>
               {
                  (data?.notifications?.notifications.length > 0) && <List dataSource={data?.notifications.notifications}
                     itemLayout="vertical" size="small"
                     renderItem={(item: INotification) => <NotificationItem {...item} />} />
               }
            </Spin>
         )
      }

      const ReadNotificationList = () => {
         const [states, setStates] = useState({
            isFetching: true,
            pageIndex: 0,
            limit: 10,
            sort: Sort.Desc
         })

         const { loading, data, error } = useQuery(GET_NOTIFICATIONS, {
            client: _apolloClient, variables: {
               searchByStatus: NotificationStatus.Read,
               pageIndex: states.pageIndex,
               paginLimit: states.limit,
               pageSort: states.sort
            }
         })

         return (
            <Spin spinning={loading} size="small" indicator={<i className="--icon --icon-spin1 --spin"></i>}>
               {
                  (data?.notifications?.notifications.length > 0) && <List dataSource={data?.notifications.notifications}
                     itemLayout="vertical" size="small"
                     renderItem={(item: INotification) => <NotificationItem {...item} />} />
               }
            </Spin>
         )
      }

      const UnReadNotificationList = () => {
         const [states, setStates] = useState({
            isFetching: true,
            pageIndex: 0,
            limit: 10,
            sort: Sort.Desc
         })

         const { loading, data, error } = useQuery(GET_NOTIFICATIONS, {
            client: _apolloClient, variables: {
               searchByStatus: NotificationStatus.UnRead,
               pageIndex: states.pageIndex,
               paginLimit: states.limit,
               pageSort: states.sort
            }
         })

         return (
            <Spin spinning={loading} size="small" indicator={<i className="--icon --icon-spin1 --spin"></i>}>
               {
                  (data?.notifications?.notifications.length > 0) && <List dataSource={data?.notifications.notifications}
                     itemLayout="vertical" size="small"
                     renderItem={(item: INotification) => <NotificationItem {...item} />} />
               }
            </Spin>
         )
      }

      const TodayNotificationList = () => {
         const [states, setStates] = useState({
            isFetching: true,
            pageIndex: 0,
            limit: 10,
            sort: Sort.Desc
         })
         const { loading, data, error } = useQuery(GET_NOTIFICATIONS, {
            client: _apolloClient, variables: {
               searchByDate: DateTransfomer.todayDate(),
               pageIndex: states.pageIndex,
               paginLimit: states.limit,
               pageSort: states.sort
            }
         })

         return (
            <Spin spinning={loading} size="small" indicator={<i className="--icon --icon-spin1 --spin"></i>}>
               {
                  (data?.notifications?.notifications.length > 0) && <List dataSource={data?.notifications.notifications}
                     itemLayout="horizontal"
                     renderItem={(item: INotification) => <NotificationItem {...item} />} />
               }
            </Spin>
         )
      }

      return (
         <div className="--notifications-panel overflow-y-auto max-w-[400px]" style={{ maxHeight: 'calc(100vh - 300px)' }}>
            <Tabs animated type="card" size="small" items={[
               {
                  key: 'todays',
                  label: <Space direction="horizontal">
                     <i className={'--icon --icon-calendar-light-#1'}></i>
                     <span>Today</span>
                  </Space>,
                  animated: true,
                  children: <TodayNotificationList />
               },
               {
                  key: 'all',
                  label: <Space direction="horizontal">
                     <i className={'--icon --icon-notification'}></i>
                     <span>All</span>
                  </Space>,
                  animated: true,
                  children: <AllNotifications />
               }, {
                  key: 'read',
                  label: <Space direction="horizontal">
                     <i className={'--icon --icon-subscribe'}></i>
                     <span>Read Notifications</span>
                  </Space>,
                  animated: true,
                  children: <ReadNotificationList />
               }, {
                  key: 'unread',
                  label: <Space direction="horizontal">
                     <i className={'--icon --icon-unsubscribe'}></i>
                     <span>UnRead Notifications</span>
                  </Space>,
                  animated: true,
                  children: <UnReadNotificationList />
               }
            ]} />
         </div>
      )
   }

   const NoficationButton = () => {
      const title = `${states.unReadNotificationCount} unread notifications.`;

      return states.isLoading || states.isNewArraived ? (
         <Badge dot={true} status="processing">
            <i className="--icon --icon-comment-alt"></i>
         </Badge>) : (
         <Popover content={<NotificationsList />} trigger={["click"]}>
            <Badge count={states.unReadNotificationCount} size="small">
               <Button type="text" icon={<i className="--icon --icon-comment-alt"></i>} title={title} />
            </Badge>
         </Popover>
      )
   }

   return {
      NotificationsList, NoficationButton,
      addNotification, removeNotification, clearNotifications
   } as const
}

import { AppContext } from "@ui-stores/contexts/app"
import { NotificationReducer } from "@ui-stores/reducers/notification.reducer"
import { INotificationInitialStates, INotificationStates } from "@ui-stores/states/notification.states"
import { Dispatch, ReactNode, createContext, useCallback, useContext, useMemo, useReducer } from "react"
import { NotificationStatus, NotificationsPayload } from "@/appServer/src/models/@types/resolver_types"
import { GET_NOTIFICATIONS, NOTIFICATION_ADD, NOTIFICATION_CLEAR, NOTIFICATION_DELETE } from "@ui-commons/models/gqls/gql_notification"
import { ApolloClient, InMemoryCache, HttpLink, useMutation, useLazyQuery, MutationFunctionOptions, ApolloCache, DefaultContext, OperationVariables, LazyQueryExecFunction, NormalizedCacheObject } from "@apollo/client"

/**
 * NotificationContext
 */
export const NotificationContext = createContext<{
   addNotification: (options?: MutationFunctionOptions<any, OperationVariables, DefaultContext, ApolloCache<any>>) => void,
   clearNotifications: (options?: MutationFunctionOptions<any, OperationVariables, DefaultContext, ApolloCache<any>>) => void,
   removeNotification: (options?: MutationFunctionOptions<any, OperationVariables, DefaultContext, ApolloCache<any>>) => void,
   getNotifications: LazyQueryExecFunction<any, OperationVariables>,
   dispatchNotificationStates: Dispatch<NotificationActions>,
   _apolloClient: ApolloClient<NormalizedCacheObject>
   notificationStates: INotificationStates,
   fetchNotifications: () => void,
}>({
   _apolloClient: undefined,
   addNotification: undefined,
   getNotifications: undefined,
   clearNotifications: undefined,
   removeNotification: undefined,
   fetchNotifications: undefined,
   dispatchNotificationStates: () => undefined,
   notificationStates: INotificationInitialStates,
})

/** APOLLO CLIENT FOR NOTIFICATIONS */
const _apolloClient = new ApolloClient({
   cache: new InMemoryCache(),
   link: new HttpLink({
      uri: 'http://localhost:3001/v1/notification',
      headers: {
         'content-type': 'application/json',
      }
   })
}) // end new ApolloClient

export const NotificationProvider = (props: { children: ReactNode }) => {

   const { dispatch } = useContext(AppContext)

   const onError = () => {
      dispatchNotificationStates({ type: 'SET_LOADING', payload: false })
   }

   const [notificationStates, dispatchNotificationStates] = useReducer(NotificationReducer, INotificationInitialStates)
   const [_clearNotifications] = useMutation(NOTIFICATION_CLEAR, { client: _apolloClient, onError: onError })
   const [getNotifications, { data: _data_notifications }] = useLazyQuery(GET_NOTIFICATIONS, { client: _apolloClient, onError: onError })
   const [_addNotification] = useMutation(NOTIFICATION_ADD, { client: _apolloClient, onCompleted: () => fetchNotifications(), onError: onError })
   const [_removeNotification] = useMutation(NOTIFICATION_DELETE, { client: _apolloClient, onCompleted: () => fetchNotifications(), onError: onError })

   const fetchNotifications = useCallback(() => {
      getNotifications()
      if (_data_notifications) {
         setTimeout(() => {
            const _results = _data_notifications?.notifications as NotificationsPayload
            dispatch({ type: 'SET_ACTIVITY_ONGOING', payload: { onGoing: false, reason: '' } })
            dispatchNotificationStates({ type: 'SET_LOADING', payload: false })
            dispatchNotificationStates({ type: 'SET_TOTAL_READ_NOTIFICATIONS', payload: _results?.notifications?.filter(n => n.status === NotificationStatus.Read).length })
            dispatchNotificationStates({ type: 'SET_TOTAL_UNREAD_NOTIFICATIONS', payload: _results?.notifications?.filter(n => n.status === NotificationStatus.UnRead).length })
         }, 100);
      }

   }, [_data_notifications])

   const removeNotification = useCallback(
      async (options?: MutationFunctionOptions<any, OperationVariables, DefaultContext, ApolloCache<any>>) => {
         dispatch({
            type: 'SET_ACTIVITY_ONGOING',
            payload: {
               onGoing: true,
               reason: `Removing a notification`
            }
         })
         await _removeNotification(options)
      },
      [],
   )

   const clearNotifications = useCallback(
      async (options?: MutationFunctionOptions<any, OperationVariables, DefaultContext, ApolloCache<any>>) => {
         dispatch({
            type: 'SET_ACTIVITY_ONGOING',
            payload: {
               onGoing: true,
               reason: `Clearing notifications`
            }
         })
         _clearNotifications(options).then(() => {
            fetchNotifications()
         })
      },
      [notificationStates],
   )

   const addNotification = useCallback(
      async (options?: MutationFunctionOptions<any, OperationVariables, DefaultContext, ApolloCache<any>>) => {
         dispatch({
            type: 'SET_ACTIVITY_ONGOING',
            payload: {
               onGoing: true,
               reason: `Adding notifications`
            }
         })
         await _addNotification(options)
      },
      [],
   )


   useMemo(() => fetchNotifications(), [fetchNotifications])

   return (
      <NotificationContext.Provider value={{ notificationStates, dispatchNotificationStates, _apolloClient, fetchNotifications, addNotification, clearNotifications, getNotifications, removeNotification }}>
         {props.children}
      </NotificationContext.Provider>
   )
}

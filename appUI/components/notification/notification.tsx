import { NotificationSearchInput, Sort, INotification } from "@/appServer/src/models/@types/resolver_types"
import { GET_NOTIFICATIONS } from "@/appUI/commons/models/gqls/gql_notification"
import { InfinitScroller } from '@ui-components/infinitscroller/infinitscroller'
import { NotificationItem } from "@ui-components/notification/notificationItem"
import { NotificationContext } from "@/appUI/providers/notificationProvider"
import { Spin, List, Popconfirm, Button } from "antd"
import { useState, useContext, useRef } from "react"
import { useLazyQuery } from "@apollo/client"

// NOTIFICATION TYPE
export const Notification = (props: { type?: NotificationSearchInput }) => {

   const { status, date, time, title } = props.type ?? {}

   const { _apolloClient, clearNotifications } = useContext(NotificationContext)
   const [states, setStates] = useState({
      data: [],
      limit: 5,
      pageIndex: 0,
      hasMore: true,
      sort: Sort.Desc,
      isFetching: false,
   })

   const containerRef = useRef<HTMLDivElement>(null)

   const criteria =
      status ? { searchByStatus: status } :
         date ? { searchByDate: date } :
            time ? { searchByTime: time } :
               title ? { searchByTitle: title } : {}

   const onConfirmClear = () => {
      const criteria =
         status ? { deleteByStatus: status } :
            date ? { deleteByDate: date } :
               time ? { deleteByTime: time } :
                  title ? { deleteByTitle: title } : {};


      clearNotifications({ variables: { ...criteria } });
      getNotifications()
   }

   const [getNotifications, { loading }] = useLazyQuery(GET_NOTIFICATIONS, { client: _apolloClient })

   const loadMore = async () => {
      if (states.isFetching) { return }

      setStates(({ ...states, isFetching: true }))

      const { data } = await getNotifications({
         variables: {
            ...criteria,
            pageIndex: states.pageIndex,
            paginLimit: states.limit,
            pageSort: states.sort
         }
      })
      setTimeout(async () => {
         setStates(({
            ...states,
            isFetching: false,
            hasMore: data?.notifications?.notifications.length > 0,
            pageIndex: data?.notifications.pagins.nextPageIndex ?? states.pageIndex + 1,
            data: [...states.data, ...data?.notifications.notifications],
         }))
      }, 1000);
   }

   return (
      <Spin spinning={loading} size="small" indicator={<i className="--icon --icon-spin1 --spin"></i>}>
         <div ref={containerRef} style={{ maxHeight: 300, overflowY: 'auto' }}>
            {
               containerRef?.current && (
                  <InfinitScroller loadMore={states.hasMore} loadOnMount={true} callBack={loadMore} container={containerRef?.current}>
                     <List dataSource={states.data} itemLayout="vertical" size="small" header={
                        states.data.length > 0 && (
                           <Popconfirm title={`Clear All Notifications?`} onConfirm={onConfirmClear}>
                              <Button icon={<i className="--icon --icon-cancel-alt-filled mx-2"></i>}> Clear</Button>
                           </Popconfirm>
                        )
                     }
                        renderItem={(item: INotification) => <NotificationItem {...item} />} />
                     {states.isFetching &&
                        <div className="py-2 w-full flex items-center justify-center">
                           <i className="--icon --icon-spin1 --spin"></i>
                        </div>
                     }
                  </InfinitScroller>
               )
            }
         </div>
      </Spin>
   )
}

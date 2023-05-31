import { ON_SALE_ADD_SUBSCRIPTION, SALESTATS } from "@/appUI/commons/models/gqls/gql_sale"
import { SaleAddSubscription, SaleStats } from '@/appServer/src/models/@types/resolver_types';
import { Card, Empty, Space, Spin, Tag, theme } from 'antd';
import { useLazyQuery, useSubscription } from "@apollo/client"
import { DateTransfomer } from '@/appUI/commons/helpers';
import { useCallback, useMemo, useState } from "react"
import { LoadingOutlined } from '@ant-design/icons'
import { Line } from '@ant-design/plots'


interface IStatsResult {
   salesStats: [SaleStats]
}

interface IAddSubscription {
   saleAddSubscription: SaleAddSubscription
}

export const WeekSales = () => {

   const { token } = theme.useToken()
   const [stats, setStats] = useState<SaleStats>(null)
   const [getStats, { loading: loadingData }] = useLazyQuery<IStatsResult>(SALESTATS, {
      variables: { groupByWeek: true },
   })

   const execGetStats = useCallback(
      async () => {
         // Get stats
         const { data } = await getStats()
         // if data, then set stats
         if (data && data?.salesStats.length) {
            setStats(data?.salesStats[0])
         } // end if data
      },
      [stats],
   )
   // Listen for a new sale
   useSubscription<IAddSubscription>(ON_SALE_ADD_SUBSCRIPTION, {
      async onData() {
         const { data } = await (await getStats()).refetch();
         // if data, then set stats
         if (data && data?.salesStats.length) {
            setStats(data?.salesStats[0])
         } // end if data
      },
   })

   useMemo(async () => {
      execGetStats()
   }, [stats])

   return (
      <Spin spinning={loadingData} indicator={<LoadingOutlined />}>
         <Card title={<h5>This week sale's {DateTransfomer.dateString(new Date().toISOString())}</h5>}>
            {
               !stats?.sales.length ? (<Empty description="No Sales made this week" />) : (
                  <Space direction='vertical'>
                     <Space direction='horizontal'>
                        <Tag color='success' className='text-2xl'>Total Sale's Price: {stats?.sum}</Tag>
                        <Tag color='default'>Total Sale's Avg: {stats?.average}</Tag>
                        <Tag color='default'>Total Item Sale's: {stats?.counts}</Tag>
                     </Space>
                     <Line data={stats?.sales.map(sale => ({ ...sale, day: DateTransfomer.dayName(sale.date) }))}
                        label={{ autoRotate: true }} color={token.colorPrimary}
                        xField='day' yField='paid' height={150}
                     />
                  </Space>
               )
            }
         </Card>
      </Spin>
   )
}

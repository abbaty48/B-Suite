import { SaleAddSubscription, SaleProduct, SaleStats } from '@/appServer/src/models/@types/resolver_types';
import { ON_SALE_ADD_SUBSCRIPTION, SALESTATS } from "@/appUI/commons/models/gqls/gql_sale"
import { Card, Col, Empty, Row, Space, Spin, Tag, theme } from 'antd';
import { useLazyQuery, useSubscription } from "@apollo/client"
import { DateTransfomer } from '@/appUI/commons/helpers';
import { useCallback, useMemo, useState } from "react"
import { LoadingOutlined } from '@ant-design/icons'
import { Column } from '@ant-design/plots'


interface IStatsResult {
   salesStats: [SaleStats]
}

interface IAddSubscription {
   saleAddSubscription: SaleAddSubscription
}

export const TdaySales = () => {

   const { token } = theme.useToken()
   const [stats, setStats] = useState<SaleStats>(null)
   const [getStats, { loading: loadingData }] = useLazyQuery<IStatsResult>(SALESTATS, {
      variables: { filterByDate: DateTransfomer.todayDate("M/D/YYYY") },
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
         <Card title={<h5>Today sale's {DateTransfomer.dateString(new Date().toISOString())}</h5>}>
            {
               !stats?.sales.length ? (<Empty description="No Sales make for today, make some sales to see result here." />) : (
                  <Row gutter={[10, 10]} justify={'space-between'} align={'middle'}>
                     <Col span={17}>
                        <Column localRefresh={true} autoFit={true} height={200} data={stats?.sales} xField={'time'} yField='paid' color={token.colorPrimary}
                           xAxis={{ label: { autoRotate: false, style: { fontWeight: 'bolder', fill: token.colorPrimaryText } } }}
                           tooltip={{
                              customContent(title, _) {
                                 return (
                                    <div style={{ backgroundColor: token.colorBgBase, color: token.colorPrimaryText, padding: 10 }}>
                                       <Space direction="vertical">
                                          <strong>{_[0]?.data.products.length} Products</strong>
                                          <Space direction='horizontal' wrap>Name - {_[0]?.data.products.map((product: SaleProduct) => <Tag key={product.productID} color='success'>{product.name}</Tag>)}</Space>
                                          <p>Paid - {_[0]?.data.paid}</p>
                                          <p>TotalPrice - {_[0]?.data.totalPrice}</p>
                                          <p>Profit - {_[0]?.data.profit.percentage}% {_[0]?.data.profit.status}</p>
                                       </Space>
                                    </div>
                                 )
                              },
                           }}
                           slider={{ start: 0.1, end: 1 }} />
                     </Col>
                     <Col span={6}>
                        <Space direction='vertical'>
                           <Tag color='success' className='text-2xl'>Total Sale's Price: {stats?.sum}</Tag>
                           <Tag color='default'>Total Sale's Avg: {stats?.average}</Tag>
                           <Tag color='default'>Total Item Sale's: {stats?.counts}</Tag>
                        </Space>
                     </Col>
                  </Row>
               )
            }
         </Card>
      </Spin>
   )
}

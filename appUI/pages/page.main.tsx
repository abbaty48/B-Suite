import { Content } from 'antd/es/layout/layout'
import { Col, FloatButton, Layout, Row } from 'antd'
import { TdaySales } from '@ui-components/metrics/tdaySales/tdaySales'
import { WeekSales } from '@ui-components/metrics/weekSales/weekSales'
import { LatestOrLastSale } from '@ui-components/metrics/lols/latestOrlastSale'

export const MainPage = () => {

  return (
    <>
      <Layout>
        <Content className='p-3'>
          <Row justify={'space-around'} gutter={[10, 10]}>
            <Col span={12}>
              <LatestOrLastSale />
            </Col>
            <Col span={12}>
              <TdaySales />
            </Col>
            <Col span={12}>
              <WeekSales />
            </Col>
          </Row>
        </Content>
      </Layout>
      <FloatButton shape='circle' icon={<i className='--icon --icon-plus'></i>} tooltip={'Make Sale'} />
    </>
  )
}

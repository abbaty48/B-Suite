import { FloatButton, Layout, Row } from 'antd'
import { Content } from 'antd/es/layout/layout'
import { LatestOrLastSale } from '@ui-components/metrics/lols/latestOrlastSale'
export const MainPage = () => {

  return (
    <>
      <Layout>
        <Content className='p-3'>
            <Row align={'stretch'} justify={'space-between'} gutter={[0, 10]}>
              <LatestOrLastSale />
            </Row>
        </Content>
      </Layout>
      <FloatButton shape='circle' icon={<i className='--icon --icon-plus'></i>} tooltip={'Make Sale'} />
    </>
  )
}

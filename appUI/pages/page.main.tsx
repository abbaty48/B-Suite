import { FloatButton, Layout, Row } from 'antd'
import { Content } from 'antd/es/layout/layout'
export const MainPage = () => {

  return (
    <>
      <Layout>
        <Content>
          <Row align={'stretch'} justify={'space-between'} gutter={[0, 10]}>

          </Row>
        </Content>
      </Layout>
      <FloatButton shape='circle' icon={<i className='--icon --icon-sales-light-#1'></i>} tooltip={'Make Sale'} />
    </>
  )
}

import { Sale, SaleAddSubscription } from "@/appServer/src/models/@types/resolver_types";
import { GET_SALE, ON_SALE_ADD_SUBSCRIPTION } from "@/appUI/commons/models/gqls/gql_sale";
import { Card, Col, Divider, List, Popover, Row, Space, Spin, Tag, theme } from "antd";
import { useQuery, useSubscription } from "@apollo/client"
import { DateTransfomer } from "@/appUI/commons/helpers";
import { Gauge, GaugeConfig } from '@ant-design/plots'
import { LoadingOutlined } from '@ant-design/icons'
import { useEffect, useState } from "react";

interface ISaleResult {
  sale: {
    error?: string;
    sale: Sale
  }
}

interface IAddSubscription {
  saleAddSubscription: SaleAddSubscription
}

export const LatestOrLastSale = () => {
  const { token } = theme.useToken()
  const [sale, setSale] = useState<Sale>(null)
  const { loading: loadingSale, data: dataSale, error: errorSale } = useQuery<ISaleResult>(GET_SALE);
  const { loading: loadingSubscription, data: dataSubscription, error: errorSubscription } = useSubscription<IAddSubscription>(ON_SALE_ADD_SUBSCRIPTION);

  useEffect(() => {

    if (dataSale?.sale.sale) {
      setSale(dataSale?.sale.sale)
    }
    if (dataSubscription) {
      setSale(dataSubscription?.saleAddSubscription.payload.actionResult as Sale)
    }

  }, [dataSale, dataSubscription])

  const config: GaugeConfig = {
    width: 200,
    height: 200,
    percent: sale?.profit.percentage / 100,
    range: {
      color: token.colorPrimary,
    },
    startAngle: Math.PI,
    endAngle: 2 * Math.PI,
    indicator: {
      pointer: {
        style: {
          stroke: token.colorPrimary,
        },
      },
      pin: {
        style: {
          stroke: token.colorPrimary,
        },
      },
    },
    statistic: {
      title: {
        offsetY: -40,
        style: {
          fontSize: '14px',
          color: token.colorTextLabel,
        },
        formatter: () => `${sale?.profit.percentage}%`,
      },
      content: {
        offsetY: -20,
        style: {
          fontSize: '12px',
          fontWeight: "bold",
          color: token.colorPrimary,
        },
        formatter: () => sale?.profit.status,
      },
    },
  };

  return (
    <Spin spinning={loadingSale} indicator={<LoadingOutlined />}>
      <Card title={<h5>Last sale on {DateTransfomer.dateString(sale?.date)} - {sale?.time}</h5>}>
        <Row justify={'space-between'} align={'middle'} gutter={[80, 0]}>
          <Col flex={'auto'}>
            {
              sale?.profit && (
                <Gauge {...config} />
              )
            }
          </Col>
          <Divider type="vertical" />
          <Col flex={'auto'} >
            <Space direction="vertical">
              <p>Products: <Popover content={
                <List header={<h2>{sale?.products.length} Products</h2>}
                  dataSource={sale?.products}
                  style={{ maxHeight: 300, overflowY: 'auto', width: 320 }}
                  renderItem={(product) => (
                    <div style={{ borderBottomWidth: 1, borderBottomColor: token.colorBorder, padding: '10px 0' }}>
                      <Space direction="vertical">
                        <Tag color="success">{product.name}</Tag>
                        <p>Name - {product.name}</p>
                        <p>Type - {product.kind}</p>
                        <p>Quantity - {product.quantity}</p>
                        <p>RetailPrice - {product.retailPrice}</p>
                        <p>SubTotal - {product.subTotal}</p>
                      </Space>
                    </div>
                  )} />
              }>
                <i className="--icon --icon-th-list"></i>
              </Popover></p>
              <p>Price: {sale?.totalPrice}</p>
              <p>Quantity: {sale?.totalQuantity}</p>
              <p>Paid: {sale?.paid}</p>
              <p>By : {sale?.staff?.firstName} {sale?.staff?.lastName}</p>
            </Space>
          </Col>
        </Row>
      </Card>
    </Spin>
  )

}

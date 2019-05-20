import { Col, Row, Typography } from 'antd'
import React from 'react'

const { Title, Text } = Typography

const Block = ({ canAccessAt, errorCode }) => {
  return (
    <Row style={{ textAlign: 'center' }}>
      <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12, offset: 6 }}>
        <Row>
          {errorCode > 3 ? (
            <Col
              xs={{ span: 18, offset: 3 }}
              sm={{ span: 18, offset: 3 }}
              md={{ span: 16, offset: 4 }}
            >
              <Title level={2}>ข้อมูลของบุตรหลานท่าน ที่ส่งเข้ามาไม่ตรงกับข้อมูลในระบบ</Title>
              <Title level={4}>
                เนื่องจากท่านพยายามเพิ่มข้อมูลที่ไม่ถูกต้องเข้ามาในระบบมากเกินไป
                ทางระบบจึงขอระงับการเพิ่มเบอร์ของท่าน หากท่านต้องการเข้าใช้งานระบบ กรุณาติดต่อ
              </Title>
            </Col>
          ) : (
            <Col
              xs={{ span: 18, offset: 3 }}
              sm={{ span: 18, offset: 3 }}
              md={{ span: 16, offset: 4 }}
            >
              <Title level={2}>ข้อมูลของบุตรหลานท่าน ที่ส่งเข้ามาไม่ตรงกับข้อมูลในระบบ</Title>
              <Title level={4}>
                ทางระบบจึงขอระงับการเพิ่มเบอร์ของท่านช่วงคราว โปรดลองใหม่ในอีกครั้ง <br />{' '}
                {canAccessAt}
              </Title>
            </Col>
          )}
        </Row>
        <Row style={{ marginBottom: '38px' }}>
          <Col span={24}>
            <img style={{ width: '100%', maxWidth: '200px' }} src="/static/help.png" alt="help" />
          </Col>
          <Col
            xs={{ span: 16, offset: 4 }}
            sm={{ span: 16, offset: 4 }}
            md={{ span: 24, offset: 0 }}
          >
            <Text>
              หากท่านพบเจอปัญหาในการใช้งาน Application สามารถติดต่อเข้ามาได้จากช่องทางด้านล่าง
            </Text>
          </Col>
          <Col span={12} style={{ textAlign: 'right' }}>
            <a href="https://line.me/R/ti/p/%40bnh5161k">
              <img
                style={{ width: '100%', maxWidth: '100px' }}
                src="/static/line.png"
                alt="line-nextschool"
              />
            </a>
          </Col>
          <Col span={12} style={{ textAlign: 'left' }}>
            <a href="http://m.me/NextSchool.io">
              <img
                style={{ width: '100%', maxWidth: '88px', marginTop: '6px' }}
                src="/static/facebook.png"
                alt="facebook-nextschool"
              />
            </a>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default Block

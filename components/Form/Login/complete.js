import { Button, Col, Row, Typography } from 'antd'
import React from 'react'

const { Title, Text } = Typography

const Complete = ({ loading, localReset, stateReset }) => (
  <Row style={{ textAlign: 'center' }}>
    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12, offset: 6 }}>
      <Row>
        <Col xs={{ span: 18, offset: 3 }} sm={{ span: 18, offset: 3 }} md={{ span: 16, offset: 4 }}>
          <Title level={2}>ท่านสามารถเข้าใช้งาน Application NextSchool ได้แล้วในขณะนี้</Title>
          <Text>
            โดยการสแกน QR code เพื่อ Download
            หรือกดปุ่มด้านล่างเพื่อกลับไปเพิ่มเบอร์ผู้ปกครองท่านอื่นที่ต้องการทราบข้อมูลบุตรหลานของท่าน
          </Text>
        </Col>
      </Row>
      <Row style={{ marginTop: '38px', marginBottom: '38px' }}>
        <Col span={12} style={{ textAlign: 'right' }}>
          <img
            style={{ width: '100%', maxWidth: '200px' }}
            src="/static/qr_code.png"
            alt="qr_code"
          />
        </Col>
        <Col span={12} style={{ textAlign: 'left' }}>
          <img style={{ width: '100%', maxWidth: '220px' }} src="/static/ok.png" alt="logo" />
        </Col>
      </Row>
      <Col xs={{ span: 18, offset: 3 }} md={{ span: 12, offset: 6 }}>
        <Button
          size="large"
          type="primary"
          htmlType="submit"
          className="login-form-button"
          onClick={() => {
            localReset()
            stateReset()
          }}
          loading={loading}
        >
          กลับไปเพิ่มเบอร์ใหม่
        </Button>
      </Col>
    </Col>
  </Row>
)

export default Complete

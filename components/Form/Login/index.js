import { Button, Col, Form, Icon, Input, Row, Typography } from 'antd'
import React, { useContext, useEffect, useState } from 'react'

import axios from 'axios'

import { isCode, isMobile, isNationalID } from '../../../lib/validations'
import { MainContext } from '../../../controllers/main'

const { Title, Text } = Typography

const { Item: FormItem } = Form

const IdentityForm = (props) => {
  const initState = {
    mobile: '',
    citizen: '',
    code: '',
    validateStatus: { mobile: '', citizen: '', code: '' },
    loading: false,
  }

  const [state, setState] = useState(initState)

  const actions = {
    resetState: () => {
      setState({
        ...initState,
      })
    },
    handleChange: (e, name) => {
      const { value } = e.target
      const reg = /^[\s\d]+$/

      if (name === 'mobile') {
        if (value.length <= 10 && reg.test(value)) {
          setState({
            ...state,
            [name]: value,
            validateStatus: { ...state.validateStatus, mobile: 'validating' },
          })
        }
        if (value.length === 10 && reg.test(value)) {
          if (isMobile(value)) {
            setState({
              ...state,
              [name]: value,
              validateStatus: { ...state.validateStatus, mobile: 'success' },
            })
          } else {
            setState({
              ...state,
              [name]: value,
              validateStatus: { ...state.validateStatus, mobile: 'error' },
            })
          }
        }
      } else if (name === 'citizen') {
        if (value.length <= 13 && reg.test(value)) {
          setState({
            ...state,
            [name]: value,
            validateStatus: { ...state.validateStatus, citizen: 'validating' },
          })
        }
        if (value.length === 13 && reg.test(value)) {
          if (isNationalID(value)) {
            setState({
              ...state,
              [name]: value,
              validateStatus: { ...state.validateStatus, citizen: 'success' },
            })
          } else {
            setState({
              ...state,
              [name]: value,
              validateStatus: { ...state.validateStatus, citizen: 'error' },
            })
          }
        }
      } else if (name === 'code') {
        if (value.length <= 5 && reg.test(value)) {
          setState({
            ...state,
            [name]: value,
            validateStatus: { ...state.validateStatus, code: 'validating' },
          })
        }
        if (value.length >= 5 && reg.test(value)) {
          if (isCode(value)) {
            setState({
              ...state,
              [name]: value,
              validateStatus: { ...state.validateStatus, code: 'success' },
            })
          } else {
            setState({
              ...state,
              [name]: value,
              validateStatus: { ...state.validateStatus, code: 'error' },
            })
          }
        }
      } else {
        setState({ ...state, [name]: value })
      }

      if (value.length === 0) {
        setState({
          ...state,
          [name]: value,
          validateStatus: { ...state.validateStatus, [name]: '' },
        })
      }
    },
    handleSubmit: (event) => {
      event.preventDefault()
      const { mobile, citizen, code, validateStatus } = state
      setState({ ...state, loading: true })

      const validateMobile = isMobile(mobile)
      const validateCitizen = isNationalID(citizen)
      const validateCode = isCode(code)

      setState({
        ...state,
        validateStatus: {
          mobile: !validateMobile ? 'error' : validateStatus.mobile,
          citizen: !validateCitizen ? 'error' : validateStatus.citizen,
          code: !validateCode ? 'error' : validateStatus.code,
        },
        loading: false,
      })
      // eslint-disable-next-line
      if (validateMobile && validateCitizen && validateCode) {
        actions.d(citizen, code, mobile)
      }
    },
    async d(citizen, code, mobile) {
      const codeByCitizenError = await codeByCitizen(citizen)
      if (codeByCitizenError === 404) {
        const saveParentLogError = await saveParentLog(citizen)
        if (saveParentLogError === 0) {
          Main.actions.setCitizen(citizen, true)
        }
      } else {
        const saveParentPhoneStatus = await saveParentPhone(citizen, code, mobile)
        if (saveParentPhoneStatus === 'ok') {
          Main.actions.afterSave()
        } else if (saveParentPhoneStatus.length === 0) {
          const saveParentLogError = await saveParentLog(citizen)
          if (saveParentLogError === 0) {
            Main.actions.setCitizen(citizen, true)
          }
        }
      }
    },
  }

  const { caption } = props

  const Main = useContext(MainContext)
  const fetchParentLog = async (citizen) => {
    const {
      data: { errorCode },
    } = await axios.post(`${process.env.REST_URL_LOCAL}/v1/student/check-parent-log`, {
      citizen,
    })
    if (errorCode === 0) {
      Main.actions.setCitizen('')
    }
  }

  const codeByCitizen = async (citizen) => {
    const {
      data: { errorCode: codeByCitizenError },
    } = await axios.post(`${process.env.REST_URL_LOCAL}/v1/student/code-by-citizen`, {
      citizen,
    })
    return codeByCitizenError
  }

  const saveParentLog = async (citizen) => {
    const {
      data: { errorCode: saveParentLogError },
    } = await axios.post(`${process.env.REST_URL_LOCAL}/v1/student/save-parent-log`, {
      citizen,
    })
    return saveParentLogError
  }

  const saveParentPhone = async (citizen, code, mobile) => {
    const {
      data: { status: saveParentPhoneStatus },
    } = await axios.post(`${process.env.REST_URL_LOCAL}/v1/identity/validate`, {
      citizen,
      code,
      mobile,
    })
    return saveParentPhoneStatus
  }

  useEffect(() => {
    if (Main.state.citizen.length === 13) {
      fetchParentLog(Main.state.citizen)
    }
  }, []) // eslint-disable-line

  if (Main.state && Main.state.is_save_phone) {
    return (
      <Row style={{ textAlign: 'center' }}>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12, offset: 6 }}>
          <Row>
            <Col
              xs={{ span: 18, offset: 3 }}
              sm={{ span: 18, offset: 3 }}
              md={{ span: 16, offset: 4 }}
            >
              <Title level={2}>ท่านสามารถเข้าใช้งาน Application NextSchool ได้แล้วในขณะนี้</Title>
              <Text>
                โดยการแสกน QR code เพื่อ Download
                หรือกดปุ่มด้านล่างเพื่อกลับไปเพิ่มเบอร์ผู้ปกครองท่านอื่นที่ต้องการทราบข้อมูลบุคหลานของท่าน
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
                Main.actions.resetState()
                actions.resetState()
              }}
              loading={state.loading}
            >
              กลับไปเพิ่มเบอร์ใหม่
            </Button>
          </Col>
        </Col>
      </Row>
    )
  }
  // 3167403166349

  if (Main.state.fetchCheck) {
    return (
      <Row style={{ textAlign: 'center' }}>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12, offset: 6 }}>
          <Row>
            <Col
              xs={{ span: 18, offset: 3 }}
              sm={{ span: 18, offset: 3 }}
              md={{ span: 16, offset: 4 }}
            >
              <Title level={2}>ข้อมูลของบุตรหลานท่าน ที่ส่งเข้ามาไม่ตรงกับข้อมูลในระบบ</Title>
              <Title level={4}>
                ทางระบบจึงขอระงับการเพิ่มเบอร์ของท่านช่วงคราว โปรดลองใหม่ในอีก ตตตต นาที
              </Title>
            </Col>
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

  return (
    <Form onSubmit={actions.handleSubmit} className="login-form" style={{ margin: '0 auto' }}>
      <h2>{caption}</h2>
      <FormItem
        hasFeedback
        validateStatus={state.validateStatus.mobile}
        help={state.validateStatus.mobile === 'error' ? 'เบอร์โทรศัพท์ไม่ถูกต้อง' : ''}
      >
        <Input
          size="large"
          prefix={<Icon type="mobile" style={{ color: 'rgba(0,0,0,.25)' }} />}
          placeholder="เบอร์โทรศัพท์"
          maxLength={10}
          value={state.mobile}
          onChange={(e) => actions.handleChange(e, 'mobile')}
        />
      </FormItem>
      <FormItem
        hasFeedback
        validateStatus={state.validateStatus.citizen}
        help={state.validateStatus.citizen === 'error' ? 'หมายเลขบัตรประชาชนไม่ถูกต้อง' : ''}
      >
        <Input
          size="large"
          prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
          placeholder="หมายเลขบัตรประชาชน"
          maxLength={13}
          value={state.citizen}
          onChange={(e) => actions.handleChange(e, 'citizen')}
        />
      </FormItem>
      <FormItem
        hasFeedback
        validateStatus={state.validateStatus.code}
        help={state.validateStatus.code === 'error' ? 'รหัสนักเรียนไม่ถูกต้อง' : ''}
      >
        <Input
          size="large"
          prefix={<Icon type="mobile" style={{ color: 'rgba(0,0,0,.25)' }} />}
          placeholder="รหัสนักเรียน"
          maxLength={10}
          value={state.code}
          onChange={(e) => actions.handleChange(e, 'code')}
        />
      </FormItem>

      <FormItem>
        <Button
          size="large"
          type="primary"
          htmlType="submit"
          className="login-form-button"
          loading={state.loading}
        >
          เข้าสู่ระบบ
        </Button>
      </FormItem>
    </Form>
  )
}

// export default IdentityForm

// const WrappedIdentityForm = Form.create()(IdentityForm)

export default IdentityForm

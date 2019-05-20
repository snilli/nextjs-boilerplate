import { Button, Col, Form, Icon, Input, Row, Typography } from 'antd'
import React, { useContext, useEffect, useState } from 'react'

import axios from 'axios'

import Block from './block'
import Complete from './complete'
import { isCode, isMobile, isNationalID } from '../../../lib/validations'
import { MainContext } from '../../../controllers/main'

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
        actions.processSavePhone(citizen, code, mobile)
      }
    },
    async processSavePhone(citizen, code, mobile) {
      const codeByCitizenError = await codeByCitizen(citizen)
      if (codeByCitizenError === 404) {
        const { saveParentLogError, canAccessAt } = await saveParentLog(citizen)
        if (saveParentLogError) {
          Main.actions.setCitizen(citizen, true, canAccessAt, saveParentLogError)
        }
      } else {
        const saveParentPhoneStatus = await saveParentPhone(citizen, code, mobile)
        // 3167403166349
        if (saveParentPhoneStatus === 'ok') {
          Main.actions.afterSave()
        } else if (saveParentPhoneStatus.length === 0) {
          console.log(123)
          const { saveParentLogError, canAccessAt } = await saveParentLog(citizen)
          if (saveParentLogError) {
            Main.actions.setCitizen(citizen, true, canAccessAt, saveParentLogError)
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
      data: { errorCode: saveParentLogError, canAccessAt },
    } = await axios.post(`${process.env.REST_URL_LOCAL}/v1/student/save-parent-log`, {
      citizen,
    })
    return { saveParentLogError, canAccessAt }
  }

  const saveParentPhone = async (citizen, code, mobile) => {
    const {
      data: { status },
    } = await axios.post(`${process.env.REST_URL_LOCAL}/v1/identity/validate`, {
      citizen,
      code,
      mobile,
    })
    return status
  }

  useEffect(() => {
    if (Main.state.citizen.length === 13) {
      fetchParentLog(Main.state.citizen)
    }
  }, []) // eslint-disable-line

  if (Main.state && Main.state.isSavePhone) {
    return (
      <Complete
        loading={state.loading}
        localReset={Main.actions.resetState}
        stateReset={actions.resetState}
      />
    )
  }
  // 3167403166349

  if (Main.state.fetchCheck) {
    return <Block canAccessAt={Main.state.canAccessAt} errorCode={Main.state.errorCode} />
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

export default IdentityForm

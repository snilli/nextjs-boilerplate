import { Button, Form, Icon, Input, notification } from 'antd'
import React, { Component } from 'react'
import { isEmail, isNationalID } from '../../../libraries/validations'

import Link from 'next/link'
import PropTypes from 'prop-types'
import Router from 'next/router'
import axios from 'axios'
import { connect } from 'react-redux'
import { dispatchers } from './store'

const FormItem = Form.Item

type Props = {
  actions: {
    identifySuccess: string => void
  }
}

class IdentityForm extends Component<Props, State> {
  state = {
    citizen: '',
    email: '',
    // school: 'โรงเรียนกาญจนาภิเษกวิทยาลัย สุราษฎร์ธานี',
    validateStatus: { citizen: '', email: '' },
    loading: false
  }

  static propTypes = {
    actions: PropTypes.shape({
      identifySuccess: PropTypes.func.isRequired
    }).isRequired
    // form: PropTypes.any.isRequired,
  }

  handleChange = (e, name) => {
    const { value } = e.target
    const reg = /^[\s\d]+$/
    const { state } = this

    if (name === 'citizen') {
      if (value.length <= 13 && reg.test(value)) {
        this.setState({ [name]: value })
        this.setState({
          validateStatus: { ...state.validateStatus, citizen: 'validating' }
        })
      }
      if (value.length === 13 && reg.test(value)) {
        if (isNationalID(value)) {
          this.setState({
            validateStatus: { ...state.validateStatus, citizen: 'success' }
          })
        } else {
          this.setState({
            validateStatus: { ...state.validateStatus, citizen: 'error' }
          })
        }
      }
    } else if (name === 'email') {
      this.setState({ [name]: value })
      if (isEmail(value)) {
        this.setState({
          validateStatus: { ...state.validateStatus, email: 'success' }
        })
      } else if (value.length)
        this.setState({
          validateStatus: { ...state.validateStatus, email: 'error' }
        })
      else
        this.setState({
          validateStatus: { ...state.validateStatus, email: 'validating' }
        })
    } else {
      this.setState({ [name]: value })
    }

    if (value.length === 0) {
      this.setState({ [name]: value })
      this.setState({
        validateStatus: { ...state.validateStatus, [name]: '' }
      })
    }
  }

  handleSubmit = event => {
    event.preventDefault()
    const { citizen, email } = this.state
    const { state } = this

    this.setState({ loading: true })

    if (!isNationalID(citizen)) {
      this.setState({
        validateStatus: { ...state.validateStatus, citizen: 'error' },
        loading: false
      })
      return
    }

    if (!isEmail(email)) {
      this.setState({
        validateStatus: { ...state.validateStatus, email: 'error' },
        loading: false
      })
      return
    }

    // eslint-disable-next-line
    if (!isNaN(citizen) && citizen.length === 13 && isEmail(email)) {
      this.handleRequestOTP(citizen, email)
    } else {
      this.setState({
        validateStatus: { ...state.validateStatus, citizen: 'error' }
      })
    }
  }

  handleRequestOTP = async (citizen, email) => {
    try {
      const { data } = await axios.post(
        `${process.env.REST_URL}/exam/existing-register`,
        { citizen, school_id: process.env.SCHOOL_ID },
        { headers: { Authorization: `bearer ${process.env.REST_TOKEN}` } }
      )

      if (data.existing) {
        this.setState({ loading: false })

        notification.error({
          message: 'เกิดข้อผิดพลาด',
          description:
            // 'หมายเลขบัตรประชาชนนี้มีผู้ใช้งานแล้ว กรุณาเข้าสู่ระบบด้วยรหัส OTP ที่ส่งให้ทางอีเมล'
            'หมายเลขบัตรประชาชนนี้มีผู้ใช้งานแล้ว ท่านสามารถเข้าสู่ระบบเพื่อเข้าใช้งานได้'
        })
      } else {
        this.props.actions.identifySuccess(citizen, email)
        Router.push(`/register?type=${this.props.pathname}`, '/register', {
          shallow: true
        })
        this.setState({ loading: false })
      }
    } catch (err) {
      if (err.response) {
        this.setState({ loading: false })
      }
    }
  }

  render() {
    return (
      <Form
        onSubmit={this.handleSubmit}
        className="login-form"
        style={{ margin: '0 auto' }}
      >
        <h2>SPT Pre-test ปีการศึกษา 2562</h2>
        <FormItem
          hasFeedback
          validateStatus={this.state.validateStatus.citizen}
          help={
            this.state.validateStatus.citizen === 'error'
              ? 'หมายเลขบัตรประชาชนไม่ถูกต้อง'
              : ''
          }
        >
          <Input
            size="large"
            prefix={<Icon type="idcard" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="หมายเลขบัตรประชาชน 13 หลัก"
            maxLength="13"
            value={this.state.citizen}
            onChange={e => this.handleChange(e, 'citizen')}
          />
        </FormItem>

        <FormItem
          hasFeedback
          validateStatus={this.state.validateStatus.email}
          help={
            // eslint-disable-next-line
            this.state.validateStatus.email === 'error' &&
            this.state.email.length
              ? 'อีเมลไม่ถูกต้อง'
              : this.state.validateStatus.email === 'validating'
              ? 'ใช้สำหรับรับรหัสยืนยันตัวตน'
              : ''
          }
        >
          <Input
            size="large"
            prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="อีเมลที่สามารถติดต่อได้"
            value={this.state.email}
            onChange={e => this.handleChange(e, 'email')}
          />
        </FormItem>

        <FormItem>
          <Button
            size="large"
            type="primary"
            htmlType="submit"
            className="login-form-button"
            loading={this.state.loading}
          >
            เริ่มสมัคร
          </Button>
          หรือ{' '}
          <Link href="/login">
            <a href="#">เข้าสู่ระบบ</a>
          </Link>
        </FormItem>
      </Form>
    )
  }
}

// export default IdentityForm

// const WrappedIdentityForm = Form.create()(IdentityForm)

const mapDispatchToProps = dispatch => ({
  actions: {
    identifySuccess(citizen, email) {
      dispatch(dispatchers.identifySuccess(citizen, email))
    }
  }
})

export default connect(
  null,
  mapDispatchToProps
)(IdentityForm)

import { Button, Form, Icon, Input, notification } from 'antd'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { connect } from 'react-redux'

import { isEmail, isNationalID } from '../../../lib/validations'
import { dispatchers } from './store'

const FormItem = Form.Item

class IdentityForm extends Component {
  state = {
    citizen: '',
    validateStatus: { citizen: '', email: '' },
    loading: false,
  }

  static propTypes = {
    actions: PropTypes.shape({
      identifySuccess: PropTypes.func.isRequired,
    }).isRequired,
  }

  handleChange = (e, name) => {
    const { value } = e.target
    const reg = /^[\s\d]+$/
    const { state } = this

    if (name === 'citizen') {
      if (value.length <= 13 && reg.test(value)) {
        this.setState({ [name]: value })
        this.setState({
          validateStatus: { ...state.validateStatus, citizen: 'validating' },
        })
      }
      if (value.length === 13 && reg.test(value)) {
        if (isNationalID(value)) {
          this.setState({
            validateStatus: { ...state.validateStatus, citizen: 'success' },
          })
        } else {
          this.setState({
            validateStatus: { ...state.validateStatus, citizen: 'error' },
          })
        }
      }
    } else if (name === 'email') {
      this.setState({ [name]: value })
      if (isEmail(value)) {
        this.setState({
          validateStatus: { ...state.validateStatus, email: 'success' },
        })
      } else if (value.length)
        this.setState({
          validateStatus: { ...state.validateStatus, email: 'error' },
        })
      else
        this.setState({
          validateStatus: { ...state.validateStatus, email: 'validating' },
        })
    } else {
      this.setState({ [name]: value })
    }

    if (value.length === 0) {
      this.setState({ [name]: value })
      this.setState({
        validateStatus: { ...state.validateStatus, [name]: '' },
      })
    }
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const { citizen } = this.state
    const { state } = this

    this.setState({ loading: true })

    if (!isNationalID(citizen)) {
      this.setState({
        validateStatus: { ...state.validateStatus, citizen: 'error' },
        loading: false,
      })
      return
    }

    // eslint-disable-next-line
    if (!isNaN(citizen) && citizen.length === 13) {
      this.handleRequestOTP(citizen)
    } else {
      this.setState({
        validateStatus: { ...state.validateStatus, citizen: 'error' },
      })
    }
  }

  handleRequestOTP = async (citizen) => {
    try {
      const { data } = await axios.post(
        `${process.env.REST_URL}/exam/existing-register`,
        { citizen, school_id: process.env.SCHOOL_ID },
        { headers: { Authorization: `bearer ${process.env.REST_TOKEN}` } }
      )

      this.props.actions.identifySuccess(citizen, '')

      if (!data.existing) {
        setTimeout(() => this.setState({ loading: false }), 300)
        this.props.showAlert()
      } else {
        const {
          data: { errorCode, message, data },
        } = await axios.get(
          `${process.env.REST_URL}/exam/registrant?citizen_id=${citizen}&school_id=${
            process.env.SCHOOL_ID
          }`,
          { headers: { Authorization: `bearer ${process.env.REST_TOKEN}` } }
        )
        if (errorCode === 0) {
          console.log('sdd')
        } else {
          return notification.error({
            message: 'เกิดข้อผิดพลาด',
            description: `${errorCode}: ${message}`,
          })
        }
      }
    } catch (err) {
      if (err.response) {
        this.setState({ loading: false })
      }
    }
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit} className="login-form" style={{ margin: '0 auto' }}>
        <h2>SPT Pre-test ปีการศึกษา 2562</h2>

        <FormItem
          hasFeedback
          validateStatus={this.state.validateStatus.citizen}
          help={this.state.validateStatus.citizen === 'error' ? 'หมายเลขบัตรประชาชนไม่ถูกต้อง' : ''}
        >
          <Input
            size="large"
            prefix={<Icon type="idcard" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="หมายเลขบัตรประชาชน 13 หลัก"
            maxLength={13}
            value={this.state.citizen}
            onChange={(e) => this.handleChange(e, 'citizen')}
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
            เข้าสู่ระบบ
          </Button>
        </FormItem>
      </Form>
    )
  }
}

// export default IdentityForm

// const WrappedIdentityForm = Form.create()(IdentityForm)

const mapDispatchToProps = (dispatch) => ({
  actions: {
    identifySuccess(citizen, email) {
      dispatch(dispatchers.identifySuccess(citizen, email))
    },
  },
})

export default connect(
  null,
  mapDispatchToProps
)(IdentityForm)

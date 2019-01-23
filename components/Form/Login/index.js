import { Button, Form, Icon, Input, notification } from 'antd'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { connect } from 'react-redux'

import { isEmail, isMobile } from '../../../lib/validations'
import { dispatchers } from './store'

const FormItem = Form.Item

class IdentityForm extends Component {
  state = {
    mobile: '',
    validateStatus: { mobile: '', email: '' },
    loading: false,
  }

  static propTypes = {
    actions: PropTypes.shape({
      identifySuccess: PropTypes.func.isRequired,
    }).isRequired,
    caption: PropTypes.string.isRequired,
  }

  handleChange = (e, name) => {
    const { value } = e.target
    const reg = /^[\s\d]+$/
    const { state } = this

    if (name === 'mobile') {
      if (value.length <= 10 && reg.test(value)) {
        this.setState({ [name]: value })
        this.setState({
          validateStatus: { ...state.validateStatus, mobile: 'validating' },
        })
      }
      if (value.length === 10 && reg.test(value)) {
        if (isMobile(value)) {
          this.setState({
            validateStatus: { ...state.validateStatus, mobile: 'success' },
          })
        } else {
          this.setState({
            validateStatus: { ...state.validateStatus, mobile: 'error' },
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
    const { mobile } = this.state
    const { state } = this

    this.setState({ loading: true })

    if (!isMobile(mobile)) {
      this.setState({
        validateStatus: { ...state.validateStatus, mobile: 'error' },
        loading: false,
      })
      return
    }

    // eslint-disable-next-line
    if (!isNaN(mobile) && mobile.length === 10) {
      this.handleRequestOTP(mobile)
    } else {
      this.setState({
        validateStatus: { ...state.validateStatus, mobile: 'error' },
      })
    }
  }

  handleRequestOTP = async (mobile) => {
    try {
      const { data } = await axios.post(
        `${process.env.REST_URL}/exam/existing-register`,
        { mobile, school_id: 160 },
        { headers: { Authorization: `bearer ${process.env.REST_TOKEN}` } }
      )

      this.props.actions.identifySuccess(mobile, '')

      if (!data.existing) {
        setTimeout(() => this.setState({ loading: false }), 300)
        this.props.showAlert()
      } else {
        const {
          data: { errorCode, message, data },
        } = await axios.get(
          `${process.env.REST_URL}/exam/registrant?mobile_id=${mobile}&school_id=${
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
    const { caption } = this.props

    return (
      <Form onSubmit={this.handleSubmit} className="login-form" style={{ margin: '0 auto' }}>
        <h2>{caption}</h2>

        <FormItem
          hasFeedback
          validateStatus={this.state.validateStatus.mobile}
          help={this.state.validateStatus.mobile === 'error' ? 'หมายเลขบัตรประชาชนไม่ถูกต้อง' : ''}
        >
          <Input
            size="large"
            prefix={<Icon type="mobile" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="เบอร์โทรศัพท์มือถือ"
            maxLength={10}
            value={this.state.mobile}
            onChange={(e) => this.handleChange(e, 'mobile')}
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
    identifySuccess(mobile, email) {
      dispatch(dispatchers.identifySuccess(mobile, email))
    },
  },
})

export default connect(
  null,
  mapDispatchToProps
)(IdentityForm)

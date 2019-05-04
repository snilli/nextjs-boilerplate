import { Button, Form, Input, notification } from 'antd'
import React, { Component } from 'react'
import { maskCitizen, maskEmail } from '../../../libraries/commonTypes'

import Error from 'next/error'
import PropTypes from 'prop-types'
import Router from 'next/router'
import { dispatchers as authDispatch } from '../../AuthFields/store'
import axios from 'axios'
import { connect } from 'react-redux'
import { isValidOtp } from '../../../libraries/validations'
import { dispatchers as regisDispatch } from '../Register/store'
import routeToProfile from '../../../libraries/routeToProfile'

const FormItem = Form.Item

type Props = {
  actions: {
    verifySuccess: string => void,
    setPath: stying
  },
  identity: PropTypes.object.isRequired
}

class OtpForm extends Component<Props, State> {
  state = {
    otp: '',
    validateStatus: { otp: '' },
    loading: false
  }

  static propTypes = {
    actions: PropTypes.shape({
      verifySuccess: PropTypes.func.isRequired,
      setPath: PropTypes.func.isRequired
    }).isRequired,
    identity: PropTypes.object.isRequired
  }

  componentWillMount() {
    this.props.actions.setPath(this.props.query.type)
  }

  handleChange = (e, name) => {
    const { value } = e.target
    const reg = /^[\s\d]+$/
    const { state } = this

    if (name === 'otp') {
      if (value.length <= 6 && reg.test(value)) {
        this.setState({ [name]: value })
        this.setState({
          validateStatus: { ...state.validateStatus, otp: 'validating' }
        })
      }
      if (value.length === 6 && reg.test(value)) {
        if (value.length === 6) {
          // replace to validate otp
          this.setState({
            validateStatus: { ...state.validateStatus, otp: 'success' }
          })
        } else {
          this.setState({
            validateStatus: { ...state.validateStatus, otp: 'error' }
          })
        }
      }
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
    const { citizen } = this.props.identity
    const { otp } = this.state
    const { state } = this

    if (isValidOtp(otp)) {
      this.setState({
        loading: true,
        validateStatus: { ...state.validateStatus, otp: 'validating' }
      })

      this.validateOtp(citizen, otp)
      // this.setState({ loading: false })
    } else {
      this.setState({
        validateStatus: { ...state.validateStatus, otp: 'error' }
      })
    }
  }

  validateOtp = async (citizen, otp) => {
    // eslint-disable-next-line
    const { state } = this
    const { data: validatePassword } = await axios.post(
      `${process.env.FIREBASE_ROOT_URL}/verifyOneTimePassword`,
      {
        citizen,
        code: otp
      }
    )

    if (validatePassword.errorCode !== 0) {
      notification.error({
        message: 'เกิดข้อผิดพลาด',
        description: `${validatePassword.errorCode}: ${
          validatePassword.message
        }`
      })
      this.setState({
        validateStatus: { ...state.validateStatus, otp: 'error' },
        loading: false
      })
    } else {
      // redirect to register form
      this.props.actions.verifySuccess(citizen)

      this.setState({ loading: false })
      const { type, citizen_id } = this.props.query

      if (type === '/login') {
        const {
          data: { errorCode, message, data }
        } = await axios.get(
          `${
            process.env.REST_URL
          }/exam/registrant?citizen_id=${citizen_id}&school_id=${
            process.env.SCHOOL_ID
          }`,
          { headers: { Authorization: `bearer ${process.env.REST_TOKEN}` } }
        )
        if (errorCode === 0) {
          routeToProfile(data)
        } else {
          return notification.error({
            message: 'เกิดข้อผิดพลาด',
            description: `${errorCode}: ${message}`
          })
        }
      } else {
        return Router.push(
          `/register?type=${this.props.query.type}`,
          '/register',
          {
            shallow: true
          }
        )
      }
    }
  }

  render() {
    if (typeof this.props.identity === 'undefined')
      return <Error statusCode={404} />

    if (!this.props.identity.citizen.length) return <Error statusCode={404} />

    return (
      <Form
        onSubmit={this.handleSubmit}
        className="login-form"
        style={{ margin: '0 auto' }}
      >
        <h3>
          {this.props.query.type === '/login' ? 'เข้าสู่ระบบ' : 'สมัครสอบ'}
          ด้วยบัตรประชาชนหมายเลข
        </h3>
        <h2>{maskCitizen(this.props.identity.citizen) || ''}</h2>
        <h3>กรุณาระบุรหัสยืนยันที่ได้รับทางอีเมล</h3>
        <h2>{maskEmail(this.props.identity.email) || ''}</h2>

        <FormItem
          hasFeedback
          help="รหัสยืนยันเป็นตัวเลข 6 หลัก"
          validateStatus={this.state.validateStatus.otp}
        >
          <Input
            size="large"
            maxLength="6"
            value={this.state.otp}
            onChange={e => this.handleChange(e, 'otp')}
            style={{ textAlign: 'center' }}
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
            ตกลง
          </Button>
        </FormItem>
      </Form>
    )
  }
}

const mapStateToProps = state => ({
  identity: state.identity
})

const mapDispatchToProps = dispatch => ({
  actions: {
    setPath(path) {
      dispatch(regisDispatch.setPath(path))
    },
    verifySuccess(identity) {
      dispatch(authDispatch.signIn(identity))
    }
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OtpForm)

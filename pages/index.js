import React, { Component } from 'react'
import PropTypes from 'prop-types'

import LoginForm from '../components/Form/Login'

class LoginPage extends Component {
  static async getInitialProps({ query }) {
    return { query }
  }

  render() {
    const { query } = this.props
    return <LoginForm query={query} caption="เพิ่มเบอร์ผู้ปกครอง" />
  }
}

LoginPage.propTypes = {
  query: PropTypes.object.isRequired, // eslint-disable-line
}

export default LoginPage

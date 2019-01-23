import React, { Component } from 'react'

import LoginForm from '../components/Form/Login'

class LoginPage extends Component {
  static async getInitialProps({ store, isServer, pathname, query }) {
    return { query }
  }

  render() {
    return <LoginForm query={this.props.query} />
  }
}

export default LoginPage

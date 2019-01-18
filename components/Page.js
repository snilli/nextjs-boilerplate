import { Menu, Icon, Layout } from 'antd'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { dispatchers } from '../store'

const { Header, Content, Footer, Sider } = Layout

const tabTitle = ['/', '/exam', '/ant', '/about']

class Page extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    actions: PropTypes.shape({
      changeTab: PropTypes.func.isRequired,
    }).isRequired,
    tabSelected: PropTypes.number.isRequired,
  }

  componentWillMount() {
    const { router, actions } = this.props
    const tabSelected = tabTitle.findIndex((item) => item === router.route) + 1

    actions.changeTab(tabSelected)
  }

  onClickSlider = (event) => {
    // const { textContent: content } = event.target
    // const tabSelected = tabTitle.findIndex((item) => item === content) + 1
    // const { actions } = this.props
    // actions.changeTab(tabSelected)
  }

  render() {
    const { children, tabSelected } = this.props
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider breakpoint="lg" collapsedWidth="0" onClick={this.onClickSlider}>
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={[tabSelected.toString()]}>
            <Menu.Item key="1">
              <Icon type="user" />
              <span className="nav-text">nav 1</span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="video-camera" />
              <span className="nav-text">nav 2</span>
            </Menu.Item>
            <Menu.Item key="3">
              <Icon type="upload" />
              <span className="nav-text">nav 3</span>
            </Menu.Item>
            <Menu.Item key="4">
              <Icon type="user" />
              <span className="nav-text">nav 4</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }} />
          <Content style={{ margin: '24px 16px 0' }}>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>{children}</div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    )
  }
}

const mapStateToProps = (state) => ({
  ...state,
})

const mapDispatchToProps = (dispatch) => ({
  actions: {
    changeTab(tabSelected) {
      dispatch(dispatchers.changeTab(tabSelected))
    },
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Page)

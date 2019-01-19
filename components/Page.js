import { Menu, Icon, Layout } from 'antd'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Link from 'next/link'
import { dispatchers } from '../store'

const { Header, Content, Footer, Sider } = Layout

const tabTitle = ['/', '/exam', '/ant', '/about']
const tabData = [
  {
    id: 1,
    title: 'Question',
    icon: 'user',
    path: '/question',
  },
  {
    id: 2,
    title: 'Exam',
    icon: 'user',
    path: '/exam',
  },
  {
    id: 3,
    title: 'Session',
    icon: 'user',
    path: 'session',
  },
  {
    id: 4,
    title: 'Log Out',
    icon: 'user',
    path: '/',
  },
]
class Page extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    actions: PropTypes.shape({
      changeTab: PropTypes.func.isRequired,
    }).isRequired,
    tabSelected: PropTypes.number.isRequired,
  }

  // componentWillMount() {
  //   const { router, actions } = this.props

  //   onst { textContent: content } = event.target
  //   const tabSelected = tabData.findIndex((item) => item.title === router.route) + 1

  //   actions.changeTab(tabSelected)
  // }

  onClickSlider = (event) => {
    const { textContent: content } = event.target
    const tabSelected = tabData.findIndex((item) => item.title === content) + 1
    const { actions } = this.props
    actions.changeTab(tabSelected)
  }

  render() {
    const { children, tabSelected } = this.props
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider breakpoint="lg" collapsedWidth="0" onClick={this.onClickSlider}>
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={[tabSelected.toString()]}>
            {tabData.map((item) => (
              <Menu.Item key={item.id}>
                <Link href={item.path}>
                  <a href="# ">
                    <Icon type={item.icon} />
                    <span className="nav-text">{item.title}</span>
                  </a>
                </Link>
              </Menu.Item>
            ))}
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

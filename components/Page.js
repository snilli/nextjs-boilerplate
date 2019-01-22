import { Menu, Icon, Layout } from 'antd'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Link from 'next/link'
import { actionCreators as uiActionCreators, initialState } from '../services/reducers/ui.reducer'

const { Header, Content, Footer, Sider } = Layout

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
    path: '/session',
  },
  {
    id: 4,
    title: 'Apollo',
    icon: 'user',
    path: '/apollo',
  },
  {
    id: 5,
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
    ui: PropTypes.shape({
      tabSelected: PropTypes.number.isRequired,
    }),
  }

  static defaultProps = {
    ui: initialState,
  }

  onClickSlider = (event) => {
    const { textContent: content } = event.target
    const tabSelected = tabData.findIndex((item) => item.title === content) + 1
    const { actions } = this.props
    actions.changeTab(tabSelected)
  }

  render() {
    const { children, ui } = this.props
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider breakpoint="lg" collapsedWidth="0" onClick={this.onClickSlider}>
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={[ui.tabSelected.toString()]}>
            {tabData.map((item) => (
              <Menu.Item key={item.id}>
                <Link href={item.path}>
                  <div>
                    <Icon type={item.icon} />
                    <span className="nav-text">{item.title}</span>
                  </div>
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
      dispatch(uiActionCreators.changeTab(tabSelected))
    },
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Page)

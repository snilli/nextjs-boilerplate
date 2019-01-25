import { Menu, Icon, Layout, Drawer, Modal, Button } from 'antd'
import React, { Component } from 'react'
import Head from 'next/head'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Link from 'next/link'
import {
  actionCreators as uiActionCreators,
  initialState,
} from '../../services/reducers/ui.reducer'

const { Header, Content, Footer } = Layout
const { confirm } = Modal

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
    path: '/logout',
  },
]

class MainPage extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    actions: PropTypes.shape({
      changeTab: PropTypes.func.isRequired,
    }).isRequired,
    ui: PropTypes.shape({
      tabSelected: PropTypes.number.isRequired,
    }),
    title: PropTypes.string.isRequired,
  }

  static defaultProps = {
    ui: initialState,
  }

  state = { visible: false, placement: 'right' }

  onClickSlider = (event) => {
    const { textContent: content } = event.target
    const tabSelected = tabData.findIndex((item) => item.title === content) + 1
    const { actions } = this.props
    actions.changeTab(tabSelected)
  }

  showDrawer = () => {
    this.setState({
      visible: true,
    })
  }

  onClose = () => {
    this.setState({
      visible: false,
    })
  }

  onChange = (e) => {
    this.setState({
      placement: e.target.value,
    })
  }

  showConfirm = () => {
    confirm({
      title: 'Do you Want to delete these items?',
      content: 'Some descriptions',
      onOk() {
        console.log('OK')
      },
      onCancel() {
        console.log('Cancel')
      },
    })
  }

  render() {
    const { children, ui, title, router } = this.props
    const { placement, visible } = this.state

    const findPath = tabData.find((item) => item.path === router.route)
    const activeSelected = findPath ? findPath.path : '/'
    return (
      <div style={{ height: '100%' }}>
        <Head>
          <title>{title && title !== '' ? `${title} :: NextSchool` : 'NextSchool'}</title>
        </Head>
        <Layout style={{ minHeight: '100vh' }}>
          <Layout>
            <Header
              className="app-header"
              style={{
                position: 'fixed',
                zIndex: 1,
                width: '100%',
                paddingTop: '5px',
                paddingLeft: '40px',
              }}
            >
              <Link href="/">
                <div>
                  <img className="app-header-logo" src="/static/logo.png" alt="logo" />
                  โรงเรียนสตรีพัทลุง
                </div>
              </Link>
              <div className="drawer-handle">
                <Button
                  className="trigger"
                  style={{ border: 'none' }}
                  icon="menu"
                  onClick={this.showDrawer}
                />
              </div>
            </Header>

            <Content style={{ margin: '80px 16px 40px' }}>
              <div style={{ padding: 24, background: '#fff', minHeight: '100vh' }}>{children}</div>
            </Content>

            <Footer style={{ textAlign: 'center' }} className="app-footer">
              <span>
                v0.1 Made with <Icon type="heart" theme="twoTone" twoToneColor="#eb2f96" /> by{' '}
                <a href="http://www.nextschool.io"> NextSchool</a>
              </span>
            </Footer>
          </Layout>
          <Drawer
            title={
              <div>
                <img className="drawer-header-logo" src="/static/nextschool.png" alt="logo" />
                คลังข้อสอบ
              </div>
            }
            placement={placement}
            closable
            onClose={this.onClose}
            visible={visible}
          >
            <Menu mode="inline" defaultSelectedKeys={[activeSelected]}>
              {tabData.map((item) => (
                <Menu.Item
                  key={item.path}
                  onClick={item.path !== '/logout' ? this.onClose : this.showConfirm}
                >
                  <Link href={item.path !== '/logout' ? item.path : '#'}>
                    <div>
                      <Icon type={item.icon} />
                      <span className="nav-text">{item.title}</span>
                    </div>
                  </Link>
                </Menu.Item>
              ))}
            </Menu>
          </Drawer>
        </Layout>
      </div>
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
)(MainPage)

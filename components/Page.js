import { Menu, Icon, Layout, Drawer, Button, Modal } from 'antd'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Link from 'next/link'
import { actionCreators as uiActionCreators, initialState } from '../services/reducers/ui.reducer'

const { Header, Content, Footer, Sider } = Layout
const confirm = Modal.confirm

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
    const { children, ui } = this.props
    return (
      <Layout style={{ minHeight: '100vh' }}>
        {/* <Sider breakpoint="lg" collapsedWidth="0" onClick={this.onClickSlider}>
          <div className="logo">คลังข้อสอบ</div>
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
        </Sider> */}
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
              <Icon className="trigger" type="menu" onClick={this.showDrawer} />
            </div>
          </Header>

          <Content style={{ margin: '80px 16px 40px' }}>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>{children}</div>
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
              {' '}
              <img className="drawer-header-logo" src="/static/nextschool.png" alt="logo" />
              คลังข้อสอบ
            </div>
          }
          placement={this.state.placement}
          closable
          onClose={this.onClose}
          visible={this.state.visible}
        >
          <Menu mode="inline" defaultSelectedKeys={[ui.tabSelected.toString()]}>
            {tabData.map((item) => (
              <Menu.Item
                key={item.id}
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

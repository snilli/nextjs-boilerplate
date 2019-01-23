import * as React from 'react'
import Head from 'next/head'
import { withRouter } from 'next/router'
import PropTypes from 'prop-types'
import Link from 'next/link'
import { Layout, Icon, Row, Col } from 'antd'

const { Header, Footer } = Layout

const BlankPage = ({ title, children }) => (
  <div style={{ height: '100%' }}>
    <Head>
      <title>{title && title !== '' ? `${title} :: NextSchool` : 'NextSchool'}</title>
    </Head>
    <Layout className="app-login">
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
      </Header>
      <Layout className="app-login-content">
        <Row type="flex" align="middle" style={{ width: '100%', marginTop: 0 }}>
          <Col xs={1} sm={2} md={2} lg={2} xl={2} />
          <Col xs={22} sm={20} md={20} lg={20} xl={20}>
            <div style={{ padding: 24, background: '#fff' }}>{children}</div>
          </Col>
          <Col xs={1} sm={2} md={2} lg={2} xl={2} />
        </Row>
      </Layout>
      <Footer style={{ textAlign: 'center' }} className="app-login-footer">
        <span>
          Made with <Icon type="heart" theme="twoTone" twoToneColor="#eb2f96" /> by{' '}
          <a href="http://www.nextschool.io"> NextSchool</a>
        </span>
      </Footer>
    </Layout>
  </div>
)

BlankPage.propTypes = {
  title: PropTypes.string,
  children: PropTypes.element.isRequired,
}

BlankPage.defaultProps = {
  title: '',
}

export default withRouter(BlankPage)

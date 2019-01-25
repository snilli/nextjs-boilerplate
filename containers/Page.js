import React from 'react'
import PropTypes from 'prop-types'
import { Blank, Main } from './Layout'
import routeConfig from '../constrants/route'

const Page = (props) => {
  const { router } = props
  const currentRoute = routeConfig.find((route) => route.path === router.route)

  const title = currentRoute ? currentRoute.title : ''

  return router.route === '/login' ? (
    <Blank title={title} {...props} />
  ) : (
    <Main title={title} {...props} />
  )
}

Page.propTypes = {
  router: PropTypes.object.isRequired, // eslint-disable-line
}

export default Page

import App, { Container } from 'next/app'

import { ApolloProvider } from 'react-apollo'
import React from 'react'
import Page from '../containers/Page'
import withApolloClient from '../services/apollo/client'
import { MainContext, useMain } from '../controllers/main'

const MyApp = (props) => {
  const { Component, pageProps, apolloClient, router } = props
  const Main = useMain()

  return (
    <Container>
      <ApolloProvider client={apolloClient}>
        <MainContext.Provider value={Main}>
          <Page router={router}>
            <Component {...pageProps} router={router} />
          </Page>
        </MainContext.Provider>
      </ApolloProvider>
    </Container>
  )
}

export default withApolloClient(MyApp)

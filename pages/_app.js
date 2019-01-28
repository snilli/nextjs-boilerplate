import App, { Container } from 'next/app'
import { persistor, store } from '../services/store'

import { ApolloProvider } from 'react-apollo'
import Page from '../containers/Page'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import React from 'react'
import withApolloClient from '../services/apollo/client'

class MyApp extends App {
  render() {
    const { Component, pageProps, apolloClient, router } = this.props
    return (
      <Container>
        <ApolloProvider client={apolloClient}>
          <Provider store={store}>
            <PersistGate loading="" persistor={persistor}>
              <Page router={router}>
                <Component {...pageProps} router={router} />
              </Page>
            </PersistGate>
          </Provider>
        </ApolloProvider>
      </Container>
    )
  }
}

export default withApolloClient(MyApp)

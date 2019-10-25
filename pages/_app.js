import App, { Container } from 'next/app'

import { ApolloProvider } from 'react-apollo'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import React from 'react'
import Page from '../containers/Page'
import { persistor, store } from '../services/store'
import withApolloClient from '../services/apollo/client'

class MyApp extends App {
  render() {
    const { Component, pageProps, apolloClient, router } = this.props
    return (
      <ApolloProvider client={apolloClient}>
        <Provider store={store}>
          <PersistGate loading="" persistor={persistor}>
            <Page router={router}>
              <Component {...pageProps} router={router} />
            </Page>
          </PersistGate>
        </Provider>
      </ApolloProvider>
    )
  }
}

export default withApolloClient(MyApp)

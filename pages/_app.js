import App, { Container } from 'next/app'
import React from 'react'
import Head from 'next/head'
import { ApolloProvider } from 'react-apollo'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import withApolloClient from '../services/apollo/client'
import { persistor, store } from '../services/store'
import Page from '../containers/Page'

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

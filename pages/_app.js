import App, { Container } from 'next/app'
import React from 'react'
import { ApolloProvider } from 'react-apollo'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import withReduxStore from '../lib/with-redux-store'
import withApolloClient from '../lib/with-apollo-client'
import initializeStore from '../lib/reducer'
import Page from '../components/Page'
import ErrorMessage from '../components/ErrorMessage'

const { persistor } = initializeStore()

class MyApp extends App {
  render() {
    const { Component, pageProps, apolloClient, reduxStore, router } = this.props
    return (
      <Container>
        <ApolloProvider client={apolloClient}>
          <Provider store={reduxStore}>
            <PersistGate loading={<ErrorMessage />} persistor={persistor}>
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

export default withApolloClient(withReduxStore(MyApp))

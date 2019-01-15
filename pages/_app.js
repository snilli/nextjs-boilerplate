import App, { Container } from "next/app";
import React from "react";
import withApolloClient from "../lib/with-apollo-client";
import { ApolloProvider } from "react-apollo";
import withReduxStore from "../lib/with-redux-store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { initializeStore } from "../store";

const { persistor } = initializeStore();

class MyApp extends App {
  render() {
    const { Component, pageProps, apolloClient, reduxStore } = this.props;
    return (
      <Container>
        <ApolloProvider client={apolloClient}>
          <Provider store={reduxStore}>
            <PersistGate loading={"loading...."} persistor={persistor}>
              <Component {...pageProps} />
            </PersistGate>
          </Provider>
        </ApolloProvider>
      </Container>
    );
  }
}

export default withApolloClient(withReduxStore(MyApp));

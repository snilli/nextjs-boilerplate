# commit # 48d54c2

# now 15-01-2018

## How to use Apollo with next

```
npx create-next-app --example with-apollo with-apollo-app
# or
yarn create next-app --example with-apollo with-apollo-app
```

### add package

```
yarn add dotenv-webpack # with Dotenv
yarn add @zeit/next-less antd babel-plugin-import less less-vars-to-js # with ant design less
yarn add react-redux redux redux-devtools-extension redux-persist redux-thunk # with redux
```

### create file next.config.js at root folder

```
require("dotenv").config();

const path = require("path");
const Dotenv = require("dotenv-webpack");
const withLess = require("@zeit/next-less");
const lessToJS = require("less-vars-to-js");
const fs = require("fs");

// Where your antd-custom.less file lives
const themeVariables = lessToJS(
  fs.readFileSync(path.resolve(__dirname, "./assets/antd-custom.less"), "utf8")
);

// fix: prevents error when .less files are required by node
if (typeof require !== "undefined") {
  require.extensions[".less"] = file => {};
}

module.exports = withLess({
  lessLoaderOptions: {
    javascriptEnabled: true,
    modifyVars: themeVariables // make your antd custom effective
  },
  webpack: config => {
    config.plugins = config.plugins || [];

    config.plugins = [
      ...config.plugins,

      // Read the .env file
      new Dotenv({
        path: path.join(__dirname, ".env"),
        systemvars: true
      })
    ];

    return config;
  }
});
```

### create file .babelrc at root folder

```
{
  "presets": ["next/babel"],
  "plugins": [
    [
      "import",
      {
        "libraryName": "antd",
        "style": "css"
      }
    ]
  ]
}
```

### create file /lib/with-redux-store.js

```
import React from "react";
import { initializeStore } from "../store";
const { store } = initializeStore();

const isServer = typeof window === "undefined";
const __NEXT_REDUX_STORE__ = "__NEXT_REDUX_STORE__";

function getOrCreateStore(initialState) {
  // Always make a new store if server, otherwise state is shared between requests
  if (isServer) {
    return store;
  }

  // Create store if unavailable on the client and set it on the window object
  if (!window[__NEXT_REDUX_STORE__]) {
    window[__NEXT_REDUX_STORE__] = store;
  }
  return window[__NEXT_REDUX_STORE__];
}

export default App => {
  return class AppWithRedux extends React.Component {
    static async getInitialProps(appContext) {
      // Get or Create the store with `undefined` as initialState
      // This allows you to set a custom default initialState
      const reduxStore = getOrCreateStore();

      // Provide the store to getInitialProps of pages
      appContext.ctx.reduxStore = reduxStore;

      let appProps = {};
      if (typeof App.getInitialProps === "function") {
        appProps = await App.getInitialProps(appContext);
      }

      return {
        ...appProps,
        initialReduxState: reduxStore.getState()
      };
    }

    constructor(props) {
      super(props);
      this.reduxStore = getOrCreateStore(props.initialReduxState);
    }

    render() {
      return <App {...this.props} reduxStore={this.reduxStore} />;
    }
  };
};
```

### create file /page/\_app.js

```
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
```

### create file /page/\_document.js

```
import Document, { Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <html>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta charSet="utf-8" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
```

## .env

```
GRAPH_URI=http://<host>:4466/nextschool/dev
```

## Edit /lib/init-apollo.js change line 17

```
16 link: new HttpLink({
17   uri: process.env.GRAPH_URI, // Server URL (must be absolute)
18   credentials: "same-origin" // Additional fetch()options like `credentials` or `headers`
19 }),
```

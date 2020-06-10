import { default as NextApp, AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient } from 'apollo-boost';

import { createTheme } from 'src/theme';
import { createClient } from 'src/apollo';

const APP_TITLE = 'GraphQL Demo App';

interface Props extends AppProps {}

export default class App extends NextApp<Props> {
  client!: ApolloClient<any>;

  constructor(props: Props) {
    super(props);
    this.client = createClient();
  }

  componentDidMount() {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <>
        <Head>
          <title>{APP_TITLE}</title>
        </Head>
        <ApolloProvider client={this.client}>
          <ThemeProvider theme={createTheme()}>
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </ApolloProvider>
      </>
    );
  }
}

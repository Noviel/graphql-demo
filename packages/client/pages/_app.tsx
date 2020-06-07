import { default as NextApp, AppProps } from 'next/app';
import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import { createTheme } from 'src/theme';

interface Props extends AppProps {}

export default class App extends NextApp<Props> {
  constructor(props: Props) {
    super(props);
  }

  componentDidMount() {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  componentDidUpdate() {}

  render() {
    const { Component, pageProps } = this.props;

    const component = <Component {...pageProps} />;

    return (
      <ThemeProvider theme={createTheme()}>
        <CssBaseline />
        {component}
      </ThemeProvider>
    );
  }
}

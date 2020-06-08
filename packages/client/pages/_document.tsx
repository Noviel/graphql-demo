import React from 'react';
import { default as NextDocument, Html, Head, Main, NextScript, DocumentProps } from 'next/document';
import { ServerStyleSheets } from '@material-ui/styles';

class Document extends NextDocument<DocumentProps> {
  constructor(props: DocumentProps) {
    super(props);
  }

  render() {
    return (
      <Html lang="ru">
        <Head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no" />
          <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

Document.getInitialProps = async (ctx) => {
  const sheets = new ServerStyleSheets();

  const originalRenderPage = ctx.renderPage;
  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
      enhanceComponent: (Component) => Component,
    });

  const initialProps = await NextDocument.getInitialProps(ctx);

  return {
    ...initialProps,
    styles: [<React.Fragment key="styles">{initialProps.styles}</React.Fragment>],
  };
};

export default Document;

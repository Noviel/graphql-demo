import React from 'react';
import { NextPageContext } from 'next';

import { App } from 'components/App';

type Props = NextPageContext;

export default function IndexPage(props: Props) {
  return <App />;
}
